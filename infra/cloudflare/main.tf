terraform {
  required_version = ">= 1.6"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40"
    }
  }
  # TODO: wire remote state (e.g. Terraform Cloud or S3) before applying in shared environments.
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zero Trust Access admin permissions."
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare account ID."
  type        = string
}

variable "zone_id" {
  description = "Cloudflare zone ID for andofoods.co."
  type        = string
}

variable "team_domain" {
  description = "Cloudflare Zero Trust team domain (e.g. ando.cloudflareaccess.com)."
  type        = string
  default     = "ando.cloudflareaccess.com"
}

variable "enforce" {
  description = "When true, Access applications enforce policy. When false, logging-only shadow mode."
  type        = bool
  default     = false
}

locals {
  apps = {
    workspace = {
      subdomain         = "workspace.andofoods.co"
      session_duration  = "8h"
      display_name      = "Ando Workspace"
    }
    petty-cash = {
      subdomain         = "petty-cash.andofoods.co"
      session_duration  = "8h"
      display_name      = "Ando Petty Cash"
    }
    rider-payments = {
      subdomain         = "rider-payments.andofoods.co"
      session_duration  = "8h"
      display_name      = "Ando Rider Payments"
    }
  }
}

# One-time identity provider for Email OTP.
resource "cloudflare_access_identity_provider" "email_otp" {
  account_id = var.account_id
  name       = "Ando Email OTP"
  type       = "onetimepin"
}

resource "cloudflare_access_application" "app" {
  for_each = local.apps

  account_id                = var.account_id
  name                      = each.value.display_name
  domain                    = each.value.subdomain
  type                      = "self_hosted"
  session_duration          = each.value.session_duration
  auto_redirect_to_identity = true
  allowed_idps              = [cloudflare_access_identity_provider.email_otp.id]
  app_launcher_visible      = each.key == "workspace" ? false : true
  http_only_cookie_attribute = true
  same_site_cookie_attribute = "lax"
}

resource "cloudflare_access_policy" "andofoods_only" {
  for_each = local.apps

  account_id     = var.account_id
  application_id = cloudflare_access_application.app[each.key].id
  name           = "andofoods.co emails only"
  precedence     = 1
  decision       = var.enforce ? "allow" : "non_identity"

  include {
    email_domain = ["andofoods.co"]
  }
}

output "access_audiences" {
  description = "AUD tags per app — feed these into CF_ACCESS_AUD_* env vars."
  value = { for k, v in cloudflare_access_application.app : k => v.aud }
}
