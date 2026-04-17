import {
  createTestKeypair,
  signTestCfAccessJwt,
  type TestKeypair,
} from '@ando/auth/testing';

export interface CfAccessTestContext {
  keypair: TestKeypair;
  teamDomain: string;
  audiences: Record<'workspace' | 'petty-cash' | 'rider-payments', string>;
}

export async function bootCfAccessContext(): Promise<CfAccessTestContext> {
  const keypair = await createTestKeypair();
  return {
    keypair,
    teamDomain: process.env.CF_ACCESS_TEAM_DOMAIN ?? 'ando.cloudflareaccess.local',
    audiences: {
      workspace: process.env.CF_ACCESS_AUD_WORKSPACE ?? 'test-aud-workspace',
      'petty-cash': process.env.CF_ACCESS_AUD_PETTY_CASH ?? 'test-aud-petty-cash',
      'rider-payments': process.env.CF_ACCESS_AUD_RIDER_PAYMENTS ?? 'test-aud-rider',
    },
  };
}

export async function issueTestJwt(
  ctx: CfAccessTestContext,
  app: keyof CfAccessTestContext['audiences'],
  email: string,
): Promise<string> {
  return signTestCfAccessJwt({
    privateKey: ctx.keypair.privateKey,
    teamDomain: ctx.teamDomain,
    audience: ctx.audiences[app],
    email,
  });
}
