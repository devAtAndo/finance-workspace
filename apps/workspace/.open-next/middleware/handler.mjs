
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.10.1";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// ../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, l = true;
        try {
          e[o](i, i.exports, t), l = false;
        } finally {
          l && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var l = e2.length; l > 0 && e2[l - 1][2] > i; l--) e2[l] = e2[l - 1];
            e2[l] = [o, n, i];
            return;
          }
          for (var a = 1 / 0, l = 0; l < e2.length; l++) {
            for (var [o, n, i] = e2[l], f = true, u = 0; u < o.length; u++) a >= i && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (f = false, i < a && (a = i));
            if (f) {
              e2.splice(l--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 993: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [l, a, f] = o2, u = 0;
          if (l.some((r4) => 0 !== e2[r4])) {
            for (n in a) t.o(a, n) && (t.m[n] = a[n]);
            if (f) var s = f(t);
          }
          for (r3 && r3(o2); u < l.length; u++) i = l[u], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:events
var node_events_exports = {};
import * as node_events_star from "node:events";
var init_node_events = __esm({
  "node-built-in-modules:node:events"() {
    __reExport(node_events_exports, node_events_star);
  }
});

// node-built-in-modules:node:util
var node_util_exports = {};
import * as node_util_star from "node:util";
var init_node_util = __esm({
  "node-built-in-modules:node:util"() {
    __reExport(node_util_exports, node_util_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[727], { 2067: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 6195: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 5846: (e) => {
      "use strict";
      e.exports = (init_node_events(), __toCommonJS(node_events_exports));
    }, 2476: (e) => {
      "use strict";
      e.exports = (init_node_util(), __toCommonJS(node_util_exports));
    }, 2440: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("crypto");
    }, 8254: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("dns");
    }, 5080: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("fs");
    }, 7493: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("net");
    }, 6632: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("path");
    }, 8915: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("stream");
    }, 7069: (e) => {
      "use strict";
      e.exports = globalThis.__import_unsupported("tls");
    }, 5300: (e, t, r) => {
      "use strict";
      let i;
      r.r(t), r.d(t, { default: () => eJ });
      var n, s, o, a, d, l, u, c, h, p, f, m, y = {};
      async function g() {
        let e2 = "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && (await _ENTRIES.middleware_instrumentation).register;
        if (e2) try {
          await e2();
        } catch (e3) {
          throw e3.message = `An error occurred while loading instrumentation hook: ${e3.message}`, e3;
        }
      }
      r.r(y), r.d(y, { config: () => eU, middleware: () => e$ });
      let w = null;
      function v() {
        return w || (w = g()), w;
      }
      function b(e2) {
        return `The edge runtime does not support Node.js '${e2}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e2) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2) return {};
          throw Error(b(e2));
        }, construct() {
          throw Error(b(e2));
        }, apply(r2, i2, n2) {
          if ("function" == typeof n2[0]) return n2[0](t2);
          throw Error(b(e2));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), v();
      class N extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class _ extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class x extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      function S(e2) {
        var t2, r2, i2, n2, s2, o2 = [], a2 = 0;
        function d2() {
          for (; a2 < e2.length && /\s/.test(e2.charAt(a2)); ) a2 += 1;
          return a2 < e2.length;
        }
        for (; a2 < e2.length; ) {
          for (t2 = a2, s2 = false; d2(); ) if ("," === (r2 = e2.charAt(a2))) {
            for (i2 = a2, a2 += 1, d2(), n2 = a2; a2 < e2.length && "=" !== (r2 = e2.charAt(a2)) && ";" !== r2 && "," !== r2; ) a2 += 1;
            a2 < e2.length && "=" === e2.charAt(a2) ? (s2 = true, a2 = n2, o2.push(e2.substring(t2, i2)), t2 = a2) : a2 = i2 + 1;
          } else a2 += 1;
          (!s2 || a2 >= e2.length) && o2.push(e2.substring(t2, e2.length));
        }
        return o2;
      }
      function C(e2) {
        let t2 = {}, r2 = [];
        if (e2) for (let [i2, n2] of e2.entries()) "set-cookie" === i2.toLowerCase() ? (r2.push(...S(n2)), t2[i2] = 1 === r2.length ? r2[0] : r2) : t2[i2] = n2;
        return t2;
      }
      function k(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      let E = Symbol("response"), O = Symbol("passThrough"), T = Symbol("waitUntil");
      class A {
        constructor(e2) {
          this[T] = [], this[O] = false;
        }
        respondWith(e2) {
          this[E] || (this[E] = Promise.resolve(e2));
        }
        passThroughOnException() {
          this[O] = true;
        }
        waitUntil(e2) {
          this[T].push(e2);
        }
      }
      class I extends A {
        constructor(e2) {
          super(e2.request), this.sourcePage = e2.page;
        }
        get request() {
          throw new N({ page: this.sourcePage });
        }
        respondWith() {
          throw new N({ page: this.sourcePage });
        }
      }
      function P(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      function R(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), i2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return i2 || t2 > -1 ? { pathname: e2.substring(0, i2 ? r2 : t2), query: i2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      function M(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: i2, hash: n2 } = R(e2);
        return "" + t2 + r2 + i2 + n2;
      }
      function q(e2, t2) {
        if (!e2.startsWith("/") || !t2) return e2;
        let { pathname: r2, query: i2, hash: n2 } = R(e2);
        return "" + r2 + t2 + i2 + n2;
      }
      function W(e2, t2) {
        if ("string" != typeof e2) return false;
        let { pathname: r2 } = R(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      function L(e2, t2) {
        let r2;
        let i2 = e2.split("/");
        return (t2 || []).some((t3) => !!i2[1] && i2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, i2.splice(1, 1), e2 = i2.join("/") || "/", true)), { pathname: e2, detectedLocale: r2 };
      }
      let D = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function j(e2, t2) {
        return new URL(String(e2).replace(D, "localhost"), t2 && String(t2).replace(D, "localhost"));
      }
      let B = Symbol("NextURLInternal");
      class F {
        constructor(e2, t2, r2) {
          let i2, n2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (i2 = t2, n2 = r2 || {}) : n2 = r2 || t2 || {}, this[B] = { url: j(e2, i2 ?? n2.base), options: n2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, i2, n2;
          let s2 = function(e3, t3) {
            var r3, i3;
            let { basePath: n3, i18n: s3, trailingSlash: o3 } = null != (r3 = t3.nextConfig) ? r3 : {}, a3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : o3 };
            n3 && W(a3.pathname, n3) && (a3.pathname = function(e4, t4) {
              if (!W(e4, t4)) return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(a3.pathname, n3), a3.basePath = n3);
            let d2 = a3.pathname;
            if (a3.pathname.startsWith("/_next/data/") && a3.pathname.endsWith(".json")) {
              let e4 = a3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e4[0];
              a3.buildId = r4, d2 = "index" !== e4[1] ? "/" + e4.slice(1).join("/") : "/", true === t3.parseData && (a3.pathname = d2);
            }
            if (s3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(a3.pathname) : L(a3.pathname, s3.locales);
              a3.locale = e4.detectedLocale, a3.pathname = null != (i3 = e4.pathname) ? i3 : a3.pathname, !e4.detectedLocale && a3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(d2) : L(d2, s3.locales)).detectedLocale && (a3.locale = e4.detectedLocale);
            }
            return a3;
          }(this[B].url.pathname, { nextConfig: this[B].options.nextConfig, parseData: true, i18nProvider: this[B].options.i18nProvider }), o2 = function(e3, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host)) r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname) return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[B].url, this[B].options.headers);
          this[B].domainLocale = this[B].options.i18nProvider ? this[B].options.i18nProvider.detectDomainLocale(o2) : function(e3, t3, r3) {
            if (e3) for (let s3 of (r3 && (r3 = r3.toLowerCase()), e3)) {
              var i3, n3;
              if (t3 === (null == (i3 = s3.domain) ? void 0 : i3.split(":", 1)[0].toLowerCase()) || r3 === s3.defaultLocale.toLowerCase() || (null == (n3 = s3.locales) ? void 0 : n3.some((e4) => e4.toLowerCase() === r3))) return s3;
            }
          }(null == (t2 = this[B].options.nextConfig) ? void 0 : null == (e2 = t2.i18n) ? void 0 : e2.domains, o2);
          let a2 = (null == (r2 = this[B].domainLocale) ? void 0 : r2.defaultLocale) || (null == (n2 = this[B].options.nextConfig) ? void 0 : null == (i2 = n2.i18n) ? void 0 : i2.defaultLocale);
          this[B].url.pathname = s2.pathname, this[B].defaultLocale = a2, this[B].basePath = s2.basePath ?? "", this[B].buildId = s2.buildId, this[B].locale = s2.locale ?? a2, this[B].trailingSlash = s2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, i2) {
            if (!t3 || t3 === r2) return e3;
            let n2 = e3.toLowerCase();
            return !i2 && (W(n2, "/api") || W(n2, "/" + t3.toLowerCase())) ? e3 : M(e3, "/" + t3);
          }((e2 = { basePath: this[B].basePath, buildId: this[B].buildId, defaultLocale: this[B].options.forceLocale ? void 0 : this[B].defaultLocale, locale: this[B].locale, pathname: this[B].url.pathname, trailingSlash: this[B].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = P(t2)), e2.buildId && (t2 = q(M(t2, "/_next/data/" + e2.buildId), "/" === e2.pathname ? "index.json" : ".json")), t2 = M(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : q(t2, "/") : P(t2);
        }
        formatSearch() {
          return this[B].url.search;
        }
        get buildId() {
          return this[B].buildId;
        }
        set buildId(e2) {
          this[B].buildId = e2;
        }
        get locale() {
          return this[B].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[B].locale || !(null == (r2 = this[B].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2))) throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[B].locale = e2;
        }
        get defaultLocale() {
          return this[B].defaultLocale;
        }
        get domainLocale() {
          return this[B].domainLocale;
        }
        get searchParams() {
          return this[B].url.searchParams;
        }
        get host() {
          return this[B].url.host;
        }
        set host(e2) {
          this[B].url.host = e2;
        }
        get hostname() {
          return this[B].url.hostname;
        }
        set hostname(e2) {
          this[B].url.hostname = e2;
        }
        get port() {
          return this[B].url.port;
        }
        set port(e2) {
          this[B].url.port = e2;
        }
        get protocol() {
          return this[B].url.protocol;
        }
        set protocol(e2) {
          this[B].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[B].url = j(e2), this.analyze();
        }
        get origin() {
          return this[B].url.origin;
        }
        get pathname() {
          return this[B].url.pathname;
        }
        set pathname(e2) {
          this[B].url.pathname = e2;
        }
        get hash() {
          return this[B].url.hash;
        }
        set hash(e2) {
          this[B].url.hash = e2;
        }
        get search() {
          return this[B].url.search;
        }
        set search(e2) {
          this[B].url.search = e2;
        }
        get password() {
          return this[B].url.password;
        }
        set password(e2) {
          this[B].url.password = e2;
        }
        get username() {
          return this[B].url.username;
        }
        set username(e2) {
          this[B].url.username = e2;
        }
        get basePath() {
          return this[B].basePath;
        }
        set basePath(e2) {
          this[B].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new F(String(this), this[B].options);
        }
      }
      var U = r(1762);
      let $ = Symbol("internal request");
      class Q extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          k(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let i2 = new F(r2, { headers: C(this.headers), nextConfig: t2.nextConfig });
          this[$] = { cookies: new U.RequestCookies(this.headers), geo: t2.geo || {}, ip: t2.ip, nextUrl: i2, url: i2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, geo: this.geo, ip: this.ip, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[$].cookies;
        }
        get geo() {
          return this[$].geo;
        }
        get ip() {
          return this[$].ip;
        }
        get nextUrl() {
          return this[$].nextUrl;
        }
        get page() {
          throw new _();
        }
        get ua() {
          throw new x();
        }
        get url() {
          return this[$].url;
        }
      }
      class V {
        static get(e2, t2, r2) {
          let i2 = Reflect.get(e2, t2, r2);
          return "function" == typeof i2 ? i2.bind(e2) : i2;
        }
        static set(e2, t2, r2, i2) {
          return Reflect.set(e2, t2, r2, i2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
      let K = Symbol("internal response"), J = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function H(e2, t2) {
        var r2;
        if (null == e2 ? void 0 : null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [i2, n2] of e2.request.headers) t2.set("x-middleware-request-" + i2, n2), r3.push(i2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class G extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, i2 = new Proxy(new U.ResponseCookies(r2), { get(e3, i3, n2) {
            switch (i3) {
              case "delete":
              case "set":
                return (...n3) => {
                  let s2 = Reflect.apply(e3[i3], e3, n3), o2 = new Headers(r2);
                  return s2 instanceof U.ResponseCookies && r2.set("x-middleware-set-cookie", s2.getAll().map((e4) => (0, U.stringifyCookie)(e4)).join(",")), H(t2, o2), s2;
                };
              default:
                return V.get(e3, i3, n2);
            }
          } });
          this[K] = { cookies: i2, url: t2.url ? new F(t2.url, { headers: C(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[K].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new G(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!J.has(r2)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let i2 = "object" == typeof t2 ? t2 : {}, n2 = new Headers(null == i2 ? void 0 : i2.headers);
          return n2.set("Location", k(e2)), new G(null, { ...i2, headers: n2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", k(e2)), H(t2, r2), new G(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), H(e2, t2), new G(null, { ...e2, headers: t2 });
        }
      }
      function z(e2, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, i2 = new URL(e2, t2), n2 = r2.protocol + "//" + r2.host;
        return i2.protocol + "//" + i2.host === n2 ? i2.toString().replace(n2, "") : i2.toString();
      }
      let Z = [["RSC"], ["Next-Router-State-Tree"], ["Next-Router-Prefetch"]], Y = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], X = ["__nextDataReq"], ee = "nxtP", et = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", appMetadataRoute: "app-metadata-route", appRouteHandler: "app-route-handler" };
      ({ ...et, GROUP: { serverOnly: [et.reactServerComponents, et.actionBrowser, et.appMetadataRoute, et.appRouteHandler, et.instrument], clientOnly: [et.serverSideRendering, et.appPagesBrowser], nonClientServerTarget: [et.middleware, et.api], app: [et.reactServerComponents, et.actionBrowser, et.appMetadataRoute, et.appRouteHandler, et.serverSideRendering, et.appPagesBrowser, et.shared, et.instrument] } });
      class er extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new er();
        }
      }
      class ei extends Headers {
        constructor(e2) {
          super(), this.headers = new Proxy(e2, { get(t2, r2, i2) {
            if ("symbol" == typeof r2) return V.get(t2, r2, i2);
            let n2 = r2.toLowerCase(), s2 = Object.keys(e2).find((e3) => e3.toLowerCase() === n2);
            if (void 0 !== s2) return V.get(t2, s2, i2);
          }, set(t2, r2, i2, n2) {
            if ("symbol" == typeof r2) return V.set(t2, r2, i2, n2);
            let s2 = r2.toLowerCase(), o2 = Object.keys(e2).find((e3) => e3.toLowerCase() === s2);
            return V.set(t2, o2 ?? r2, i2, n2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2) return V.has(t2, r2);
            let i2 = r2.toLowerCase(), n2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 !== n2 && V.has(t2, n2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2) return V.deleteProperty(t2, r2);
            let i2 = r2.toLowerCase(), n2 = Object.keys(e2).find((e3) => e3.toLowerCase() === i2);
            return void 0 === n2 || V.deleteProperty(t2, n2);
          } });
        }
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return er.callable;
              default:
                return V.get(e3, t2, r2);
            }
          } });
        }
        merge(e2) {
          return Array.isArray(e2) ? e2.join(", ") : e2;
        }
        static from(e2) {
          return e2 instanceof Headers ? e2 : new ei(e2);
        }
        append(e2, t2) {
          let r2 = this.headers[e2];
          "string" == typeof r2 ? this.headers[e2] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e2] = t2;
        }
        delete(e2) {
          delete this.headers[e2];
        }
        get(e2) {
          let t2 = this.headers[e2];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e2) {
          return void 0 !== this.headers[e2];
        }
        set(e2, t2) {
          this.headers[e2] = t2;
        }
        forEach(e2, t2) {
          for (let [r2, i2] of this.entries()) e2.call(t2, i2, r2, this);
        }
        *entries() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = e2.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e2 of Object.keys(this.headers)) {
            let t2 = this.get(e2);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let en = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class es {
        disable() {
          throw en;
        }
        getStore() {
        }
        run() {
          throw en;
        }
        exit() {
          throw en;
        }
        enterWith() {
          throw en;
        }
      }
      let eo = globalThis.AsyncLocalStorage;
      function ea() {
        return eo ? new eo() : new es();
      }
      let ed = ea();
      class el extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
        }
        static callable() {
          throw new el();
        }
      }
      class eu {
        static seal(e2) {
          return new Proxy(e2, { get(e3, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return el.callable;
              default:
                return V.get(e3, t2, r2);
            }
          } });
        }
      }
      let ec = Symbol.for("next.mutated.cookies");
      class eh {
        static wrap(e2, t2) {
          let r2 = new U.ResponseCookies(new Headers());
          for (let t3 of e2.getAll()) r2.set(t3);
          let i2 = [], n2 = /* @__PURE__ */ new Set(), s2 = () => {
            let e3 = ed.getStore();
            if (e3 && (e3.pathWasRevalidated = true), i2 = r2.getAll().filter((e4) => n2.has(e4.name)), t2) {
              let e4 = [];
              for (let t3 of i2) {
                let r3 = new U.ResponseCookies(new Headers());
                r3.set(t3), e4.push(r3.toString());
              }
              t2(e4);
            }
          };
          return new Proxy(r2, { get(e3, t3, r3) {
            switch (t3) {
              case ec:
                return i2;
              case "delete":
                return function(...t4) {
                  n2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    e3.delete(...t4);
                  } finally {
                    s2();
                  }
                };
              case "set":
                return function(...t4) {
                  n2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e3.set(...t4);
                  } finally {
                    s2();
                  }
                };
              default:
                return V.get(e3, t3, r3);
            }
          } });
        }
      }
      !function(e2) {
        e2.handleRequest = "BaseServer.handleRequest", e2.run = "BaseServer.run", e2.pipe = "BaseServer.pipe", e2.getStaticHTML = "BaseServer.getStaticHTML", e2.render = "BaseServer.render", e2.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e2.renderToResponse = "BaseServer.renderToResponse", e2.renderToHTML = "BaseServer.renderToHTML", e2.renderError = "BaseServer.renderError", e2.renderErrorToResponse = "BaseServer.renderErrorToResponse", e2.renderErrorToHTML = "BaseServer.renderErrorToHTML", e2.render404 = "BaseServer.render404";
      }(n || (n = {})), function(e2) {
        e2.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e2.loadComponents = "LoadComponents.loadComponents";
      }(s || (s = {})), function(e2) {
        e2.getRequestHandler = "NextServer.getRequestHandler", e2.getServer = "NextServer.getServer", e2.getServerRequestHandler = "NextServer.getServerRequestHandler", e2.createServer = "createServer.createServer";
      }(o || (o = {})), function(e2) {
        e2.compression = "NextNodeServer.compression", e2.getBuildId = "NextNodeServer.getBuildId", e2.createComponentTree = "NextNodeServer.createComponentTree", e2.clientComponentLoading = "NextNodeServer.clientComponentLoading", e2.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e2.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e2.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e2.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e2.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e2.sendRenderResult = "NextNodeServer.sendRenderResult", e2.proxyRequest = "NextNodeServer.proxyRequest", e2.runApi = "NextNodeServer.runApi", e2.render = "NextNodeServer.render", e2.renderHTML = "NextNodeServer.renderHTML", e2.imageOptimizer = "NextNodeServer.imageOptimizer", e2.getPagePath = "NextNodeServer.getPagePath", e2.getRoutesManifest = "NextNodeServer.getRoutesManifest", e2.findPageComponents = "NextNodeServer.findPageComponents", e2.getFontManifest = "NextNodeServer.getFontManifest", e2.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e2.getRequestHandler = "NextNodeServer.getRequestHandler", e2.renderToHTML = "NextNodeServer.renderToHTML", e2.renderError = "NextNodeServer.renderError", e2.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e2.render404 = "NextNodeServer.render404", e2.startResponse = "NextNodeServer.startResponse", e2.route = "route", e2.onProxyReq = "onProxyReq", e2.apiResolver = "apiResolver", e2.internalFetch = "internalFetch";
      }(a || (a = {})), (d || (d = {})).startServer = "startServer.startServer", function(e2) {
        e2.getServerSideProps = "Render.getServerSideProps", e2.getStaticProps = "Render.getStaticProps", e2.renderToString = "Render.renderToString", e2.renderDocument = "Render.renderDocument", e2.createBodyResult = "Render.createBodyResult";
      }(l || (l = {})), function(e2) {
        e2.renderToString = "AppRender.renderToString", e2.renderToReadableStream = "AppRender.renderToReadableStream", e2.getBodyResult = "AppRender.getBodyResult", e2.fetch = "AppRender.fetch";
      }(u || (u = {})), (c || (c = {})).executeRoute = "Router.executeRoute", (h || (h = {})).runHandler = "Node.runHandler", (p || (p = {})).runHandler = "AppRouteRouteHandlers.runHandler", function(e2) {
        e2.generateMetadata = "ResolveMetadata.generateMetadata", e2.generateViewport = "ResolveMetadata.generateViewport";
      }(f || (f = {})), (m || (m = {})).execute = "Middleware.execute";
      let ep = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ef = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"], { context: em, propagation: ey, trace: eg, SpanStatusCode: ew, SpanKind: ev, ROOT_CONTEXT: eb } = i = r(6329), eN = (e2) => null !== e2 && "object" == typeof e2 && "function" == typeof e2.then, e_ = (e2, t2) => {
        (null == t2 ? void 0 : t2.bubble) === true ? e2.setAttribute("next.bubble", true) : (t2 && e2.recordException(t2), e2.setStatus({ code: ew.ERROR, message: null == t2 ? void 0 : t2.message })), e2.end();
      }, ex = /* @__PURE__ */ new Map(), eS = i.createContextKey("next.rootSpanId"), eC = 0, ek = () => eC++;
      class eE {
        getTracerInstance() {
          return eg.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return em;
        }
        getActiveScopeSpan() {
          return eg.getSpan(null == em ? void 0 : em.active());
        }
        withPropagatedContext(e2, t2, r2) {
          let i2 = em.active();
          if (eg.getSpanContext(i2)) return t2();
          let n2 = ey.extract(i2, e2, r2);
          return em.with(n2, t2);
        }
        trace(...e2) {
          var t2;
          let [r2, i2, n2] = e2, { fn: s2, options: o2 } = "function" == typeof i2 ? { fn: i2, options: {} } : { fn: n2, options: { ...i2 } }, a2 = o2.spanName ?? r2;
          if (!ep.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan) return s2();
          let d2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), l2 = false;
          d2 ? (null == (t2 = eg.getSpanContext(d2)) ? void 0 : t2.isRemote) && (l2 = true) : (d2 = (null == em ? void 0 : em.active()) ?? eb, l2 = true);
          let u2 = ek();
          return o2.attributes = { "next.span_name": a2, "next.span_type": r2, ...o2.attributes }, em.with(d2.setValue(eS, u2), () => this.getTracerInstance().startActiveSpan(a2, o2, (e3) => {
            let t3 = "performance" in globalThis ? globalThis.performance.now() : void 0, i3 = () => {
              ex.delete(u2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ef.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e4) => "-" + e4.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            l2 && ex.set(u2, new Map(Object.entries(o2.attributes ?? {})));
            try {
              if (s2.length > 1) return s2(e3, (t5) => e_(e3, t5));
              let t4 = s2(e3);
              if (eN(t4)) return t4.then((t5) => (e3.end(), t5)).catch((t5) => {
                throw e_(e3, t5), t5;
              }).finally(i3);
              return e3.end(), i3(), t4;
            } catch (t4) {
              throw e_(e3, t4), i3(), t4;
            }
          }));
        }
        wrap(...e2) {
          let t2 = this, [r2, i2, n2] = 3 === e2.length ? e2 : [e2[0], {}, e2[1]];
          return ep.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e3 = i2;
            "function" == typeof e3 && "function" == typeof n2 && (e3 = e3.apply(this, arguments));
            let s2 = arguments.length - 1, o2 = arguments[s2];
            if ("function" != typeof o2) return t2.trace(r2, e3, () => n2.apply(this, arguments));
            {
              let i3 = t2.getContext().bind(em.active(), o2);
              return t2.trace(r2, e3, (e4, t3) => (arguments[s2] = function(e5) {
                return null == t3 || t3(e5), i3.apply(this, arguments);
              }, n2.apply(this, arguments)));
            }
          } : n2;
        }
        startSpan(...e2) {
          let [t2, r2] = e2, i2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, i2);
        }
        getSpanContext(e2) {
          return e2 ? eg.setSpan(em.active(), e2) : void 0;
        }
        getRootSpanAttributes() {
          let e2 = em.active().getValue(eS);
          return ex.get(e2);
        }
      }
      let eO = (() => {
        let e2 = new eE();
        return () => e2;
      })(), eT = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eT);
      class eA {
        constructor(e2, t2, r2, i2) {
          var n2;
          let s2 = e2 && function(e3, t3) {
            let r3 = ei.from(e3.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t3.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t2, e2).isOnDemandRevalidate, o2 = null == (n2 = r2.get(eT)) ? void 0 : n2.value;
          this.isEnabled = !!(!s2 && o2 && e2 && o2 === e2.previewModeId), this._previewModeId = null == e2 ? void 0 : e2.previewModeId, this._mutableCookies = i2;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eT, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eT, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eI(e2, t2) {
        if ("x-middleware-set-cookie" in e2.headers && "string" == typeof e2.headers["x-middleware-set-cookie"]) {
          let r2 = e2.headers["x-middleware-set-cookie"], i2 = new Headers();
          for (let e3 of S(r2)) i2.append("set-cookie", e3);
          for (let e3 of new U.ResponseCookies(i2).getAll()) t2.set(e3);
        }
      }
      let eP = { wrap(e2, { req: t2, res: r2, renderOpts: i2 }, n2) {
        let s2;
        function o2(e3) {
          r2 && r2.setHeader("Set-Cookie", e3);
        }
        i2 && "previewProps" in i2 && (s2 = i2.previewProps);
        let a2 = {}, d2 = { get headers() {
          return a2.headers || (a2.headers = function(e3) {
            let t3 = ei.from(e3);
            for (let e4 of Z) t3.delete(e4.toString().toLowerCase());
            return ei.seal(t3);
          }(t2.headers)), a2.headers;
        }, get cookies() {
          if (!a2.cookies) {
            let e3 = new U.RequestCookies(ei.from(t2.headers));
            eI(t2, e3), a2.cookies = eu.seal(e3);
          }
          return a2.cookies;
        }, get mutableCookies() {
          if (!a2.mutableCookies) {
            let e3 = function(e4, t3) {
              let r3 = new U.RequestCookies(ei.from(e4));
              return eh.wrap(r3, t3);
            }(t2.headers, (null == i2 ? void 0 : i2.onUpdateCookies) || (r2 ? o2 : void 0));
            eI(t2, e3), a2.mutableCookies = e3;
          }
          return a2.mutableCookies;
        }, get draftMode() {
          return a2.draftMode || (a2.draftMode = new eA(s2, t2, this.cookies, this.mutableCookies)), a2.draftMode;
        }, reactLoadableManifest: (null == i2 ? void 0 : i2.reactLoadableManifest) || {}, assetPrefix: (null == i2 ? void 0 : i2.assetPrefix) || "" };
        return e2.run(d2, n2, d2);
      } }, eR = ea();
      function eM() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      class eq extends Q {
        constructor(e2) {
          super(e2.input, e2.init), this.sourcePage = e2.page;
        }
        get request() {
          throw new N({ page: this.sourcePage });
        }
        respondWith() {
          throw new N({ page: this.sourcePage });
        }
        waitUntil() {
          throw new N({ page: this.sourcePage });
        }
      }
      let eW = { keys: (e2) => Array.from(e2.keys()), get: (e2, t2) => e2.get(t2) ?? void 0 }, eL = (e2, t2) => eO().withPropagatedContext(e2.headers, t2, eW), eD = false;
      async function ej(e2) {
        let t2, i2;
        !function() {
          if (!eD && (eD = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e3, wrapRequestHandler: t3 } = r(2538);
            e3(), eL = t3(eL);
          }
        }(), await v();
        let n2 = void 0 !== self.__BUILD_MANIFEST;
        e2.request.url = e2.request.url.replace(/\.rsc($|\?)/, "$1");
        let s2 = new F(e2.request.url, { headers: e2.request.headers, nextConfig: e2.request.nextConfig });
        for (let e3 of [...s2.searchParams.keys()]) {
          let t3 = s2.searchParams.getAll(e3);
          if (e3 !== ee && e3.startsWith(ee)) {
            let r2 = e3.substring(ee.length);
            for (let e4 of (s2.searchParams.delete(r2), t3)) s2.searchParams.append(r2, e4);
            s2.searchParams.delete(e3);
          }
        }
        let o2 = s2.buildId;
        s2.buildId = "";
        let a2 = e2.request.headers["x-nextjs-data"];
        a2 && "/index" === s2.pathname && (s2.pathname = "/");
        let d2 = function(e3) {
          let t3 = new Headers();
          for (let [r2, i3] of Object.entries(e3)) for (let e4 of Array.isArray(i3) ? i3 : [i3]) void 0 !== e4 && ("number" == typeof e4 && (e4 = e4.toString()), t3.append(r2, e4));
          return t3;
        }(e2.request.headers), l2 = /* @__PURE__ */ new Map();
        if (!n2) for (let e3 of Z) {
          let t3 = e3.toString().toLowerCase();
          d2.get(t3) && (l2.set(t3, d2.get(t3)), d2.delete(t3));
        }
        let u2 = new eq({ page: e2.page, input: function(e3, t3) {
          let r2 = "string" == typeof e3, i3 = r2 ? new URL(e3) : e3;
          for (let e4 of Y) i3.searchParams.delete(e4);
          if (t3) for (let e4 of X) i3.searchParams.delete(e4);
          return r2 ? i3.toString() : i3;
        }(s2, true).toString(), init: { body: e2.request.body, geo: e2.request.geo, headers: d2, ip: e2.request.ip, method: e2.request.method, nextConfig: e2.request.nextConfig, signal: e2.request.signal } });
        a2 && Object.defineProperty(u2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e2.IncrementalCache && (globalThis.__incrementalCache = new e2.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e2.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eM() }) }));
        let c2 = new I({ request: u2, page: e2.page });
        if ((t2 = await eL(u2, () => "/middleware" === e2.page || "/src/middleware" === e2.page ? eO().trace(m.execute, { spanName: `middleware ${u2.method} ${u2.nextUrl.pathname}`, attributes: { "http.target": u2.nextUrl.pathname, "http.method": u2.method } }, () => eP.wrap(eR, { req: u2, renderOpts: { onUpdateCookies: (e3) => {
          i2 = e3;
        }, previewProps: eM() } }, () => e2.handler(u2, c2))) : e2.handler(u2, c2))) && !(t2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        t2 && i2 && t2.headers.set("set-cookie", i2);
        let h2 = null == t2 ? void 0 : t2.headers.get("x-middleware-rewrite");
        if (t2 && h2 && !n2) {
          let r2 = new F(h2, { forceLocale: true, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          r2.host === u2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("x-middleware-rewrite", String(r2)));
          let i3 = z(String(r2), String(s2));
          a2 && t2.headers.set("x-nextjs-rewrite", i3);
        }
        let p2 = null == t2 ? void 0 : t2.headers.get("Location");
        if (t2 && p2 && !n2) {
          let r2 = new F(p2, { forceLocale: false, headers: e2.request.headers, nextConfig: e2.request.nextConfig });
          t2 = new Response(t2.body, t2), r2.host === u2.nextUrl.host && (r2.buildId = o2 || r2.buildId, t2.headers.set("Location", String(r2))), a2 && (t2.headers.delete("Location"), t2.headers.set("x-nextjs-redirect", z(String(r2), String(s2))));
        }
        let f2 = t2 || G.next(), y2 = f2.headers.get("x-middleware-override-headers"), g2 = [];
        if (y2) {
          for (let [e3, t3] of l2) f2.headers.set(`x-middleware-request-${e3}`, t3), g2.push(e3);
          g2.length > 0 && f2.headers.set("x-middleware-override-headers", y2 + "," + g2.join(","));
        }
        return { response: f2, waitUntil: Promise.all(c2[T]), fetchMetrics: u2.fetchMetrics };
      }
      function eB(e2, t2) {
        if (void 0 === e2) return t2;
        let r2 = e2.trim().toLowerCase();
        return "1" === r2 || "true" === r2 || "yes" === r2;
      }
      r(1485), "undefined" == typeof URLPattern || URLPattern;
      let eF = Object.freeze({ WORKSPACE_ENABLED: eB(process.env.WORKSPACE_ENABLED, false), PETTY_CASH_AUTH_V2: eB(process.env.PETTY_CASH_AUTH_V2, false), RIDER_CF_ACCESS: eB(process.env.RIDER_CF_ACCESS, false) }), eU = { matcher: ["/((?!_next/|favicon|no-access|api/test/).*)"] };
      async function e$(e2) {
        let t2;
        if (!eF.WORKSPACE_ENABLED) return new G("workspace is disabled", { status: 503 });
        let [{ evaluateWorkspaceAccess: i2, getJwksFetcher: n2 }, { getHyperdriveIam: s2 }, { env: o2 }, { getDb: a2, iam: d2 }] = await Promise.all([Promise.resolve().then(r.bind(r, 9866)), Promise.resolve().then(r.bind(r, 302)), Promise.resolve().then(r.bind(r, 7419)), Promise.resolve().then(r.bind(r, 5829))]), l2 = await s2();
        l2 && a2({ hyperdrive: l2 });
        try {
          t2 = await i2(e2, { teamDomain: o2.CF_ACCESS_TEAM_DOMAIN, audience: o2.CF_ACCESS_AUD_WORKSPACE, iam: d2, jwksFetcher: n2() });
        } catch {
          return new G("workspace admin temporarily unavailable", { status: 503 });
        }
        if (t2.ok) {
          let e3 = G.next();
          return e3.headers.set("x-ando-principal", JSON.stringify({ userId: t2.principal.userId, email: t2.principal.email, role: t2.principal.role })), e3;
        }
        if (401 === t2.status && t2.location) return G.redirect(t2.location);
        if (403 === t2.status) {
          let r2 = t2.location ?? new URL("/no-access", e2.url).toString();
          return G.rewrite(r2);
        }
        return new G(t2.reason, { status: t2.status });
      }
      let eQ = { ...y }, eV = eQ.middleware || eQ.default, eK = "/src/middleware";
      if ("function" != typeof eV) throw Error(`The Middleware "${eK}" must export a \`middleware\` or a \`default\` function`);
      function eJ(e2) {
        return ej({ ...e2, page: eK, handler: eV });
      }
    }, 9866: (e, t, r) => {
      "use strict";
      let i, n;
      r.r(t), r.d(t, { evaluateWorkspaceAccess: () => eN, getJwksFetcher: () => e_ });
      let s = new TextEncoder(), o = new TextDecoder(), a = (e2) => {
        let t2 = atob(e2), r2 = new Uint8Array(t2.length);
        for (let e3 = 0; e3 < t2.length; e3++) r2[e3] = t2.charCodeAt(e3);
        return r2;
      }, d = (e2) => {
        let t2 = e2;
        t2 instanceof Uint8Array && (t2 = o.decode(t2)), t2 = t2.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          return a(t2);
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      }, l = crypto, u = (e2) => e2 instanceof CryptoKey;
      class c extends Error {
        constructor(e2, t2) {
          super(e2, t2), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      c.code = "ERR_JOSE_GENERIC";
      class h extends c {
        constructor(e2, t2, r2 = "unspecified", i2 = "unspecified") {
          super(e2, { cause: { claim: r2, reason: i2, payload: t2 } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = r2, this.reason = i2, this.payload = t2;
        }
      }
      h.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      class p extends c {
        constructor(e2, t2, r2 = "unspecified", i2 = "unspecified") {
          super(e2, { cause: { claim: r2, reason: i2, payload: t2 } }), this.code = "ERR_JWT_EXPIRED", this.claim = r2, this.reason = i2, this.payload = t2;
        }
      }
      p.code = "ERR_JWT_EXPIRED";
      class f extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      f.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      class m extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      m.code = "ERR_JOSE_NOT_SUPPORTED";
      class y extends c {
        constructor(e2 = "decryption operation failed", t2) {
          super(e2, t2), this.code = "ERR_JWE_DECRYPTION_FAILED";
        }
      }
      y.code = "ERR_JWE_DECRYPTION_FAILED";
      class g extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JWE_INVALID";
        }
      }
      g.code = "ERR_JWE_INVALID";
      class w extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_INVALID";
        }
      }
      w.code = "ERR_JWS_INVALID";
      class v extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
      }
      v.code = "ERR_JWT_INVALID";
      class b extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JWK_INVALID";
        }
      }
      b.code = "ERR_JWK_INVALID";
      class N extends c {
        constructor() {
          super(...arguments), this.code = "ERR_JWKS_INVALID";
        }
      }
      N.code = "ERR_JWKS_INVALID";
      class _ extends c {
        constructor(e2 = "no applicable key found in the JSON Web Key Set", t2) {
          super(e2, t2), this.code = "ERR_JWKS_NO_MATCHING_KEY";
        }
      }
      _.code = "ERR_JWKS_NO_MATCHING_KEY";
      class x extends c {
        constructor(e2 = "multiple matching keys found in the JSON Web Key Set", t2) {
          super(e2, t2), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        }
      }
      Symbol.asyncIterator, x.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
      class S extends c {
        constructor(e2 = "request timed out", t2) {
          super(e2, t2), this.code = "ERR_JWKS_TIMEOUT";
        }
      }
      S.code = "ERR_JWKS_TIMEOUT";
      class C extends c {
        constructor(e2 = "signature verification failed", t2) {
          super(e2, t2), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        }
      }
      C.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
      let k = async (e2) => {
        if (!e2.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t2, keyUsages: r2 } = function(e3) {
          let t3, r3;
          switch (e3.kty) {
            case "RSA":
              switch (e3.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t3 = { name: "RSA-PSS", hash: `SHA-${e3.alg.slice(-3)}` }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t3 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e3.alg.slice(-3)}` }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t3 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e3.alg.slice(-3), 10) || 1}` }, r3 = e3.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new m('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e3.alg) {
                case "ES256":
                  t3 = { name: "ECDSA", namedCurve: "P-256" }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t3 = { name: "ECDSA", namedCurve: "P-384" }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t3 = { name: "ECDSA", namedCurve: "P-521" }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: "ECDH", namedCurve: e3.crv }, r3 = e3.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new m('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e3.alg) {
                case "Ed25519":
                  t3 = { name: "Ed25519" }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "EdDSA":
                  t3 = { name: e3.crv }, r3 = e3.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t3 = { name: e3.crv }, r3 = e3.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new m('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new m('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t3, keyUsages: r3 };
        }(e2), i2 = [t2, e2.ext ?? false, e2.key_ops ?? r2], n2 = { ...e2 };
        return delete n2.alg, delete n2.use, l.subtle.importKey("jwk", n2, ...i2);
      };
      function E(e2) {
        if (!("object" == typeof e2 && null !== e2) || "[object Object]" !== Object.prototype.toString.call(e2)) return false;
        if (null === Object.getPrototypeOf(e2)) return true;
        let t2 = e2;
        for (; null !== Object.getPrototypeOf(t2); ) t2 = Object.getPrototypeOf(t2);
        return Object.getPrototypeOf(e2) === t2;
      }
      async function O(e2, t2) {
        if (!E(e2)) throw TypeError("JWK must be an object");
        switch (t2 || (t2 = e2.alg), e2.kty) {
          case "oct":
            if ("string" != typeof e2.k || !e2.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return d(e2.k);
          case "RSA":
            if ("oth" in e2 && void 0 !== e2.oth) throw new m('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return k({ ...e2, alg: t2 });
          default:
            throw new m('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      function T(e2) {
        return E(e2);
      }
      function A(e2) {
        return "function" == typeof structuredClone ? structuredClone(e2) : JSON.parse(JSON.stringify(e2));
      }
      class I {
        constructor(e2) {
          if (this._cached = /* @__PURE__ */ new WeakMap(), !function(e3) {
            return e3 && "object" == typeof e3 && Array.isArray(e3.keys) && e3.keys.every(T);
          }(e2)) throw new N("JSON Web Key Set malformed");
          this._jwks = A(e2);
        }
        async getKey(e2, t2) {
          let { alg: r2, kid: i2 } = { ...e2, ...t2?.header }, n2 = function(e3) {
            switch ("string" == typeof e3 && e3.slice(0, 2)) {
              case "RS":
              case "PS":
                return "RSA";
              case "ES":
                return "EC";
              case "Ed":
                return "OKP";
              default:
                throw new m('Unsupported "alg" value for a JSON Web Key Set');
            }
          }(r2), s2 = this._jwks.keys.filter((e3) => {
            let t3 = n2 === e3.kty;
            if (t3 && "string" == typeof i2 && (t3 = i2 === e3.kid), t3 && "string" == typeof e3.alg && (t3 = r2 === e3.alg), t3 && "string" == typeof e3.use && (t3 = "sig" === e3.use), t3 && Array.isArray(e3.key_ops) && (t3 = e3.key_ops.includes("verify")), t3) switch (r2) {
              case "ES256":
                t3 = "P-256" === e3.crv;
                break;
              case "ES256K":
                t3 = "secp256k1" === e3.crv;
                break;
              case "ES384":
                t3 = "P-384" === e3.crv;
                break;
              case "ES512":
                t3 = "P-521" === e3.crv;
                break;
              case "Ed25519":
                t3 = "Ed25519" === e3.crv;
                break;
              case "EdDSA":
                t3 = "Ed25519" === e3.crv || "Ed448" === e3.crv;
            }
            return t3;
          }), { 0: o2, length: a2 } = s2;
          if (0 === a2) throw new _();
          if (1 !== a2) {
            let e3 = new x(), { _cached: t3 } = this;
            throw e3[Symbol.asyncIterator] = async function* () {
              for (let e4 of s2) try {
                yield await P(t3, e4, r2);
              } catch {
              }
            }, e3;
          }
          return P(this._cached, o2, r2);
        }
      }
      async function P(e2, t2, r2) {
        let i2 = e2.get(t2) || e2.set(t2, {}).get(t2);
        if (void 0 === i2[r2]) {
          let e3 = await O({ ...t2, ext: true }, r2);
          if (e3 instanceof Uint8Array || "public" !== e3.type) throw new N("JSON Web Key Set members must be public keys");
          i2[r2] = e3;
        }
        return i2[r2];
      }
      let R = (e2, t2) => {
        if (e2.startsWith("RS") || e2.startsWith("PS")) {
          let { modulusLength: r2 } = t2.algorithm;
          if ("number" != typeof r2 || r2 < 2048) throw TypeError(`${e2} requires key modulusLength to be 2048 bits or larger`);
        }
      };
      function M(e2, t2 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t2} must be ${e2}`);
      }
      function q(e2, t2) {
        return e2.name === t2;
      }
      function W(e2) {
        return parseInt(e2.name.slice(4), 10);
      }
      function L(e2, t2, ...r2) {
        if ((r2 = r2.filter(Boolean)).length > 2) {
          let t3 = r2.pop();
          e2 += `one of type ${r2.join(", ")}, or ${t3}.`;
        } else 2 === r2.length ? e2 += `one of type ${r2[0]} or ${r2[1]}.` : e2 += `of type ${r2[0]}.`;
        return null == t2 ? e2 += ` Received ${t2}` : "function" == typeof t2 && t2.name ? e2 += ` Received function ${t2.name}` : "object" == typeof t2 && null != t2 && t2.constructor?.name && (e2 += ` Received an instance of ${t2.constructor.name}`), e2;
      }
      let D = (e2, ...t2) => L("Key must be ", e2, ...t2);
      function j(e2, t2, ...r2) {
        return L(`Key for the ${e2} algorithm must be `, t2, ...r2);
      }
      let B = (e2) => !!u(e2) || e2?.[Symbol.toStringTag] === "KeyObject", F = ["CryptoKey"];
      function U(e2) {
        return E(e2) && "string" == typeof e2.kty;
      }
      let $ = (e2) => d(e2), Q = (e2) => e2?.[Symbol.toStringTag] === "KeyObject", V = async (e2, t2, r2, i2, n2 = false) => {
        let s2 = e2.get(t2);
        if (s2?.[i2]) return s2[i2];
        let o2 = await k({ ...r2, alg: i2 });
        return n2 && Object.freeze(t2), s2 ? s2[i2] = o2 : e2.set(t2, { [i2]: o2 }), o2;
      }, K = { normalizePublicKey: (e2, t2) => {
        if (Q(e2)) {
          let r2 = e2.export({ format: "jwk" });
          return (delete r2.d, delete r2.dp, delete r2.dq, delete r2.p, delete r2.q, delete r2.qi, r2.k) ? $(r2.k) : (n || (n = /* @__PURE__ */ new WeakMap()), V(n, e2, r2, t2));
        }
        return U(e2) ? e2.k ? d(e2.k) : (n || (n = /* @__PURE__ */ new WeakMap()), V(n, e2, e2, t2, true)) : e2;
      }, normalizePrivateKey: (e2, t2) => {
        if (Q(e2)) {
          let r2 = e2.export({ format: "jwk" });
          return r2.k ? $(r2.k) : (i || (i = /* @__PURE__ */ new WeakMap()), V(i, e2, r2, t2));
        }
        return U(e2) ? e2.k ? d(e2.k) : (i || (i = /* @__PURE__ */ new WeakMap()), V(i, e2, e2, t2, true)) : e2;
      } };
      async function J(e2, t2, r2) {
        if ("sign" === r2 && (t2 = await K.normalizePrivateKey(t2, e2)), "verify" === r2 && (t2 = await K.normalizePublicKey(t2, e2)), u(t2)) return !function(e3, t3, ...r3) {
          switch (t3) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!q(e3.algorithm, "HMAC")) throw M("HMAC");
              let r4 = parseInt(t3.slice(2), 10);
              if (W(e3.algorithm.hash) !== r4) throw M(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!q(e3.algorithm, "RSASSA-PKCS1-v1_5")) throw M("RSASSA-PKCS1-v1_5");
              let r4 = parseInt(t3.slice(2), 10);
              if (W(e3.algorithm.hash) !== r4) throw M(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!q(e3.algorithm, "RSA-PSS")) throw M("RSA-PSS");
              let r4 = parseInt(t3.slice(2), 10);
              if (W(e3.algorithm.hash) !== r4) throw M(`SHA-${r4}`, "algorithm.hash");
              break;
            }
            case "EdDSA":
              if ("Ed25519" !== e3.algorithm.name && "Ed448" !== e3.algorithm.name) throw M("Ed25519 or Ed448");
              break;
            case "Ed25519":
              if (!q(e3.algorithm, "Ed25519")) throw M("Ed25519");
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!q(e3.algorithm, "ECDSA")) throw M("ECDSA");
              let r4 = function(e4) {
                switch (e4) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t3);
              if (e3.algorithm.namedCurve !== r4) throw M(r4, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          (function(e4, t4) {
            if (t4.length && !t4.some((t5) => e4.usages.includes(t5))) {
              let e5 = "CryptoKey does not support this operation, its usages must include ";
              if (t4.length > 2) {
                let r4 = t4.pop();
                e5 += `one of ${t4.join(", ")}, or ${r4}.`;
              } else 2 === t4.length ? e5 += `one of ${t4[0]} or ${t4[1]}.` : e5 += `${t4[0]}.`;
              throw TypeError(e5);
            }
          })(e3, r3);
        }(t2, e2, r2), t2;
        if (t2 instanceof Uint8Array) {
          if (!e2.startsWith("HS")) throw TypeError(D(t2, ...F));
          return l.subtle.importKey("raw", t2, { hash: `SHA-${e2.slice(-3)}`, name: "HMAC" }, false, [r2]);
        }
        throw TypeError(D(t2, ...F, "Uint8Array", "JSON Web Key"));
      }
      let H = async (e2, t2, r2, i2) => {
        let n2 = await J(e2, t2, "verify");
        R(e2, n2);
        let s2 = function(e3, t3) {
          let r3 = `SHA-${e3.slice(-3)}`;
          switch (e3) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: r3, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: r3, name: "RSA-PSS", saltLength: e3.slice(-3) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: r3, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: r3, name: "ECDSA", namedCurve: t3.namedCurve };
            case "Ed25519":
              return { name: "Ed25519" };
            case "EdDSA":
              return { name: t3.name };
            default:
              throw new m(`alg ${e3} is not supported either by JOSE or your javascript runtime`);
          }
        }(e2, n2.algorithm);
        try {
          return await l.subtle.verify(s2, n2, r2, i2);
        } catch {
          return false;
        }
      }, G = (...e2) => {
        let t2;
        let r2 = e2.filter(Boolean);
        if (0 === r2.length || 1 === r2.length) return true;
        for (let e3 of r2) {
          let r3 = Object.keys(e3);
          if (!t2 || 0 === t2.size) {
            t2 = new Set(r3);
            continue;
          }
          for (let e4 of r3) {
            if (t2.has(e4)) return false;
            t2.add(e4);
          }
        }
        return true;
      }, z = (e2) => e2?.[Symbol.toStringTag], Z = (e2, t2, r2) => {
        if (void 0 !== t2.use && "sig" !== t2.use) throw TypeError("Invalid key for this operation, when present its use must be sig");
        if (void 0 !== t2.key_ops && t2.key_ops.includes?.(r2) !== true) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${r2}`);
        if (void 0 !== t2.alg && t2.alg !== e2) throw TypeError(`Invalid key for this operation, when present its alg must be ${e2}`);
        return true;
      }, Y = (e2, t2, r2, i2) => {
        if (!(t2 instanceof Uint8Array)) {
          if (i2 && U(t2)) {
            if (function(e3) {
              return U(e3) && "oct" === e3.kty && "string" == typeof e3.k;
            }(t2) && Z(e2, t2, r2)) return;
            throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
          }
          if (!B(t2)) throw TypeError(j(e2, t2, ...F, "Uint8Array", i2 ? "JSON Web Key" : null));
          if ("secret" !== t2.type) throw TypeError(`${z(t2)} instances for symmetric algorithms must be of type "secret"`);
        }
      }, X = (e2, t2, r2, i2) => {
        if (i2 && U(t2)) switch (r2) {
          case "sign":
            if (function(e3) {
              return "oct" !== e3.kty && "string" == typeof e3.d;
            }(t2) && Z(e2, t2, r2)) return;
            throw TypeError("JSON Web Key for this operation be a private JWK");
          case "verify":
            if (function(e3) {
              return "oct" !== e3.kty && void 0 === e3.d;
            }(t2) && Z(e2, t2, r2)) return;
            throw TypeError("JSON Web Key for this operation be a public JWK");
        }
        if (!B(t2)) throw TypeError(j(e2, t2, ...F, i2 ? "JSON Web Key" : null));
        if ("secret" === t2.type) throw TypeError(`${z(t2)} instances for asymmetric algorithms must not be of type "secret"`);
        if ("sign" === r2 && "public" === t2.type) throw TypeError(`${z(t2)} instances for asymmetric algorithm signing must be of type "private"`);
        if ("decrypt" === r2 && "public" === t2.type) throw TypeError(`${z(t2)} instances for asymmetric algorithm decryption must be of type "private"`);
        if (t2.algorithm && "verify" === r2 && "private" === t2.type) throw TypeError(`${z(t2)} instances for asymmetric algorithm verifying must be of type "public"`);
        if (t2.algorithm && "encrypt" === r2 && "private" === t2.type) throw TypeError(`${z(t2)} instances for asymmetric algorithm encryption must be of type "public"`);
      };
      function ee(e2, t2, r2, i2) {
        t2.startsWith("HS") || "dir" === t2 || t2.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t2) ? Y(t2, r2, i2, e2) : X(t2, r2, i2, e2);
      }
      ee.bind(void 0, false);
      let et = ee.bind(void 0, true), er = function(e2, t2, r2, i2, n2) {
        let s2;
        if (void 0 !== n2.crit && i2?.crit === void 0) throw new e2('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!i2 || void 0 === i2.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(i2.crit) || 0 === i2.crit.length || i2.crit.some((e3) => "string" != typeof e3 || 0 === e3.length)) throw new e2('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o2 of (s2 = void 0 !== r2 ? new Map([...Object.entries(r2), ...t2.entries()]) : t2, i2.crit)) {
          if (!s2.has(o2)) throw new m(`Extension Header Parameter "${o2}" is not recognized`);
          if (void 0 === n2[o2]) throw new e2(`Extension Header Parameter "${o2}" is missing`);
          if (s2.get(o2) && void 0 === i2[o2]) throw new e2(`Extension Header Parameter "${o2}" MUST be integrity protected`);
        }
        return new Set(i2.crit);
      }, ei = (e2, t2) => {
        if (void 0 !== t2 && (!Array.isArray(t2) || t2.some((e3) => "string" != typeof e3))) throw TypeError(`"${e2}" option must be an array of strings`);
        if (t2) return new Set(t2);
      };
      async function en(e2, t2, r2) {
        let i2, n2;
        if (!E(e2)) throw new w("Flattened JWS must be an object");
        if (void 0 === e2.protected && void 0 === e2.header) throw new w('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e2.protected && "string" != typeof e2.protected) throw new w("JWS Protected Header incorrect type");
        if (void 0 === e2.payload) throw new w("JWS Payload missing");
        if ("string" != typeof e2.signature) throw new w("JWS Signature missing or incorrect type");
        if (void 0 !== e2.header && !E(e2.header)) throw new w("JWS Unprotected Header incorrect type");
        let a2 = {};
        if (e2.protected) try {
          let t3 = d(e2.protected);
          a2 = JSON.parse(o.decode(t3));
        } catch {
          throw new w("JWS Protected Header is invalid");
        }
        if (!G(a2, e2.header)) throw new w("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let l2 = { ...a2, ...e2.header }, u2 = er(w, /* @__PURE__ */ new Map([["b64", true]]), r2?.crit, a2, l2), c2 = true;
        if (u2.has("b64") && "boolean" != typeof (c2 = a2.b64)) throw new w('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: h2 } = l2;
        if ("string" != typeof h2 || !h2) throw new w('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let p2 = r2 && ei("algorithms", r2.algorithms);
        if (p2 && !p2.has(h2)) throw new f('"alg" (Algorithm) Header Parameter value not allowed');
        if (c2) {
          if ("string" != typeof e2.payload) throw new w("JWS Payload must be a string");
        } else if ("string" != typeof e2.payload && !(e2.payload instanceof Uint8Array)) throw new w("JWS Payload must be a string or an Uint8Array instance");
        let m2 = false;
        "function" == typeof t2 ? (t2 = await t2(a2, e2), m2 = true, et(h2, t2, "verify"), U(t2) && (t2 = await O(t2, h2))) : et(h2, t2, "verify");
        let y2 = function(...e3) {
          let t3 = new Uint8Array(e3.reduce((e4, { length: t4 }) => e4 + t4, 0)), r3 = 0;
          for (let i3 of e3) t3.set(i3, r3), r3 += i3.length;
          return t3;
        }(s.encode(e2.protected ?? ""), s.encode("."), "string" == typeof e2.payload ? s.encode(e2.payload) : e2.payload);
        try {
          i2 = d(e2.signature);
        } catch {
          throw new w("Failed to base64url decode the signature");
        }
        if (!await H(h2, t2, i2, y2)) throw new C();
        if (c2) try {
          n2 = d(e2.payload);
        } catch {
          throw new w("Failed to base64url decode the payload");
        }
        else n2 = "string" == typeof e2.payload ? s.encode(e2.payload) : e2.payload;
        let g2 = { payload: n2 };
        return (void 0 !== e2.protected && (g2.protectedHeader = a2), void 0 !== e2.header && (g2.unprotectedHeader = e2.header), m2) ? { ...g2, key: t2 } : g2;
      }
      async function es(e2, t2, r2) {
        if (e2 instanceof Uint8Array && (e2 = o.decode(e2)), "string" != typeof e2) throw new w("Compact JWS must be a string or Uint8Array");
        let { 0: i2, 1: n2, 2: s2, length: a2 } = e2.split(".");
        if (3 !== a2) throw new w("Invalid Compact JWS");
        let d2 = await en({ payload: n2, protected: i2, signature: s2 }, t2, r2), l2 = { payload: d2.payload, protectedHeader: d2.protectedHeader };
        return "function" == typeof t2 ? { ...l2, key: d2.key } : l2;
      }
      let eo = (e2) => Math.floor(e2.getTime() / 1e3), ea = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, ed = (e2) => {
        let t2;
        let r2 = ea.exec(e2);
        if (!r2 || r2[4] && r2[1]) throw TypeError("Invalid time period format");
        let i2 = parseFloat(r2[2]);
        switch (r2[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t2 = Math.round(i2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t2 = Math.round(60 * i2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t2 = Math.round(3600 * i2);
            break;
          case "day":
          case "days":
          case "d":
            t2 = Math.round(86400 * i2);
            break;
          case "week":
          case "weeks":
          case "w":
            t2 = Math.round(604800 * i2);
            break;
          default:
            t2 = Math.round(31557600 * i2);
        }
        return "-" === r2[1] || "ago" === r2[4] ? -t2 : t2;
      }, el = (e2) => e2.toLowerCase().replace(/^application\//, ""), eu = (e2, t2) => "string" == typeof e2 ? t2.includes(e2) : !!Array.isArray(e2) && t2.some(Set.prototype.has.bind(new Set(e2))), ec = (e2, t2, r2 = {}) => {
        let i2, n2;
        try {
          i2 = JSON.parse(o.decode(t2));
        } catch {
        }
        if (!E(i2)) throw new v("JWT Claims Set must be a top-level JSON object");
        let { typ: s2 } = r2;
        if (s2 && ("string" != typeof e2.typ || el(e2.typ) !== el(s2))) throw new h('unexpected "typ" JWT header value', i2, "typ", "check_failed");
        let { requiredClaims: a2 = [], issuer: d2, subject: l2, audience: u2, maxTokenAge: c2 } = r2, f2 = [...a2];
        for (let e3 of (void 0 !== c2 && f2.push("iat"), void 0 !== u2 && f2.push("aud"), void 0 !== l2 && f2.push("sub"), void 0 !== d2 && f2.push("iss"), new Set(f2.reverse()))) if (!(e3 in i2)) throw new h(`missing required "${e3}" claim`, i2, e3, "missing");
        if (d2 && !(Array.isArray(d2) ? d2 : [d2]).includes(i2.iss)) throw new h('unexpected "iss" claim value', i2, "iss", "check_failed");
        if (l2 && i2.sub !== l2) throw new h('unexpected "sub" claim value', i2, "sub", "check_failed");
        if (u2 && !eu(i2.aud, "string" == typeof u2 ? [u2] : u2)) throw new h('unexpected "aud" claim value', i2, "aud", "check_failed");
        switch (typeof r2.clockTolerance) {
          case "string":
            n2 = ed(r2.clockTolerance);
            break;
          case "number":
            n2 = r2.clockTolerance;
            break;
          case "undefined":
            n2 = 0;
            break;
          default:
            throw TypeError("Invalid clockTolerance option type");
        }
        let { currentDate: m2 } = r2, y2 = eo(m2 || /* @__PURE__ */ new Date());
        if ((void 0 !== i2.iat || c2) && "number" != typeof i2.iat) throw new h('"iat" claim must be a number', i2, "iat", "invalid");
        if (void 0 !== i2.nbf) {
          if ("number" != typeof i2.nbf) throw new h('"nbf" claim must be a number', i2, "nbf", "invalid");
          if (i2.nbf > y2 + n2) throw new h('"nbf" claim timestamp check failed', i2, "nbf", "check_failed");
        }
        if (void 0 !== i2.exp) {
          if ("number" != typeof i2.exp) throw new h('"exp" claim must be a number', i2, "exp", "invalid");
          if (i2.exp <= y2 - n2) throw new p('"exp" claim timestamp check failed', i2, "exp", "check_failed");
        }
        if (c2) {
          let e3 = y2 - i2.iat;
          if (e3 - n2 > ("number" == typeof c2 ? c2 : ed(c2))) throw new p('"iat" claim timestamp check failed (too far in the past)', i2, "iat", "check_failed");
          if (e3 < 0 - n2) throw new h('"iat" claim timestamp check failed (it should be in the past)', i2, "iat", "check_failed");
        }
        return i2;
      };
      async function eh(e2, t2, r2) {
        let i2 = await es(e2, t2, r2);
        if (i2.protectedHeader.crit?.includes("b64") && false === i2.protectedHeader.b64) throw new v("JWTs MUST NOT use unencoded payload");
        let n2 = { payload: ec(i2.protectedHeader, i2.payload, r2), protectedHeader: i2.protectedHeader };
        return "function" == typeof t2 ? { ...n2, key: i2.key } : n2;
      }
      class ep extends Error {
        constructor(e2 = "Unauthorized", t2) {
          super(e2), this.name = "UnauthorizedError", this.cause_ = t2;
        }
      }
      class ef extends Error {
        constructor(e2 = "Forbidden") {
          super(e2), this.name = "ForbiddenError";
        }
      }
      let em = /* @__PURE__ */ new Map(), ey = async (e2) => {
        let t2 = `https://${e2}/cdn-cgi/access/certs`, r2 = await fetch(t2);
        if (!r2.ok) throw new ep(`JWKS fetch failed: ${r2.status}`);
        return await r2.json();
      };
      async function eg(e2, t2) {
        let r2 = em.get(e2);
        if (r2) return r2;
        let i2 = t2(e2).catch((t3) => {
          throw em.delete(e2), t3;
        });
        return em.set(e2, i2), i2;
      }
      async function ew(e2, t2) {
        let r2;
        if (!e2) throw new ep("missing cf-access-jwt-assertion");
        let i2 = t2.jwksFetcher ?? ey;
        try {
          r2 = await eg(t2.teamDomain, i2);
        } catch (e3) {
          throw new ep("unable to load JWKS", e3);
        }
        let n2 = function(e3) {
          let t3 = new I(e3), r3 = async (e4, r4) => t3.getKey(e4, r4);
          return Object.defineProperties(r3, { jwks: { value: () => A(t3._jwks), enumerable: true, configurable: false, writable: false } }), r3;
        }(r2), s2 = t2.clock ? Math.floor(t2.clock() / 1e3) : void 0;
        try {
          let { payload: r3 } = await eh(e2, n2, { issuer: `https://${t2.teamDomain}`, audience: t2.audience, ...void 0 !== s2 ? { currentDate: new Date(1e3 * s2) } : {} });
          if ("string" != typeof r3.email || 0 === r3.email.length) throw new ep("token missing email claim");
          return r3;
        } catch (e3) {
          if (e3 instanceof ep) throw e3;
          throw new ep("invalid cf-access-jwt-assertion", e3);
        }
      }
      async function ev(e2, t2, r2) {
        let i2 = function(e3, t3) {
          let r3 = e3.headers.get(t3);
          if (null !== r3) return r3;
          for (let [r4, i3] of e3.headers) if (r4.toLowerCase() === t3.toLowerCase()) return i3;
          return null;
        }(e2, "cf-access-jwt-assertion");
        if (!i2) throw new ep("missing cf-access-jwt-assertion header");
        let n2 = r2.verify;
        if (!n2) throw new ep("requireAppAccess requires deps.verify to be provided \u2014 call configureAuth() at the app edge");
        let s2 = await n2(i2), o2 = await r2.iam.upsertUserByEmail(s2.email);
        if (o2.disabledAt) throw new ef("user is disabled");
        let a2 = await r2.iam.getAppAccess(o2.id, t2);
        if (!a2) throw new ef(`no access to ${t2}`);
        return { userId: o2.id, email: s2.email, appSlug: t2, role: a2.role };
      }
      async function eb(e2, t2) {
        try {
          let r2 = await ev(e2, t2.appSlug, t2);
          return { ok: true, principal: r2 };
        } catch (r2) {
          if (r2 instanceof ep) return { ok: false, status: 401, location: t2.loginRedirect(e2), reason: r2.message };
          if (r2 instanceof ef) {
            let i2 = t2.forbiddenRedirect?.(e2);
            return { ok: false, status: 403, ...i2 ? { location: i2 } : {}, reason: r2.message };
          }
          throw r2;
        }
      }
      async function eN(e2, t2) {
        return eb(e2, { appSlug: "workspace", iam: t2.iam, verify: (e3) => ew(e3, { teamDomain: t2.teamDomain, audience: t2.audience, jwksFetcher: t2.jwksFetcher }), loginRedirect: (e3) => function(e4, t3) {
          let r2;
          if (t3.startsWith("//")) throw Error("refusing to build login URL for protocol-relative return target");
          try {
            r2 = new URL(t3);
          } catch {
            throw Error("invalid return URL");
          }
          if ("https:" !== r2.protocol && "http:" !== r2.protocol) throw Error(`refusing to build login URL for scheme ${r2.protocol}`);
          return `https://${e4}/cdn-cgi/access/login/${e4}?kid=&redirect_url=${encodeURIComponent(r2.toString())}`;
        }(t2.teamDomain, e3.url), forbiddenRedirect: (e3) => new URL("/no-access", e3.url).toString() });
      }
      function e_() {
      }
    }, 302: (e, t, r) => {
      "use strict";
      async function i() {
        try {
          let { getCloudflareContext: e2 } = await Promise.resolve().then(r.bind(r, 7195));
          return e2().env.HYPERDRIVE_IAM;
        } catch {
          return;
        }
      }
      r.r(t), r.d(t, { getHyperdriveIam: () => i });
    }, 1762: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, n = Object.prototype.hasOwnProperty, s = {};
      function o(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), i2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? i2 : `${i2}; ${r2.join("; ")}`;
      }
      function a(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [i2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(i2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function d(e2) {
        var t2, r2;
        if (!e2) return;
        let [[i2, n2], ...s2] = a(e2), { domain: o2, expires: d2, httponly: c2, maxage: h2, path: p, samesite: f, secure: m, partitioned: y, priority: g } = Object.fromEntries(s2.map(([e3, t3]) => [e3.toLowerCase(), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: i2, value: decodeURIComponent(n2), domain: o2, ...d2 && { expires: new Date(d2) }, ...c2 && { httpOnly: true }, ..."string" == typeof h2 && { maxAge: Number(h2) }, path: p, ...f && { sameSite: l.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...m && { secure: true }, ...g && { priority: u.includes(r2 = (r2 = g).toLowerCase()) ? r2 : void 0 }, ...y && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var i2 in r2) t(e2, i2, { get: r2[i2], enumerable: true });
      })(s, { RequestCookies: () => c, ResponseCookies: () => h, parseCookie: () => a, parseSetCookie: () => d, stringifyCookie: () => o }), e.exports = ((e2, s2, o2, a2) => {
        if (s2 && "object" == typeof s2 || "function" == typeof s2) for (let d2 of i(s2)) n.call(e2, d2) || d2 === o2 || t(e2, d2, { get: () => s2[d2], enumerable: !(a2 = r(s2, d2)) || a2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), s);
      var l = ["strict", "lax", "none"], u = ["low", "medium", "high"], c = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of a(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === i2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, i2 = this._parsed;
          return i2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(i2).map(([e3, t3]) => o(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => o(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, i2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let n2 = null != (i2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? i2 : [];
          for (let e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, i3, n3, s2, o2 = [], a2 = 0;
            function d2() {
              for (; a2 < e4.length && /\s/.test(e4.charAt(a2)); ) a2 += 1;
              return a2 < e4.length;
            }
            for (; a2 < e4.length; ) {
              for (t3 = a2, s2 = false; d2(); ) if ("," === (r3 = e4.charAt(a2))) {
                for (i3 = a2, a2 += 1, d2(), n3 = a2; a2 < e4.length && "=" !== (r3 = e4.charAt(a2)) && ";" !== r3 && "," !== r3; ) a2 += 1;
                a2 < e4.length && "=" === e4.charAt(a2) ? (s2 = true, a2 = n3, o2.push(e4.substring(t3, i3)), t3 = a2) : a2 = i3 + 1;
              } else a2 += 1;
              (!s2 || a2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(n2)) {
            let t3 = d(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let i2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === i2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, i2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...i2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = o(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2, i2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0].path, e2[0].domain];
          return this.set({ name: t2, path: r2, domain: i2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(o).join("; ");
        }
      };
    }, 6329: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let i2 = r2(223), n2 = r2(172), s2 = r2(930), o = "context", a = new i2.NoopContextManager();
          class d {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(o, e3, s2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...i3) {
              return this._getContextManager().with(e3, t4, r3, ...i3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(o) || a;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(o, s2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = d;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let i2 = r2(56), n2 = r2(912), s2 = r2(957), o = r2(172);
          class a {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, o.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: s2.DiagLogLevel.INFO }) => {
                var i3, a2, d;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (i3 = e5.stack) && void 0 !== i3 ? i3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let l = (0, o.getGlobal)("diag"), u = (0, n2.createLogLevelDiagLogger)(null !== (a2 = r3.logLevel) && void 0 !== a2 ? a2 : s2.DiagLogLevel.INFO, e4);
                if (l && !r3.suppressOverrideMessage) {
                  let e5 = null !== (d = Error().stack) && void 0 !== d ? d : "<failed to generate stacktrace>";
                  l.warn(`Current logger will be overwritten from ${e5}`), u.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", u, t4, true);
              }, t4.disable = () => {
                (0, o.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new i2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new a()), this._instance;
            }
          }
          t3.DiagAPI = a;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let i2 = r2(660), n2 = r2(172), s2 = r2(930), o = "metrics";
          class a {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new a()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(o, e3, s2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(o) || i2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, n2.unregisterGlobal)(o, s2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = a;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let i2 = r2(172), n2 = r2(874), s2 = r2(194), o = r2(277), a = r2(369), d = r2(930), l = "propagation", u = new n2.NoopTextMapPropagator();
          class c {
            constructor() {
              this.createBaggage = a.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new c()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, i2.registerGlobal)(l, e3, d.DiagAPI.instance());
            }
            inject(e3, t4, r3 = s2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = s2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, i2.unregisterGlobal)(l, d.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, i2.getGlobal)(l) || u;
            }
          }
          t3.PropagationAPI = c;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let i2 = r2(172), n2 = r2(846), s2 = r2(139), o = r2(607), a = r2(930), d = "trace";
          class l {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = s2.wrapSpanContext, this.isSpanContextValid = s2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, i2.registerGlobal)(d, this._proxyTracerProvider, a.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, i2.getGlobal)(d) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, i2.unregisterGlobal)(d, a.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = l;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let i2 = r2(491), n2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function s2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t3.getBaggage = s2, t3.getActiveBaggage = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(n2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let i2 = new r2(this._entries);
              return i2._entries.set(e3, t4), i2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let i2 = r2(930), n2 = r2(993), s2 = r2(830), o = i2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: s2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let i2 = r2(491);
          t3.context = i2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let i2 = r2(780);
          class n2 {
            active() {
              return i2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...i3) {
              return t4.call(r3, ...i3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = n2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, i2) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.set(e4, i2), n2;
              }, t4.deleteValue = (e4) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.delete(e4), i2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let i2 = r2(930);
          t3.diag = i2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let i2 = r2(172);
          class n2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return s2("debug", this._namespace, e3);
            }
            error(...e3) {
              return s2("error", this._namespace, e3);
            }
            info(...e3) {
              return s2("info", this._namespace, e3);
            }
            warn(...e3) {
              return s2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return s2("verbose", this._namespace, e3);
            }
          }
          function s2(e3, t4, r3) {
            let n3 = (0, i2.getGlobal)("diag");
            if (n3) return r3.unshift(t4), n3[e3](...r3);
          }
          t3.DiagComponentLogger = n2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class i2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = i2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let i2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, i3) {
              let n2 = t4[r4];
              return "function" == typeof n2 && e3 >= i3 ? n2.bind(t4) : function() {
              };
            }
            return e3 < i2.DiagLogLevel.NONE ? e3 = i2.DiagLogLevel.NONE : e3 > i2.DiagLogLevel.ALL && (e3 = i2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", i2.DiagLogLevel.ERROR), warn: r3("warn", i2.DiagLogLevel.WARN), info: r3("info", i2.DiagLogLevel.INFO), debug: r3("debug", i2.DiagLogLevel.DEBUG), verbose: r3("verbose", i2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let i2 = r2(200), n2 = r2(521), s2 = r2(130), o = n2.VERSION.split(".")[0], a = Symbol.for(`opentelemetry.js.api.${o}`), d = i2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, i3 = false) {
            var s3;
            let o2 = d[a] = null !== (s3 = d[a]) && void 0 !== s3 ? s3 : { version: n2.VERSION };
            if (!i3 && o2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (o2.version !== n2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return o2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let i3 = null === (t4 = d[a]) || void 0 === t4 ? void 0 : t4.version;
            if (i3 && (0, s2.isCompatible)(i3)) return null === (r3 = d[a]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r3 = d[a];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let i2 = r2(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function s2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), i3 = e3.match(n2);
            if (!i3) return () => false;
            let s3 = { major: +i3[1], minor: +i3[2], patch: +i3[3], prerelease: i3[4] };
            if (null != s3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function o(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let i4 = e4.match(n2);
              if (!i4) return o(e4);
              let a = { major: +i4[1], minor: +i4[2], patch: +i4[3], prerelease: i4[4] };
              return null != a.prerelease || s3.major !== a.major ? o(e4) : 0 === s3.major ? s3.minor === a.minor && s3.patch <= a.patch ? (t4.add(e4), true) : o(e4) : s3.minor <= a.minor ? (t4.add(e4), true) : o(e4);
            };
          }
          t3._makeCompatibilityCheck = s2, t3.isCompatible = s2(i2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let i2 = r2(653);
          t3.metrics = i2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class i2 {
          }
          t3.NoopMetric = i2;
          class n2 extends i2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = n2;
          class s2 extends i2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = s2;
          class o extends i2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = o;
          class a {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = a;
          class d extends a {
          }
          t3.NoopObservableCounterMetric = d;
          class l extends a {
          }
          t3.NoopObservableGaugeMetric = l;
          class u extends a {
          }
          t3.NoopObservableUpDownCounterMetric = u, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new n2(), t3.NOOP_HISTOGRAM_METRIC = new o(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new s2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new d(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new l(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let i2 = r2(102);
          class n2 {
            getMeter(e3, t4, r3) {
              return i2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = n2, t3.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t3, r2) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), e3[i3] = t4[r3];
          }), n2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || i2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), n2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var i2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), Object.defineProperty(e3, i3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, i3) {
            void 0 === i3 && (i3 = r3), e3[i3] = t4[r3];
          }), n2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || i2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), n2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let i2 = r2(181);
          t3.propagation = i2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let i2 = r2(997);
          t3.trace = i2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let i2 = r2(476);
          class n2 {
            constructor(e3 = i2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = n2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let i2 = r2(491), n2 = r2(607), s2 = r2(403), o = r2(139), a = i2.ContextAPI.getInstance();
          class d {
            startSpan(e3, t4, r3 = a.active()) {
              if (null == t4 ? void 0 : t4.root) return new s2.NonRecordingSpan();
              let i3 = r3 && (0, n2.getSpanContext)(r3);
              return "object" == typeof i3 && "string" == typeof i3.spanId && "string" == typeof i3.traceId && "number" == typeof i3.traceFlags && (0, o.isSpanContextValid)(i3) ? new s2.NonRecordingSpan(i3) : new s2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, i3) {
              let s3, o2, d2;
              if (arguments.length < 2) return;
              2 == arguments.length ? d2 = t4 : 3 == arguments.length ? (s3 = t4, d2 = r3) : (s3 = t4, o2 = r3, d2 = i3);
              let l = null != o2 ? o2 : a.active(), u = this.startSpan(e3, s3, l), c = (0, n2.setSpan)(l, u);
              return a.with(c, d2, void 0, u);
            }
          }
          t3.NoopTracer = d;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let i2 = r2(614);
          class n2 {
            getTracer(e3, t4, r3) {
              return new i2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = n2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let i2 = new (r2(614)).NoopTracer();
          class n2 {
            constructor(e3, t4, r3, i3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = i3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, i3) {
              let n3 = this._getTracer();
              return Reflect.apply(n3.startActiveSpan, n3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : i2;
            }
          }
          t3.ProxyTracer = n2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let i2 = r2(125), n2 = new (r2(124)).NoopTracerProvider();
          class s2 {
            getTracer(e3, t4, r3) {
              var n3;
              return null !== (n3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== n3 ? n3 : new i2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var i3;
              return null === (i3 = this._delegate) || void 0 === i3 ? void 0 : i3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = s2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let i2 = r2(780), n2 = r2(403), s2 = r2(491), o = (0, i2.createContextKey)("OpenTelemetry Context Key SPAN");
          function a(e3) {
            return e3.getValue(o) || void 0;
          }
          function d(e3, t4) {
            return e3.setValue(o, t4);
          }
          t3.getSpan = a, t3.getActiveSpan = function() {
            return a(s2.ContextAPI.getInstance().active());
          }, t3.setSpan = d, t3.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t3.setSpanContext = function(e3, t4) {
            return d(e3, new n2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = a(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let i2 = r2(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), n3 = r3.indexOf("=");
                if (-1 !== n3) {
                  let s2 = r3.slice(0, n3), o = r3.slice(n3 + 1, t4.length);
                  (0, i2.validateKey)(s2) && (0, i2.validateValue)(o) && e4.set(s2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = n2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", i2 = `[a-z]${r2}{0,255}`, n2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, s2 = RegExp(`^(?:${i2}|${n2})$`), o = /^[ -~]{0,255}[!-~]$/, a = /,|=/;
          t3.validateKey = function(e3) {
            return s2.test(e3);
          }, t3.validateValue = function(e3) {
            return o.test(e3) && !a.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let i2 = r2(325);
          t3.createTraceState = function(e3) {
            return new i2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let i2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: i2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let i2 = r2(476), n2 = r2(403), s2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function a(e3) {
            return s2.test(e3) && e3 !== i2.INVALID_TRACEID;
          }
          function d(e3) {
            return o.test(e3) && e3 !== i2.INVALID_SPANID;
          }
          t3.isValidTraceId = a, t3.isValidSpanId = d, t3.isSpanContextValid = function(e3) {
            return a(e3.traceId) && d(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, i = {};
        function n(e2) {
          var r2 = i[e2];
          if (void 0 !== r2) return r2.exports;
          var s2 = i[e2] = { exports: {} }, o = true;
          try {
            t2[e2].call(s2.exports, s2, s2.exports, n), o = false;
          } finally {
            o && delete i[e2];
          }
          return s2.exports;
        }
        n.ab = "//";
        var s = {};
        (() => {
          Object.defineProperty(s, "__esModule", { value: true }), s.trace = s.propagation = s.metrics = s.diag = s.context = s.INVALID_SPAN_CONTEXT = s.INVALID_TRACEID = s.INVALID_SPANID = s.isValidSpanId = s.isValidTraceId = s.isSpanContextValid = s.createTraceState = s.TraceFlags = s.SpanStatusCode = s.SpanKind = s.SamplingDecision = s.ProxyTracerProvider = s.ProxyTracer = s.defaultTextMapSetter = s.defaultTextMapGetter = s.ValueType = s.createNoopMeter = s.DiagLogLevel = s.DiagConsoleLogger = s.ROOT_CONTEXT = s.createContextKey = s.baggageEntryMetadataFromString = void 0;
          var e2 = n(369);
          Object.defineProperty(s, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = n(780);
          Object.defineProperty(s, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(s, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = n(972);
          Object.defineProperty(s, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var i2 = n(957);
          Object.defineProperty(s, "DiagLogLevel", { enumerable: true, get: function() {
            return i2.DiagLogLevel;
          } });
          var o = n(102);
          Object.defineProperty(s, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var a = n(901);
          Object.defineProperty(s, "ValueType", { enumerable: true, get: function() {
            return a.ValueType;
          } });
          var d = n(194);
          Object.defineProperty(s, "defaultTextMapGetter", { enumerable: true, get: function() {
            return d.defaultTextMapGetter;
          } }), Object.defineProperty(s, "defaultTextMapSetter", { enumerable: true, get: function() {
            return d.defaultTextMapSetter;
          } });
          var l = n(125);
          Object.defineProperty(s, "ProxyTracer", { enumerable: true, get: function() {
            return l.ProxyTracer;
          } });
          var u = n(846);
          Object.defineProperty(s, "ProxyTracerProvider", { enumerable: true, get: function() {
            return u.ProxyTracerProvider;
          } });
          var c = n(996);
          Object.defineProperty(s, "SamplingDecision", { enumerable: true, get: function() {
            return c.SamplingDecision;
          } });
          var h = n(357);
          Object.defineProperty(s, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var p = n(847);
          Object.defineProperty(s, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = n(475);
          Object.defineProperty(s, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var m = n(98);
          Object.defineProperty(s, "createTraceState", { enumerable: true, get: function() {
            return m.createTraceState;
          } });
          var y = n(139);
          Object.defineProperty(s, "isSpanContextValid", { enumerable: true, get: function() {
            return y.isSpanContextValid;
          } }), Object.defineProperty(s, "isValidTraceId", { enumerable: true, get: function() {
            return y.isValidTraceId;
          } }), Object.defineProperty(s, "isValidSpanId", { enumerable: true, get: function() {
            return y.isValidSpanId;
          } });
          var g = n(476);
          Object.defineProperty(s, "INVALID_SPANID", { enumerable: true, get: function() {
            return g.INVALID_SPANID;
          } }), Object.defineProperty(s, "INVALID_TRACEID", { enumerable: true, get: function() {
            return g.INVALID_TRACEID;
          } }), Object.defineProperty(s, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return g.INVALID_SPAN_CONTEXT;
          } });
          let w = n(67);
          Object.defineProperty(s, "context", { enumerable: true, get: function() {
            return w.context;
          } });
          let v = n(506);
          Object.defineProperty(s, "diag", { enumerable: true, get: function() {
            return v.diag;
          } });
          let b = n(886);
          Object.defineProperty(s, "metrics", { enumerable: true, get: function() {
            return b.metrics;
          } });
          let N = n(939);
          Object.defineProperty(s, "propagation", { enumerable: true, get: function() {
            return N.propagation;
          } });
          let _ = n(845);
          Object.defineProperty(s, "trace", { enumerable: true, get: function() {
            return _.trace;
          } }), s.default = { context: w.context, diag: v.diag, metrics: b.metrics, propagation: N.propagation, trace: _.trace };
        })(), e.exports = s;
      })();
    }, 8086: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var n2 = {}, s = t2.split(i), o = (r2 || {}).decode || e2, a = 0; a < s.length; a++) {
              var d = s[a], l = d.indexOf("=");
              if (!(l < 0)) {
                var u = d.substr(0, l).trim(), c = d.substr(++l, d.length).trim();
                '"' == c[0] && (c = c.slice(1, -1)), void 0 == n2[u] && (n2[u] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(c, o));
              }
            }
            return n2;
          }, t.serialize = function(e3, t2, i2) {
            var s = i2 || {}, o = s.encode || r;
            if ("function" != typeof o) throw TypeError("option encode is invalid");
            if (!n.test(e3)) throw TypeError("argument name is invalid");
            var a = o(t2);
            if (a && !n.test(a)) throw TypeError("argument val is invalid");
            var d = e3 + "=" + a;
            if (null != s.maxAge) {
              var l = s.maxAge - 0;
              if (isNaN(l) || !isFinite(l)) throw TypeError("option maxAge is invalid");
              d += "; Max-Age=" + Math.floor(l);
            }
            if (s.domain) {
              if (!n.test(s.domain)) throw TypeError("option domain is invalid");
              d += "; Domain=" + s.domain;
            }
            if (s.path) {
              if (!n.test(s.path)) throw TypeError("option path is invalid");
              d += "; Path=" + s.path;
            }
            if (s.expires) {
              if ("function" != typeof s.expires.toUTCString) throw TypeError("option expires is invalid");
              d += "; Expires=" + s.expires.toUTCString();
            }
            if (s.httpOnly && (d += "; HttpOnly"), s.secure && (d += "; Secure"), s.sameSite) switch ("string" == typeof s.sameSite ? s.sameSite.toLowerCase() : s.sameSite) {
              case true:
              case "strict":
                d += "; SameSite=Strict";
                break;
              case "lax":
                d += "; SameSite=Lax";
                break;
              case "none":
                d += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return d;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, i = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 1485: (e, t, r) => {
      var i;
      (() => {
        var n = { 226: function(n2, s2) {
          !function(o2, a2) {
            "use strict";
            var d = "function", l = "undefined", u = "object", c = "string", h = "major", p = "model", f = "name", m = "type", y = "vendor", g = "version", w = "architecture", v = "console", b = "mobile", N = "tablet", _ = "smarttv", x = "wearable", S = "embedded", C = "Amazon", k = "Apple", E = "ASUS", O = "BlackBerry", T = "Browser", A = "Chrome", I = "Firefox", P = "Google", R = "Huawei", M = "Microsoft", q = "Motorola", W = "Opera", L = "Samsung", D = "Sharp", j = "Sony", B = "Xiaomi", F = "Zebra", U = "Facebook", $ = "Chromium OS", Q = "Mac OS", V = function(e2, t2) {
              var r2 = {};
              for (var i2 in e2) t2[i2] && t2[i2].length % 2 == 0 ? r2[i2] = t2[i2].concat(e2[i2]) : r2[i2] = e2[i2];
              return r2;
            }, K = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, J = function(e2, t2) {
              return typeof e2 === c && -1 !== H(t2).indexOf(H(e2));
            }, H = function(e2) {
              return e2.toLowerCase();
            }, G = function(e2, t2) {
              if (typeof e2 === c) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === l ? e2 : e2.substring(0, 350);
            }, z = function(e2, t2) {
              for (var r2, i2, n3, s3, o3, l2, c2 = 0; c2 < t2.length && !o3; ) {
                var h2 = t2[c2], p2 = t2[c2 + 1];
                for (r2 = i2 = 0; r2 < h2.length && !o3 && h2[r2]; ) if (o3 = h2[r2++].exec(e2)) for (n3 = 0; n3 < p2.length; n3++) l2 = o3[++i2], typeof (s3 = p2[n3]) === u && s3.length > 0 ? 2 === s3.length ? typeof s3[1] == d ? this[s3[0]] = s3[1].call(this, l2) : this[s3[0]] = s3[1] : 3 === s3.length ? typeof s3[1] !== d || s3[1].exec && s3[1].test ? this[s3[0]] = l2 ? l2.replace(s3[1], s3[2]) : void 0 : this[s3[0]] = l2 ? s3[1].call(this, l2, s3[2]) : void 0 : 4 === s3.length && (this[s3[0]] = l2 ? s3[3].call(this, l2.replace(s3[1], s3[2])) : void 0) : this[s3] = l2 || a2;
                c2 += 2;
              }
            }, Z = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === u && t2[r2].length > 0) {
                for (var i2 = 0; i2 < t2[r2].length; i2++) if (J(t2[r2][i2], e2)) return "?" === r2 ? a2 : r2;
              } else if (J(t2[r2], e2)) return "?" === r2 ? a2 : r2;
              return e2;
            }, Y = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [g, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [g, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, g], [/opios[\/ ]+([\w\.]+)/i], [g, [f, W + " Mini"]], [/\bopr\/([\w\.]+)/i], [g, [f, W]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, g], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [g, [f, "UC" + T]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [g, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [g, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [g, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [g, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [g, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + T], g], [/\bfocus\/([\w\.]+)/i], [g, [f, I + " Focus"]], [/\bopt\/([\w\.]+)/i], [g, [f, W + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [g, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [g, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [g, [f, W + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [g, [f, "MIUI " + T]], [/fxios\/([-\w\.]+)/i], [g, [f, I]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + T]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + T], g], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], g], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, g], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, U], g], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, g], [/\bgsa\/([\w\.]+) .*safari\//i], [g, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [g, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [g, [f, A + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, A + " WebView"], g], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [g, [f, "Android " + T]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, g], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [g, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [g, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [g, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, g], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], g], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [g, [f, I + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, g], [/(cobalt)\/([\w\.]+)/i], [f, [g, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[w, "amd64"]], [/(ia32(?=;))/i], [[w, H]], [/((?:i[346]|x)86)[;\)]/i], [[w, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[w, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[w, "armhf"]], [/windows (ce|mobile); ppc;/i], [[w, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[w, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[w, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[w, H]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [y, L], [m, N]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [y, L], [m, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [y, k], [m, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [y, k], [m, N]], [/(macintosh);/i], [p, [y, k]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [y, D], [m, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [y, R], [m, N]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [y, R], [m, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [y, B], [m, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [y, B], [m, N]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [y, "OPPO"], [m, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [y, "Vivo"], [m, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [y, "Realme"], [m, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [y, q], [m, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [y, q], [m, N]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [y, "LG"], [m, N]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [y, "LG"], [m, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [y, "Lenovo"], [m, N]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [y, "Nokia"], [m, b]], [/(pixel c)\b/i], [p, [y, P], [m, N]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [y, P], [m, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [y, j], [m, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [y, j], [m, N]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [y, "OnePlus"], [m, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [y, C], [m, N]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [y, C], [m, b]], [/(playbook);[-\w\),; ]+(rim)/i], [p, y, [m, N]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [y, O], [m, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [y, E], [m, N]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [y, E], [m, b]], [/(nexus 9)/i], [p, [y, "HTC"], [m, N]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [y, [p, /_/g, " "], [m, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [y, "Acer"], [m, N]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [y, "Meizu"], [m, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [y, p, [m, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [y, p, [m, N]], [/(surface duo)/i], [p, [y, M], [m, N]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [y, "Fairphone"], [m, b]], [/(u304aa)/i], [p, [y, "AT&T"], [m, b]], [/\bsie-(\w*)/i], [p, [y, "Siemens"], [m, b]], [/\b(rct\w+) b/i], [p, [y, "RCA"], [m, N]], [/\b(venue[\d ]{2,7}) b/i], [p, [y, "Dell"], [m, N]], [/\b(q(?:mv|ta)\w+) b/i], [p, [y, "Verizon"], [m, N]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [y, "Barnes & Noble"], [m, N]], [/\b(tm\d{3}\w+) b/i], [p, [y, "NuVision"], [m, N]], [/\b(k88) b/i], [p, [y, "ZTE"], [m, N]], [/\b(nx\d{3}j) b/i], [p, [y, "ZTE"], [m, b]], [/\b(gen\d{3}) b.+49h/i], [p, [y, "Swiss"], [m, b]], [/\b(zur\d{3}) b/i], [p, [y, "Swiss"], [m, N]], [/\b((zeki)?tb.*\b) b/i], [p, [y, "Zeki"], [m, N]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[y, "Dragon Touch"], p, [m, N]], [/\b(ns-?\w{0,9}) b/i], [p, [y, "Insignia"], [m, N]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [y, "NextBook"], [m, N]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[y, "Voice"], p, [m, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[y, "LvTel"], p, [m, b]], [/\b(ph-1) /i], [p, [y, "Essential"], [m, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [y, "Envizen"], [m, N]], [/\b(trio[-\w\. ]+) b/i], [p, [y, "MachSpeed"], [m, N]], [/\btu_(1491) b/i], [p, [y, "Rotor"], [m, N]], [/(shield[\w ]+) b/i], [p, [y, "Nvidia"], [m, N]], [/(sprint) (\w+)/i], [y, p, [m, b]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [y, M], [m, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [y, F], [m, N]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [y, F], [m, b]], [/smart-tv.+(samsung)/i], [y, [m, _]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [y, L], [m, _]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[y, "LG"], [m, _]], [/(apple) ?tv/i], [y, [p, k + " TV"], [m, _]], [/crkey/i], [[p, A + "cast"], [y, P], [m, _]], [/droid.+aft(\w)( bui|\))/i], [p, [y, C], [m, _]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [y, D], [m, _]], [/(bravia[\w ]+)( bui|\))/i], [p, [y, j], [m, _]], [/(mitv-\w{5}) bui/i], [p, [y, B], [m, _]], [/Hbbtv.*(technisat) (.*);/i], [y, p, [m, _]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[y, G], [p, G], [m, _]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[m, _]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [y, p, [m, v]], [/droid.+; (shield) bui/i], [p, [y, "Nvidia"], [m, v]], [/(playstation [345portablevi]+)/i], [p, [y, j], [m, v]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [y, M], [m, v]], [/((pebble))app/i], [y, p, [m, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [y, k], [m, x]], [/droid.+; (glass) \d/i], [p, [y, P], [m, x]], [/droid.+; (wt63?0{2,3})\)/i], [p, [y, F], [m, x]], [/(quest( 2| pro)?)/i], [p, [y, U], [m, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [y, [m, S]], [/(aeobc)\b/i], [p, [y, C], [m, S]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [m, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [m, N]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[m, N]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[m, b]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [y, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [g, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [g, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, g], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [g, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, g], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [g, Z, Y]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [g, Z, Y]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[g, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, Q], [g, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [g, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, g], [/\(bb(10);/i], [g, [f, O]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [g, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [g, [f, I + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [g, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [g, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [g, [f, A + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, $], g], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, g], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], g], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, g]] }, ee = function(e2, t2) {
              if (typeof e2 === u && (t2 = e2, e2 = a2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof o2 !== l && o2.navigator ? o2.navigator : a2, i2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), n3 = r2 && r2.userAgentData ? r2.userAgentData : a2, s3 = t2 ? V(X, t2) : X, v2 = r2 && r2.userAgent == i2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = a2, t3[g] = a2, z.call(t3, i2, s3.browser), t3[h] = typeof (e3 = t3[g]) === c ? e3.replace(/[^\d\.]/g, "").split(".")[0] : a2, v2 && r2 && r2.brave && typeof r2.brave.isBrave == d && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[w] = a2, z.call(e3, i2, s3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[y] = a2, e3[p] = a2, e3[m] = a2, z.call(e3, i2, s3.device), v2 && !e3[m] && n3 && n3.mobile && (e3[m] = b), v2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== l && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[m] = N), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = a2, e3[g] = a2, z.call(e3, i2, s3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = a2, e3[g] = a2, z.call(e3, i2, s3.os), v2 && !e3[f] && n3 && "Unknown" != n3.platform && (e3[f] = n3.platform.replace(/chrome os/i, $).replace(/macos/i, Q)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return i2;
              }, this.setUA = function(e3) {
                return i2 = typeof e3 === c && e3.length > 350 ? G(e3, 350) : e3, this;
              }, this.setUA(i2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = K([f, g, h]), ee.CPU = K([w]), ee.DEVICE = K([p, y, m, v, b, _, N, x, S]), ee.ENGINE = ee.OS = K([f, g]), typeof s2 !== l ? (n2.exports && (s2 = n2.exports = ee), s2.UAParser = ee) : r.amdO ? void 0 !== (i = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = i) : typeof o2 !== l && (o2.UAParser = ee);
            var et = typeof o2 !== l && (o2.jQuery || o2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, s = {};
        function o(e2) {
          var t2 = s[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = s[e2] = { exports: {} }, i2 = true;
          try {
            n[e2].call(r2.exports, r2, r2.exports, o), i2 = false;
          } finally {
            i2 && delete s[e2];
          }
          return r2.exports;
        }
        o.ab = "//";
        var a = o(226);
        e.exports = a;
      })();
    }, 1037: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return s;
      } });
      let i = new (r(2067)).AsyncLocalStorage();
      function n(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let s2 = n(e2, t2);
        return s2 ? i.run(s2, r2) : r2();
      }
      function o(e2, t2) {
        return i.getStore() || (e2 && t2 ? n(e2, t2) : void 0);
      }
    }, 3757: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return a;
      }, interceptFetch: function() {
        return d;
      }, reader: function() {
        return s;
      } });
      let n = r(1037), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: n2, headers: s2, body: o2, cache: a2, credentials: d2, integrity: l, mode: u, redirect: c, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(s2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? i.from(await t2.arrayBuffer()).toString("base64") : null, cache: a2, credentials: d2, integrity: l, mode: u, redirect: c, referrer: h, referrerPolicy: p } };
      }
      async function a(e2, t2) {
        let r2 = (0, n.getTestReqInfo)(t2, s);
        if (!r2) return e2(t2);
        let { testData: a2, proxyPort: d2 } = r2, l = await o(a2, t2), u = await e2(`http://localhost:${d2}`, { method: "POST", body: JSON.stringify(l), next: { internal: true } });
        if (!u.ok) throw Error(`Proxy request failed: ${u.status}`);
        let c = await u.json(), { api: h } = c;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: n2 } = e3.response;
          return new Response(n2 ? i.from(n2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(c);
      }
      function d(e2) {
        return r.g.fetch = function(t2, r2) {
          var i2;
          return (null == r2 ? void 0 : null == (i2 = r2.next) ? void 0 : i2.internal) ? e2(t2, r2) : a(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 2538: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let i = r(1037), n = r(3757);
      function s() {
        return (0, n.interceptFetch)(r.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, n.reader, () => e2(t2, r2));
      }
    }, 2711: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = {};
    }, 2663: (e, t, r) => {
      "use strict";
      function i(e2, t2 = {}) {
        let i2;
        if ("/" === e2.charAt(0)) {
          let t3 = e2.split(" ");
          return { host: t3[0], database: t3[1] };
        }
        let n2 = {}, s = false;
        / |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(e2) && (e2 = encodeURI(e2).replace(/%25(\d\d)/g, "%$1"));
        try {
          try {
            i2 = new URL(e2, "postgres://base");
          } catch (t3) {
            i2 = new URL(e2.replace("@/", "@___DUMMY___/"), "postgres://base"), s = true;
          }
        } catch (e3) {
          throw e3.input && (e3.input = "*****REDACTED*****"), e3;
        }
        for (let e3 of i2.searchParams.entries()) n2[e3[0]] = e3[1];
        if (n2.user = n2.user || decodeURIComponent(i2.username), n2.password = n2.password || decodeURIComponent(i2.password), "socket:" == i2.protocol) return n2.host = decodeURI(i2.pathname), n2.database = i2.searchParams.get("db"), n2.client_encoding = i2.searchParams.get("encoding"), n2;
        let o = s ? "" : i2.hostname;
        n2.host ? o && /^%2f/i.test(o) && (i2.pathname = o + i2.pathname) : n2.host = decodeURIComponent(o), n2.port || (n2.port = i2.port);
        let a = i2.pathname.slice(1) || null;
        n2.database = a ? decodeURI(a) : null, ("true" === n2.ssl || "1" === n2.ssl) && (n2.ssl = true), "0" === n2.ssl && (n2.ssl = false), (n2.sslcert || n2.sslkey || n2.sslrootcert || n2.sslmode) && (n2.ssl = {});
        let d = n2.sslcert || n2.sslkey || n2.sslrootcert ? r(5080) : null;
        if (n2.sslcert && (n2.ssl.cert = d.readFileSync(n2.sslcert).toString()), n2.sslkey && (n2.ssl.key = d.readFileSync(n2.sslkey).toString()), n2.sslrootcert && (n2.ssl.ca = d.readFileSync(n2.sslrootcert).toString()), t2.useLibpqCompat && n2.uselibpqcompat) throw Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
        if ("true" === n2.uselibpqcompat || t2.useLibpqCompat) switch (n2.sslmode) {
          case "disable":
            n2.ssl = false;
            break;
          case "prefer":
            n2.ssl.rejectUnauthorized = false;
            break;
          case "require":
            n2.sslrootcert ? n2.ssl.checkServerIdentity = function() {
            } : n2.ssl.rejectUnauthorized = false;
            break;
          case "verify-ca":
            if (!n2.ssl.ca) throw Error("SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security.");
            n2.ssl.checkServerIdentity = function() {
            };
        }
        else switch (n2.sslmode) {
          case "disable":
            n2.ssl = false;
            break;
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            "verify-full" !== n2.sslmode && function e3(t3) {
              !e3.warned && "undefined" != typeof process && process.emitWarning && (e3.warned = true, process.emitWarning(`SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as aliases for 'verify-full'.
In the next major version (pg-connection-string v3.0.0 and pg v9.0.0), these modes will adopt standard libpq semantics, which have weaker security guarantees.

To prepare for this change:
- If you want the current behavior, explicitly use 'sslmode=verify-full'
- If you want libpq compatibility now, use 'uselibpqcompat=true&sslmode=${t3}'

See https://www.postgresql.org/docs/current/libpq-ssl.html for libpq SSL mode definitions.`));
            }(n2.sslmode);
            break;
          case "no-verify":
            n2.ssl.rejectUnauthorized = false;
        }
        return n2;
      }
      function n(e2) {
        return Object.entries(e2).reduce((e3, [t2, r2]) => {
          if ("ssl" === t2) "boolean" == typeof r2 && (e3[t2] = r2), "object" == typeof r2 && (e3[t2] = Object.entries(r2).reduce((e4, [t3, r3]) => (null != r3 && (e4[t3] = r3), e4), {}));
          else if (null != r2) {
            if ("port" === t2) {
              if ("" !== r2) {
                let i2 = parseInt(r2, 10);
                if (isNaN(i2)) throw Error(`Invalid ${t2}: ${r2}`);
                e3[t2] = i2;
              }
            } else e3[t2] = r2;
          }
          return e3;
        }, {});
      }
      e.exports = i, i.parse = i, i.toClientConfig = n, i.parseIntoClientConfig = function(e2) {
        return n(i(e2));
      };
    }, 8014: (e) => {
      "use strict";
      e.exports = function(e2) {
        var t, r, i, n, s, o, a = e2.readInt32BE(0), d = e2.readUInt32BE(4), l = "";
        a < 0 && (a = ~a + (0 === d), d = ~d + 1 >>> 0, l = "-");
        var u = "";
        if (t = a % 1e6, a = a / 1e6 >>> 0, d = (r = 4294967296 * t + d) / 1e6 >>> 0, i = "" + (r - 1e6 * d), 0 === d && 0 === a) return l + i + u;
        for (o = 0, n = "", s = 6 - i.length; o < s; o++) n += "0";
        if (u = n + i + u, t = a % 1e6, a = a / 1e6 >>> 0, d = (r = 4294967296 * t + d) / 1e6 >>> 0, i = "" + (r - 1e6 * d), 0 === d && 0 === a) return l + i + u;
        for (o = 0, n = "", s = 6 - i.length; o < s; o++) n += "0";
        if (u = n + i + u, t = a % 1e6, a = a / 1e6 >>> 0, d = (r = 4294967296 * t + d) / 1e6 >>> 0, i = "" + (r - 1e6 * d), 0 === d && 0 === a) return l + i + u;
        for (o = 0, n = "", s = 6 - i.length; o < s; o++) n += "0";
        return u = n + i + u, l + (i = "" + (r = 4294967296 * (t = a % 1e6) + d) % 1e6) + u;
      };
    }, 6781: (e, t, r) => {
      "use strict";
      let i = r(5846).EventEmitter, n = function() {
      }, s = (e2, t2) => {
        let r2 = e2.findIndex(t2);
        return -1 === r2 ? void 0 : e2.splice(r2, 1)[0];
      };
      class o {
        constructor(e2, t2, r2) {
          this.client = e2, this.idleListener = t2, this.timeoutId = r2;
        }
      }
      class a {
        constructor(e2) {
          this.callback = e2;
        }
      }
      function d(e2, t2) {
        let r2, i2;
        return t2 ? { callback: t2, result: void 0 } : { callback: function(e3, t3) {
          e3 ? r2(e3) : i2(t3);
        }, result: new e2(function(e3, t3) {
          i2 = e3, r2 = t3;
        }).catch((e3) => {
          throw Error.captureStackTrace(e3), e3;
        }) };
      }
      class l extends i {
        constructor(e2, t2) {
          super(), this.options = Object.assign({}, e2), null != e2 && "password" in e2 && Object.defineProperty(this.options, "password", { configurable: true, enumerable: false, writable: true, value: e2.password }), null != e2 && e2.ssl && e2.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.min = this.options.min || 0, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
          }, this.Client = this.options.Client || t2 || r(6679).Client, this.Promise = this.options.Promise || r.g.Promise, void 0 === this.options.idleTimeoutMillis && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
        }
        _promiseTry(e2) {
          let t2 = this.Promise;
          return "function" == typeof t2.try ? t2.try(e2) : new t2((t3) => t3(e2()));
        }
        _isFull() {
          return this._clients.length >= this.options.max;
        }
        _isAboveMin() {
          return this._clients.length > this.options.min;
        }
        _pulseQueue() {
          if (this.log("pulse queue"), this.ended) {
            this.log("pulse queue ended");
            return;
          }
          if (this.ending) {
            this.log("pulse queue on ending"), this._idle.length && this._idle.slice().map((e3) => {
              this._remove(e3.client);
            }), this._clients.length || (this.ended = true, this._endCallback());
            return;
          }
          if (!this._pendingQueue.length) {
            this.log("no queued requests");
            return;
          }
          if (!this._idle.length && this._isFull()) return;
          let e2 = this._pendingQueue.shift();
          if (this._idle.length) {
            let t2 = this._idle.pop();
            clearTimeout(t2.timeoutId);
            let r2 = t2.client;
            r2.ref && r2.ref();
            let i2 = t2.idleListener;
            return this._acquireClient(r2, e2, i2, false);
          }
          if (!this._isFull()) return this.newClient(e2);
          throw Error("unexpected condition");
        }
        _remove(e2, t2) {
          let r2 = s(this._idle, (t3) => t3.client === e2);
          void 0 !== r2 && clearTimeout(r2.timeoutId), this._clients = this._clients.filter((t3) => t3 !== e2);
          let i2 = this;
          e2.end(() => {
            i2.emit("remove", e2), "function" == typeof t2 && t2();
          });
        }
        connect(e2) {
          if (this.ending) {
            let t3 = Error("Cannot use a pool after calling end on the pool");
            return e2 ? e2(t3) : this.Promise.reject(t3);
          }
          let t2 = d(this.Promise, e2), r2 = t2.result;
          if (this._isFull() || this._idle.length) {
            if (this._idle.length && process.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis) return this._pendingQueue.push(new a(t2.callback)), r2;
            let e3 = (e4, r3, i3) => {
              clearTimeout(n2), t2.callback(e4, r3, i3);
            }, i2 = new a(e3), n2 = setTimeout(() => {
              s(this._pendingQueue, (t3) => t3.callback === e3), i2.timedOut = true, t2.callback(Error("timeout exceeded when trying to connect"));
            }, this.options.connectionTimeoutMillis);
            return n2.unref && n2.unref(), this._pendingQueue.push(i2), r2;
          }
          return this.newClient(new a(t2.callback)), r2;
        }
        newClient(e2) {
          var t2;
          let r2;
          let i2 = new this.Client(this.options);
          this._clients.push(i2);
          let s2 = (t2 = this, function e3(r3) {
            r3.client = i2, i2.removeListener("error", e3), i2.on("error", () => {
              t2.log("additional client error after disconnection due to error", r3);
            }), t2._remove(i2), t2.emit("error", r3, i2);
          });
          this.log("checking client timeout");
          let o2 = false;
          this.options.connectionTimeoutMillis && (r2 = setTimeout(() => {
            i2.connection ? (this.log("ending client due to timeout"), o2 = true, i2.connection.stream.destroy()) : i2.isConnected() || (this.log("ending client due to timeout"), o2 = true, i2.end());
          }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), i2.connect((t3) => {
            if (r2 && clearTimeout(r2), i2.on("error", s2), t3) this.log("client failed to connect", t3), this._clients = this._clients.filter((e3) => e3 !== i2), o2 && (t3 = Error("Connection terminated due to connection timeout", { cause: t3 })), this._pulseQueue(), e2.timedOut || e2.callback(t3, void 0, n);
            else {
              if (this.log("new client connected"), this.options.onConnect) {
                this._promiseTry(() => this.options.onConnect(i2)).then(() => {
                  this._afterConnect(i2, e2, s2);
                }, (t4) => {
                  this._clients = this._clients.filter((e3) => e3 !== i2), i2.end(() => {
                    this._pulseQueue(), e2.timedOut || e2.callback(t4, void 0, n);
                  });
                });
                return;
              }
              return this._afterConnect(i2, e2, s2);
            }
          });
        }
        _afterConnect(e2, t2, r2) {
          if (0 !== this.options.maxLifetimeSeconds) {
            let t3 = setTimeout(() => {
              this.log("ending client due to expired lifetime"), this._expired.add(e2), -1 !== this._idle.findIndex((t4) => t4.client === e2) && this._acquireClient(e2, new a((e3, t4, r3) => r3()), r2, false);
            }, 1e3 * this.options.maxLifetimeSeconds);
            t3.unref(), e2.once("end", () => clearTimeout(t3));
          }
          return this._acquireClient(e2, t2, r2, true);
        }
        _acquireClient(e2, t2, r2, i2) {
          i2 && this.emit("connect", e2), this.emit("acquire", e2), e2.release = this._releaseOnce(e2, r2), e2.removeListener("error", r2), t2.timedOut ? i2 && this.options.verify ? this.options.verify(e2, e2.release) : e2.release() : i2 && this.options.verify ? this.options.verify(e2, (r3) => {
            if (r3) return e2.release(r3), t2.callback(r3, void 0, n);
            t2.callback(void 0, e2, e2.release);
          }) : t2.callback(void 0, e2, e2.release);
        }
        _releaseOnce(e2, t2) {
          let r2 = false;
          return (i2) => {
            r2 && function() {
              throw Error("Release called on client which has already been released to the pool.");
            }(), r2 = true, this._release(e2, t2, i2);
          };
        }
        _release(e2, t2, r2) {
          let i2;
          return (e2.on("error", t2), e2._poolUseCount = (e2._poolUseCount || 0) + 1, this.emit("release", r2, e2), r2 || this.ending || !e2._queryable || e2._ending || e2._poolUseCount >= this.options.maxUses) ? (e2._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e2, this._pulseQueue.bind(this))) : this._expired.has(e2) ? (this.log("remove expired client"), this._expired.delete(e2), this._remove(e2, this._pulseQueue.bind(this))) : void (this.options.idleTimeoutMillis && this._isAboveMin() && (i2 = setTimeout(() => {
            this._isAboveMin() && (this.log("remove idle client"), this._remove(e2, this._pulseQueue.bind(this)));
          }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && i2.unref()), this.options.allowExitOnIdle && e2.unref(), this._idle.push(new o(e2, t2, i2)), this._pulseQueue());
        }
        query(e2, t2, r2) {
          if ("function" == typeof e2) {
            let t3 = d(this.Promise, e2);
            return setImmediate(function() {
              return t3.callback(Error("Passing a function as the first parameter to pool.query is not supported"));
            }), t3.result;
          }
          "function" == typeof t2 && (r2 = t2, t2 = void 0);
          let i2 = d(this.Promise, r2);
          return r2 = i2.callback, this.connect((i3, n2) => {
            if (i3) return r2(i3);
            let s2 = false, o2 = (e3) => {
              s2 || (s2 = true, n2.release(e3), r2(e3));
            };
            n2.once("error", o2), this.log("dispatching query");
            try {
              n2.query(e2, t2, (e3, t3) => (this.log("query dispatched"), n2.removeListener("error", o2), s2) ? void 0 : (s2 = true, n2.release(e3), e3) ? r2(e3) : r2(void 0, t3));
            } catch (e3) {
              return n2.release(e3), r2(e3);
            }
          }), i2.result;
        }
        end(e2) {
          if (this.log("ending"), this.ending) {
            let t3 = Error("Called end on pool more than once");
            return e2 ? e2(t3) : this.Promise.reject(t3);
          }
          this.ending = true;
          let t2 = d(this.Promise, e2);
          return this._endCallback = t2.callback, this._pulseQueue(), t2.result;
        }
        get waitingCount() {
          return this._pendingQueue.length;
        }
        get idleCount() {
          return this._idle.length;
        }
        get expiredCount() {
          return this._clients.reduce((e2, t2) => e2 + (this._expired.has(t2) ? 1 : 0), 0);
        }
        get totalCount() {
          return this._clients.length;
        }
      }
      e.exports = l;
    }, 1063: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), t.BufferReader = void 0;
      class n {
        constructor(e2 = 0) {
          this.offset = e2, this.buffer = i.allocUnsafe(0), this.encoding = "utf-8";
        }
        setBuffer(e2, t2) {
          this.offset = e2, this.buffer = t2;
        }
        int16() {
          let e2 = this.buffer.readInt16BE(this.offset);
          return this.offset += 2, e2;
        }
        byte() {
          let e2 = this.buffer[this.offset];
          return this.offset++, e2;
        }
        int32() {
          let e2 = this.buffer.readInt32BE(this.offset);
          return this.offset += 4, e2;
        }
        uint32() {
          let e2 = this.buffer.readUInt32BE(this.offset);
          return this.offset += 4, e2;
        }
        string(e2) {
          let t2 = this.buffer.toString(this.encoding, this.offset, this.offset + e2);
          return this.offset += e2, t2;
        }
        cstring() {
          let e2 = this.offset, t2 = e2;
          for (; 0 !== this.buffer[t2++]; ) ;
          return this.offset = t2, this.buffer.toString(this.encoding, e2, t2 - 1);
        }
        bytes(e2) {
          let t2 = this.buffer.slice(this.offset, this.offset + e2);
          return this.offset += e2, t2;
        }
      }
      t.BufferReader = n;
    }, 667: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), t.Writer = void 0;
      class n {
        constructor(e2 = 256) {
          this.size = e2, this.offset = 5, this.headerPosition = 0, this.buffer = i.allocUnsafe(e2);
        }
        ensure(e2) {
          if (this.buffer.length - this.offset < e2) {
            let t2 = this.buffer, r2 = t2.length + (t2.length >> 1) + e2;
            this.buffer = i.allocUnsafe(r2), t2.copy(this.buffer);
          }
        }
        addInt32(e2) {
          return this.ensure(4), this.buffer[this.offset++] = e2 >>> 24 & 255, this.buffer[this.offset++] = e2 >>> 16 & 255, this.buffer[this.offset++] = e2 >>> 8 & 255, this.buffer[this.offset++] = e2 >>> 0 & 255, this;
        }
        addInt16(e2) {
          return this.ensure(2), this.buffer[this.offset++] = e2 >>> 8 & 255, this.buffer[this.offset++] = e2 >>> 0 & 255, this;
        }
        addCString(e2) {
          if (e2) {
            let t2 = i.byteLength(e2);
            this.ensure(t2 + 1), this.buffer.write(e2, this.offset, "utf-8"), this.offset += t2;
          } else this.ensure(1);
          return this.buffer[this.offset++] = 0, this;
        }
        addString(e2 = "") {
          let t2 = i.byteLength(e2);
          return this.ensure(t2), this.buffer.write(e2, this.offset), this.offset += t2, this;
        }
        add(e2) {
          return this.ensure(e2.length), e2.copy(this.buffer, this.offset), this.offset += e2.length, this;
        }
        join(e2) {
          if (e2) {
            this.buffer[this.headerPosition] = e2;
            let t2 = this.offset - (this.headerPosition + 1);
            this.buffer.writeInt32BE(t2, this.headerPosition + 1);
          }
          return this.buffer.slice(e2 ? 0 : 5, this.offset);
        }
        flush(e2) {
          let t2 = this.join(e2);
          return this.offset = 5, this.headerPosition = 0, this.buffer = i.allocUnsafe(this.size), t2;
        }
      }
      t.Writer = n;
    }, 6106: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.DatabaseError = t.serialize = t.parse = void 0;
      let i = r(7072);
      Object.defineProperty(t, "DatabaseError", { enumerable: true, get: function() {
        return i.DatabaseError;
      } });
      let n = r(8716);
      Object.defineProperty(t, "serialize", { enumerable: true, get: function() {
        return n.serialize;
      } });
      let s = r(8432);
      t.parse = function(e2, t2) {
        let r2 = new s.Parser();
        return e2.on("data", (e3) => r2.parse(e3, t2)), new Promise((t3) => e2.on("end", () => t3()));
      };
    }, 7072: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.NoticeMessage = t.DataRowMessage = t.CommandCompleteMessage = t.ReadyForQueryMessage = t.NotificationResponseMessage = t.BackendKeyDataMessage = t.AuthenticationMD5Password = t.ParameterStatusMessage = t.ParameterDescriptionMessage = t.RowDescriptionMessage = t.Field = t.CopyResponse = t.CopyDataMessage = t.DatabaseError = t.copyDone = t.emptyQuery = t.replicationStart = t.portalSuspended = t.noData = t.closeComplete = t.bindComplete = t.parseComplete = void 0, t.parseComplete = { name: "parseComplete", length: 5 }, t.bindComplete = { name: "bindComplete", length: 5 }, t.closeComplete = { name: "closeComplete", length: 5 }, t.noData = { name: "noData", length: 5 }, t.portalSuspended = { name: "portalSuspended", length: 5 }, t.replicationStart = { name: "replicationStart", length: 4 }, t.emptyQuery = { name: "emptyQuery", length: 4 }, t.copyDone = { name: "copyDone", length: 4 };
      class r extends Error {
        constructor(e2, t2, r2) {
          super(e2), this.length = t2, this.name = r2;
        }
      }
      t.DatabaseError = r;
      class i {
        constructor(e2, t2) {
          this.length = e2, this.chunk = t2, this.name = "copyData";
        }
      }
      t.CopyDataMessage = i;
      class n {
        constructor(e2, t2, r2, i2) {
          this.length = e2, this.name = t2, this.binary = r2, this.columnTypes = Array(i2);
        }
      }
      t.CopyResponse = n;
      class s {
        constructor(e2, t2, r2, i2, n2, s2, o2) {
          this.name = e2, this.tableID = t2, this.columnID = r2, this.dataTypeID = i2, this.dataTypeSize = n2, this.dataTypeModifier = s2, this.format = o2;
        }
      }
      t.Field = s;
      class o {
        constructor(e2, t2) {
          this.length = e2, this.fieldCount = t2, this.name = "rowDescription", this.fields = Array(this.fieldCount);
        }
      }
      t.RowDescriptionMessage = o;
      class a {
        constructor(e2, t2) {
          this.length = e2, this.parameterCount = t2, this.name = "parameterDescription", this.dataTypeIDs = Array(this.parameterCount);
        }
      }
      t.ParameterDescriptionMessage = a;
      class d {
        constructor(e2, t2, r2) {
          this.length = e2, this.parameterName = t2, this.parameterValue = r2, this.name = "parameterStatus";
        }
      }
      t.ParameterStatusMessage = d;
      class l {
        constructor(e2, t2) {
          this.length = e2, this.salt = t2, this.name = "authenticationMD5Password";
        }
      }
      t.AuthenticationMD5Password = l;
      class u {
        constructor(e2, t2, r2) {
          this.length = e2, this.processID = t2, this.secretKey = r2, this.name = "backendKeyData";
        }
      }
      t.BackendKeyDataMessage = u;
      class c {
        constructor(e2, t2, r2, i2) {
          this.length = e2, this.processId = t2, this.channel = r2, this.payload = i2, this.name = "notification";
        }
      }
      t.NotificationResponseMessage = c;
      class h {
        constructor(e2, t2) {
          this.length = e2, this.status = t2, this.name = "readyForQuery";
        }
      }
      t.ReadyForQueryMessage = h;
      class p {
        constructor(e2, t2) {
          this.length = e2, this.text = t2, this.name = "commandComplete";
        }
      }
      t.CommandCompleteMessage = p;
      class f {
        constructor(e2, t2) {
          this.length = e2, this.fields = t2, this.name = "dataRow", this.fieldCount = t2.length;
        }
      }
      t.DataRowMessage = f;
      class m {
        constructor(e2, t2) {
          this.length = e2, this.message = t2, this.name = "notice";
        }
      }
      t.NoticeMessage = m;
    }, 8432: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), t.Parser = void 0;
      let n = r(7072), s = r(1063), o = i.allocUnsafe(0);
      class a {
        constructor(e2) {
          if (this.buffer = o, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new s.BufferReader(), (null == e2 ? void 0 : e2.mode) === "binary") throw Error("Binary mode not supported yet");
          this.mode = (null == e2 ? void 0 : e2.mode) || "text";
        }
        parse(e2, t2) {
          this.mergeBuffer(e2);
          let r2 = this.bufferOffset + this.bufferLength, i2 = this.bufferOffset;
          for (; i2 + 5 <= r2; ) {
            let e3 = this.buffer[i2], n2 = this.buffer.readUInt32BE(i2 + 1), s2 = 1 + n2;
            if (s2 + i2 <= r2) t2(this.handlePacket(i2 + 5, e3, n2, this.buffer)), i2 += s2;
            else break;
          }
          i2 === r2 ? (this.buffer = o, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = r2 - i2, this.bufferOffset = i2);
        }
        mergeBuffer(e2) {
          if (this.bufferLength > 0) {
            let t2 = this.bufferLength + e2.byteLength;
            if (t2 + this.bufferOffset > this.buffer.byteLength) {
              let e3;
              if (t2 <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) e3 = this.buffer;
              else {
                let r2 = 2 * this.buffer.byteLength;
                for (; t2 >= r2; ) r2 *= 2;
                e3 = i.allocUnsafe(r2);
              }
              this.buffer.copy(e3, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = e3, this.bufferOffset = 0;
            }
            e2.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t2;
          } else this.buffer = e2, this.bufferOffset = 0, this.bufferLength = e2.byteLength;
        }
        handlePacket(e2, t2, r2, i2) {
          let s2;
          let { reader: a2 } = this;
          switch (a2.setBuffer(e2, i2), t2) {
            case 50:
              s2 = n.bindComplete;
              break;
            case 49:
              s2 = n.parseComplete;
              break;
            case 51:
              s2 = n.closeComplete;
              break;
            case 110:
              s2 = n.noData;
              break;
            case 115:
              s2 = n.portalSuspended;
              break;
            case 99:
              s2 = n.copyDone;
              break;
            case 87:
              s2 = n.replicationStart;
              break;
            case 73:
              s2 = n.emptyQuery;
              break;
            case 68:
              s2 = w(a2);
              break;
            case 67:
              s2 = l(a2);
              break;
            case 90:
              s2 = d(a2);
              break;
            case 65:
              s2 = f(a2);
              break;
            case 82:
              s2 = N(a2, r2);
              break;
            case 83:
              s2 = v(a2);
              break;
            case 75:
              s2 = b(a2);
              break;
            case 69:
              s2 = _(a2, "error");
              break;
            case 78:
              s2 = _(a2, "notice");
              break;
            case 84:
              s2 = m(a2);
              break;
            case 116:
              s2 = g(a2);
              break;
            case 71:
              s2 = c(a2);
              break;
            case 72:
              s2 = h(a2);
              break;
            case 100:
              s2 = u(a2, r2);
              break;
            default:
              return new n.DatabaseError("received invalid response: " + t2.toString(16), r2, "error");
          }
          return a2.setBuffer(0, o), s2.length = r2, s2;
        }
      }
      t.Parser = a;
      let d = (e2) => {
        let t2 = e2.string(1);
        return new n.ReadyForQueryMessage(-1, t2);
      }, l = (e2) => {
        let t2 = e2.cstring();
        return new n.CommandCompleteMessage(-1, t2);
      }, u = (e2, t2) => {
        let r2 = e2.bytes(t2 - 4);
        return new n.CopyDataMessage(-1, r2);
      }, c = (e2) => p(e2, "copyInResponse"), h = (e2) => p(e2, "copyOutResponse"), p = (e2, t2) => {
        let r2 = 0 !== e2.byte(), i2 = e2.int16(), s2 = new n.CopyResponse(-1, t2, r2, i2);
        for (let t3 = 0; t3 < i2; t3++) s2.columnTypes[t3] = e2.int16();
        return s2;
      }, f = (e2) => {
        let t2 = e2.int32(), r2 = e2.cstring(), i2 = e2.cstring();
        return new n.NotificationResponseMessage(-1, t2, r2, i2);
      }, m = (e2) => {
        let t2 = e2.int16(), r2 = new n.RowDescriptionMessage(-1, t2);
        for (let i2 = 0; i2 < t2; i2++) r2.fields[i2] = y(e2);
        return r2;
      }, y = (e2) => {
        let t2 = e2.cstring(), r2 = e2.uint32(), i2 = e2.int16(), s2 = e2.uint32(), o2 = e2.int16(), a2 = e2.int32(), d2 = 0 === e2.int16() ? "text" : "binary";
        return new n.Field(t2, r2, i2, s2, o2, a2, d2);
      }, g = (e2) => {
        let t2 = e2.int16(), r2 = new n.ParameterDescriptionMessage(-1, t2);
        for (let i2 = 0; i2 < t2; i2++) r2.dataTypeIDs[i2] = e2.int32();
        return r2;
      }, w = (e2) => {
        let t2 = e2.int16(), r2 = Array(t2);
        for (let i2 = 0; i2 < t2; i2++) {
          let t3 = e2.int32();
          r2[i2] = -1 === t3 ? null : e2.string(t3);
        }
        return new n.DataRowMessage(-1, r2);
      }, v = (e2) => {
        let t2 = e2.cstring(), r2 = e2.cstring();
        return new n.ParameterStatusMessage(-1, t2, r2);
      }, b = (e2) => {
        let t2 = e2.int32(), r2 = e2.int32();
        return new n.BackendKeyDataMessage(-1, t2, r2);
      }, N = (e2, t2) => {
        let r2 = e2.int32(), i2 = { name: "authenticationOk", length: t2 };
        switch (r2) {
          case 0:
            break;
          case 3:
            8 === i2.length && (i2.name = "authenticationCleartextPassword");
            break;
          case 5:
            if (12 === i2.length) {
              i2.name = "authenticationMD5Password";
              let t3 = e2.bytes(4);
              return new n.AuthenticationMD5Password(-1, t3);
            }
            break;
          case 10:
            {
              let t3;
              i2.name = "authenticationSASL", i2.mechanisms = [];
              do
                (t3 = e2.cstring()) && i2.mechanisms.push(t3);
              while (t3);
            }
            break;
          case 11:
            i2.name = "authenticationSASLContinue", i2.data = e2.string(t2 - 8);
            break;
          case 12:
            i2.name = "authenticationSASLFinal", i2.data = e2.string(t2 - 8);
            break;
          default:
            throw Error("Unknown authenticationOk message type " + r2);
        }
        return i2;
      }, _ = (e2, t2) => {
        let r2 = {}, i2 = e2.string(1);
        for (; "\0" !== i2; ) r2[i2] = e2.cstring(), i2 = e2.string(1);
        let s2 = r2.M, o2 = "notice" === t2 ? new n.NoticeMessage(-1, s2) : new n.DatabaseError(s2, -1, t2);
        return o2.severity = r2.S, o2.code = r2.C, o2.detail = r2.D, o2.hint = r2.H, o2.position = r2.P, o2.internalPosition = r2.p, o2.internalQuery = r2.q, o2.where = r2.W, o2.schema = r2.s, o2.table = r2.t, o2.column = r2.c, o2.dataType = r2.d, o2.constraint = r2.n, o2.file = r2.F, o2.line = r2.L, o2.routine = r2.R, o2;
      };
    }, 8716: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), t.serialize = void 0;
      let n = r(667), s = new n.Writer(), o = [], a = new n.Writer(), d = function(e2, t2) {
        for (let r2 = 0; r2 < e2.length; r2++) {
          let n2 = t2 ? t2(e2[r2], r2) : e2[r2];
          null == n2 ? (s.addInt16(0), a.addInt32(-1)) : n2 instanceof i ? (s.addInt16(1), a.addInt32(n2.length), a.add(n2)) : (s.addInt16(0), a.addInt32(i.byteLength(n2)), a.addString(n2));
        }
      }, l = i.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), u = (e2, t2) => {
        let r2 = 4 + i.byteLength(t2) + 1, n2 = i.allocUnsafe(1 + r2);
        return n2[0] = e2, n2.writeInt32BE(r2, 1), n2.write(t2, 5, "utf-8"), n2[r2] = 0, n2;
      }, c = s.addCString("P").flush(68), h = s.addCString("S").flush(68), p = (e2) => i.from([e2, 0, 0, 0, 4]), f = p(72), m = p(83), y = p(88), g = p(99);
      t.serialize = { startup: (e2) => {
        for (let t3 of (s.addInt16(3).addInt16(0), Object.keys(e2))) s.addCString(t3).addCString(e2[t3]);
        s.addCString("client_encoding").addCString("UTF8");
        let t2 = s.addCString("").flush(), r2 = t2.length + 4;
        return new n.Writer().addInt32(r2).add(t2).flush();
      }, password: (e2) => s.addCString(e2).flush(112), requestSsl: () => {
        let e2 = i.allocUnsafe(8);
        return e2.writeInt32BE(8, 0), e2.writeInt32BE(80877103, 4), e2;
      }, sendSASLInitialResponseMessage: function(e2, t2) {
        return s.addCString(e2).addInt32(i.byteLength(t2)).addString(t2), s.flush(112);
      }, sendSCRAMClientFinalMessage: function(e2) {
        return s.addString(e2).flush(112);
      }, query: (e2) => s.addCString(e2).flush(81), parse: (e2) => {
        let t2 = e2.name || "";
        t2.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", t2, t2.length), console.error("This can cause conflicts and silent errors executing queries"));
        let r2 = e2.types || o, i2 = r2.length, n2 = s.addCString(t2).addCString(e2.text).addInt16(i2);
        for (let e3 = 0; e3 < i2; e3++) n2.addInt32(r2[e3]);
        return s.flush(80);
      }, bind: (e2 = {}) => {
        let t2 = e2.portal || "", r2 = e2.statement || "", i2 = e2.binary || false, n2 = e2.values || o, l2 = n2.length;
        return s.addCString(t2).addCString(r2), s.addInt16(l2), d(n2, e2.valueMapper), s.addInt16(l2), s.add(a.flush()), s.addInt16(1), s.addInt16(i2 ? 1 : 0), s.flush(66);
      }, execute: (e2) => {
        if (!e2 || !e2.portal && !e2.rows) return l;
        let t2 = e2.portal || "", r2 = e2.rows || 0, n2 = i.byteLength(t2), s2 = 4 + n2 + 1 + 4, o2 = i.allocUnsafe(1 + s2);
        return o2[0] = 69, o2.writeInt32BE(s2, 1), o2.write(t2, 5, "utf-8"), o2[n2 + 5] = 0, o2.writeUInt32BE(r2, o2.length - 4), o2;
      }, describe: (e2) => e2.name ? u(68, `${e2.type}${e2.name || ""}`) : "P" === e2.type ? c : h, close: (e2) => u(67, `${e2.type}${e2.name || ""}`), flush: () => f, sync: () => m, end: () => y, copyData: (e2) => s.add(e2).flush(100), copyDone: () => g, copyFail: (e2) => u(102, e2), cancel: (e2, t2) => {
        let r2 = i.allocUnsafe(16);
        return r2.writeInt32BE(16, 0), r2.writeInt16BE(1234, 4), r2.writeInt16BE(5678, 6), r2.writeInt32BE(e2, 8), r2.writeInt32BE(t2, 12), r2;
      } };
    }, 7498: (e, t, r) => {
      var i = r(6773), n = r(8740), s = r(7017), o = r(3277);
      t.getTypeParser = function(e2, t2) {
        return a[t2 = t2 || "text"] && a[t2][e2] || d;
      }, t.setTypeParser = function(e2, t2, r2) {
        "function" == typeof t2 && (r2 = t2, t2 = "text"), a[t2][e2] = r2;
      }, t.arrayParser = s, t.builtins = o;
      var a = { text: {}, binary: {} };
      function d(e2) {
        return String(e2);
      }
      i.init(function(e2, t2) {
        a.text[e2] = t2;
      }), n.init(function(e2, t2) {
        a.binary[e2] = t2;
      });
    }, 7017: (e, t, r) => {
      var i = r(6375);
      e.exports = { create: function(e2, t2) {
        return { parse: function() {
          return i.parse(e2, t2);
        } };
      } };
    }, 8740: (e, t, r) => {
      var i = r(8014), n = function(e2, t2, r2, i2, n2) {
        r2 = r2 || 0, i2 = i2 || false, n2 = n2 || function(e3, t3, r3) {
          return e3 * Math.pow(2, r3) + t3;
        };
        var s2 = r2 >> 3, o2 = function(e3) {
          return i2 ? 255 & ~e3 : e3;
        }, a2 = 255, d2 = 8 - r2 % 8;
        t2 < d2 && (a2 = 255 << 8 - t2 & 255, d2 = t2), r2 && (a2 >>= r2 % 8);
        var l2 = 0;
        r2 % 8 + t2 >= 8 && (l2 = n2(0, o2(e2[s2]) & a2, d2));
        for (var u2 = t2 + r2 >> 3, c2 = s2 + 1; c2 < u2; c2++) l2 = n2(l2, o2(e2[c2]), 8);
        var h2 = (t2 + r2) % 8;
        return h2 > 0 && (l2 = n2(l2, o2(e2[u2]) >> 8 - h2, h2)), l2;
      }, s = function(e2, t2, r2) {
        var i2 = Math.pow(2, r2 - 1) - 1, s2 = n(e2, 1), o2 = n(e2, r2, 1);
        if (0 === o2) return 0;
        var a2 = 1, d2 = n(e2, t2, r2 + 1, false, function(e3, t3, r3) {
          0 === e3 && (e3 = 1);
          for (var i3 = 1; i3 <= r3; i3++) a2 /= 2, (t3 & 1 << r3 - i3) > 0 && (e3 += a2);
          return e3;
        });
        return o2 == Math.pow(2, r2 + 1) - 1 ? 0 === d2 ? 0 === s2 ? 1 / 0 : -1 / 0 : NaN : (0 === s2 ? 1 : -1) * Math.pow(2, o2 - i2) * d2;
      }, o = function(e2) {
        return 1 == n(e2, 1) ? -1 * (n(e2, 15, 1, true) + 1) : n(e2, 15, 1);
      }, a = function(e2) {
        return 1 == n(e2, 1) ? -1 * (n(e2, 31, 1, true) + 1) : n(e2, 31, 1);
      }, d = function(e2) {
        return s(e2, 23, 8);
      }, l = function(e2) {
        return s(e2, 52, 11);
      }, u = function(e2) {
        var t2 = n(e2, 16, 32);
        if (49152 == t2) return NaN;
        for (var r2 = Math.pow(1e4, n(e2, 16, 16)), i2 = 0, s2 = n(e2, 16), o2 = 0; o2 < s2; o2++) i2 += n(e2, 16, 64 + 16 * o2) * r2, r2 /= 1e4;
        var a2 = Math.pow(10, n(e2, 16, 48));
        return (0 === t2 ? 1 : -1) * Math.round(i2 * a2) / a2;
      }, c = function(e2, t2) {
        var r2 = n(t2, 1), i2 = n(t2, 63, 1), s2 = new Date((0 === r2 ? 1 : -1) * i2 / 1e3 + 9466848e5);
        return e2 || s2.setTime(s2.getTime() + 6e4 * s2.getTimezoneOffset()), s2.usec = i2 % 1e3, s2.getMicroSeconds = function() {
          return this.usec;
        }, s2.setMicroSeconds = function(e3) {
          this.usec = e3;
        }, s2.getUTCMicroSeconds = function() {
          return this.usec;
        }, s2;
      }, h = function(e2) {
        var t2 = n(e2, 32);
        n(e2, 32, 32);
        for (var r2 = n(e2, 32, 64), i2 = 96, s2 = [], o2 = 0; o2 < t2; o2++) s2[o2] = n(e2, 32, i2), i2 += 64;
        var a2 = function(t3) {
          var r3, s3 = n(e2, 32, i2);
          return (i2 += 32, 4294967295 == s3) ? null : 23 == t3 || 20 == t3 ? (r3 = n(e2, 8 * s3, i2), i2 += 8 * s3, r3) : 25 == t3 ? r3 = e2.toString(this.encoding, i2 >> 3, (i2 += s3 << 3) >> 3) : void console.log("ERROR: ElementType not implemented: " + t3);
        }, d2 = function(e3, t3) {
          var r3, i3 = [];
          if (e3.length > 1) {
            var n2 = e3.shift();
            for (r3 = 0; r3 < n2; r3++) i3[r3] = d2(e3, t3);
            e3.unshift(n2);
          } else for (r3 = 0; r3 < e3[0]; r3++) i3[r3] = a2(t3);
          return i3;
        };
        return d2(s2, r2);
      }, p = function(e2) {
        return e2.toString("utf8");
      }, f = function(e2) {
        return null === e2 ? null : n(e2, 8) > 0;
      };
      e.exports = { init: function(e2) {
        e2(20, i), e2(21, o), e2(23, a), e2(26, a), e2(1700, u), e2(700, d), e2(701, l), e2(16, f), e2(1114, c.bind(null, false)), e2(1184, c.bind(null, true)), e2(1e3, h), e2(1007, h), e2(1016, h), e2(1008, h), e2(1009, h), e2(25, p);
      } };
    }, 3277: (e) => {
      e.exports = { BOOL: 16, BYTEA: 17, CHAR: 18, INT8: 20, INT2: 21, INT4: 23, REGPROC: 24, TEXT: 25, OID: 26, TID: 27, XID: 28, CID: 29, JSON: 114, XML: 142, PG_NODE_TREE: 194, SMGR: 210, PATH: 602, POLYGON: 604, CIDR: 650, FLOAT4: 700, FLOAT8: 701, ABSTIME: 702, RELTIME: 703, TINTERVAL: 704, CIRCLE: 718, MACADDR8: 774, MONEY: 790, MACADDR: 829, INET: 869, ACLITEM: 1033, BPCHAR: 1042, VARCHAR: 1043, DATE: 1082, TIME: 1083, TIMESTAMP: 1114, TIMESTAMPTZ: 1184, INTERVAL: 1186, TIMETZ: 1266, BIT: 1560, VARBIT: 1562, NUMERIC: 1700, REFCURSOR: 1790, REGPROCEDURE: 2202, REGOPER: 2203, REGOPERATOR: 2204, REGCLASS: 2205, REGTYPE: 2206, UUID: 2950, TXID_SNAPSHOT: 2970, PG_LSN: 3220, PG_NDISTINCT: 3361, PG_DEPENDENCIES: 3402, TSVECTOR: 3614, TSQUERY: 3615, GTSVECTOR: 3642, REGCONFIG: 3734, REGDICTIONARY: 3769, JSONB: 3802, REGNAMESPACE: 4089, REGROLE: 4096 };
    }, 6773: (e, t, r) => {
      var i = r(6375), n = r(7017), s = r(3857), o = r(6696), a = r(7454);
      function d(e2) {
        return function(t2) {
          return null === t2 ? t2 : e2(t2);
        };
      }
      function l(e2) {
        return null === e2 ? e2 : "TRUE" === e2 || "t" === e2 || "true" === e2 || "y" === e2 || "yes" === e2 || "on" === e2 || "1" === e2;
      }
      function u(e2) {
        return e2 ? i.parse(e2, l) : null;
      }
      function c(e2) {
        return parseInt(e2, 10);
      }
      function h(e2) {
        return e2 ? i.parse(e2, d(c)) : null;
      }
      function p(e2) {
        return e2 ? i.parse(e2, d(function(e3) {
          return N(e3).trim();
        })) : null;
      }
      var f = function(e2) {
        return e2 ? n.create(e2, function(e3) {
          return null !== e3 && (e3 = x(e3)), e3;
        }).parse() : null;
      }, m = function(e2) {
        return e2 ? n.create(e2, function(e3) {
          return null !== e3 && (e3 = parseFloat(e3)), e3;
        }).parse() : null;
      }, y = function(e2) {
        return e2 ? n.create(e2).parse() : null;
      }, g = function(e2) {
        return e2 ? n.create(e2, function(e3) {
          return null !== e3 && (e3 = s(e3)), e3;
        }).parse() : null;
      }, w = function(e2) {
        return e2 ? n.create(e2, function(e3) {
          return null !== e3 && (e3 = o(e3)), e3;
        }).parse() : null;
      }, v = function(e2) {
        return e2 ? i.parse(e2, d(a)) : null;
      }, b = function(e2) {
        return parseInt(e2, 10);
      }, N = function(e2) {
        var t2 = String(e2);
        return /^\d+$/.test(t2) ? t2 : e2;
      }, _ = function(e2) {
        return e2 ? i.parse(e2, d(JSON.parse)) : null;
      }, x = function(e2) {
        return "(" !== e2[0] ? null : { x: parseFloat((e2 = e2.substring(1, e2.length - 1).split(","))[0]), y: parseFloat(e2[1]) };
      }, S = function(e2) {
        if ("<" !== e2[0] && "(" !== e2[1]) return null;
        for (var t2 = "(", r2 = "", i2 = false, n2 = 2; n2 < e2.length - 1; n2++) {
          if (i2 || (t2 += e2[n2]), ")" === e2[n2]) {
            i2 = true;
            continue;
          }
          i2 && "," !== e2[n2] && (r2 += e2[n2]);
        }
        var s2 = x(t2);
        return s2.radius = parseFloat(r2), s2;
      };
      e.exports = { init: function(e2) {
        e2(20, N), e2(21, b), e2(23, b), e2(26, b), e2(700, parseFloat), e2(701, parseFloat), e2(16, l), e2(1082, s), e2(1114, s), e2(1184, s), e2(600, x), e2(651, y), e2(718, S), e2(1e3, u), e2(1001, v), e2(1005, h), e2(1007, h), e2(1028, h), e2(1016, p), e2(1017, f), e2(1021, m), e2(1022, m), e2(1231, m), e2(1014, y), e2(1015, y), e2(1008, y), e2(1009, y), e2(1040, y), e2(1041, y), e2(1115, g), e2(1182, g), e2(1185, g), e2(1186, o), e2(1187, w), e2(17, a), e2(114, JSON.parse.bind(JSON)), e2(3802, JSON.parse.bind(JSON)), e2(199, _), e2(3807, _), e2(3907, y), e2(2951, y), e2(791, y), e2(1183, y), e2(1270, y);
      } };
    }, 1880: (e, t, r) => {
      let i = r(5846).EventEmitter, n = r(6480), s = r(2476), o = r(7177), a = r(494), d = r(2983), l = r(7254), u = r(9126), c = r(4009), h = r(2804), p = s.deprecate(() => {
      }, "Client.activeQuery is deprecated and will be removed in pg@9.0"), f = s.deprecate(() => {
      }, "Client.queryQueue is deprecated and will be removed in pg@9.0."), m = s.deprecate(() => {
      }, "pgpass support is deprecated and will be removed in pg@9.0. You can provide an async function as the password property to the Client/Pool constructor that returns a password instead. Within this function you can call the pgpass module in your own code."), y = s.deprecate(() => {
      }, "Passing a custom Promise implementation to the Client/Pool constructor is deprecated and will be removed in pg@9.0."), g = s.deprecate(() => {
      }, "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead.");
      class w extends i {
        constructor(e2) {
          super(), this.connectionParameters = new d(e2), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
          let t2 = e2 || {};
          t2.Promise && y(), this._Promise = t2.Promise || r.g.Promise, this._types = new a(t2.types), this._ending = false, this._ended = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this._activeQuery = null, this.enableChannelBinding = !!t2.enableChannelBinding, this.connection = t2.connection || new c({ stream: t2.stream, ssl: this.connectionParameters.ssl, keepAlive: t2.keepAlive || false, keepAliveInitialDelayMillis: t2.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this._queryQueue = [], this.binary = t2.binary || u.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t2.connectionTimeoutMillis || 0;
        }
        get activeQuery() {
          return p(), this._activeQuery;
        }
        set activeQuery(e2) {
          p(), this._activeQuery = e2;
        }
        _getActiveQuery() {
          return this._activeQuery;
        }
        _errorAllQueries(e2) {
          let t2 = (t3) => {
            process.nextTick(() => {
              t3.handleError(e2, this.connection);
            });
          }, r2 = this._getActiveQuery();
          r2 && (t2(r2), this._activeQuery = null), this._queryQueue.forEach(t2), this._queryQueue.length = 0;
        }
        _connect(e2) {
          let t2 = this, r2 = this.connection;
          if (this._connectionCallback = e2, this._connecting || this._connected) {
            let t3 = Error("Client has already been connected. You cannot reuse a client.");
            process.nextTick(() => {
              e2(t3);
            });
            return;
          }
          this._connecting = true, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
            r2._ending = true, r2.stream.destroy(Error("timeout expired"));
          }, this._connectionTimeoutMillis), this.connectionTimeoutHandle.unref && this.connectionTimeoutHandle.unref()), this.host && 0 === this.host.indexOf("/") ? r2.connect(this.host + "/.s.PGSQL." + this.port) : r2.connect(this.port, this.host), r2.on("connect", function() {
            t2.ssl ? r2.requestSsl() : r2.startup(t2.getStartupConf());
          }), r2.on("sslconnect", function() {
            r2.startup(t2.getStartupConf());
          }), this._attachListeners(r2), r2.once("end", () => {
            let e3 = this._ending ? Error("Connection terminated") : Error("Connection terminated unexpectedly");
            clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(e3), this._ended = true, this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(e3) : this._handleErrorEvent(e3) : this._connectionError || this._handleErrorEvent(e3)), process.nextTick(() => {
              this.emit("end");
            });
          });
        }
        connect(e2) {
          if (e2) {
            this._connect(e2);
            return;
          }
          return new this._Promise((e3, t2) => {
            this._connect((r2) => {
              r2 ? t2(r2) : e3(this);
            });
          });
        }
        _attachListeners(e2) {
          e2.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e2.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e2.on("authenticationSASL", this._handleAuthSASL.bind(this)), e2.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e2.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e2.on("backendKeyData", this._handleBackendKeyData.bind(this)), e2.on("error", this._handleErrorEvent.bind(this)), e2.on("errorMessage", this._handleErrorMessage.bind(this)), e2.on("readyForQuery", this._handleReadyForQuery.bind(this)), e2.on("notice", this._handleNotice.bind(this)), e2.on("rowDescription", this._handleRowDescription.bind(this)), e2.on("dataRow", this._handleDataRow.bind(this)), e2.on("portalSuspended", this._handlePortalSuspended.bind(this)), e2.on("emptyQuery", this._handleEmptyQuery.bind(this)), e2.on("commandComplete", this._handleCommandComplete.bind(this)), e2.on("parseComplete", this._handleParseComplete.bind(this)), e2.on("copyInResponse", this._handleCopyInResponse.bind(this)), e2.on("copyData", this._handleCopyData.bind(this)), e2.on("notification", this._handleNotification.bind(this));
        }
        _getPassword(e2) {
          let t2 = this.connection;
          if ("function" == typeof this.password) this._Promise.resolve().then(() => this.password(this.connectionParameters)).then((r2) => {
            if (void 0 !== r2) {
              if ("string" != typeof r2) {
                t2.emit("error", TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = r2;
            } else this.connectionParameters.password = this.password = null;
            e2();
          }).catch((e3) => {
            t2.emit("error", e3);
          });
          else if (null !== this.password) e2();
          else try {
            r(5895)(this.connectionParameters, (t3) => {
              void 0 !== t3 && (m(), this.connectionParameters.password = this.password = t3), e2();
            });
          } catch (e3) {
            this.emit("error", e3);
          }
        }
        _handleAuthCleartextPassword(e2) {
          this._getPassword(() => {
            this.connection.password(this.password);
          });
        }
        _handleAuthMD5Password(e2) {
          this._getPassword(async () => {
            try {
              let t2 = await h.postgresMd5PasswordHash(this.user, this.password, e2.salt);
              this.connection.password(t2);
            } catch (e3) {
              this.emit("error", e3);
            }
          });
        }
        _handleAuthSASL(e2) {
          this._getPassword(() => {
            try {
              this.saslSession = o.startSession(e2.mechanisms, this.enableChannelBinding && this.connection.stream), this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
            } catch (e3) {
              this.connection.emit("error", e3);
            }
          });
        }
        async _handleAuthSASLContinue(e2) {
          try {
            await o.continueSession(this.saslSession, this.password, e2.data, this.enableChannelBinding && this.connection.stream), this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
          } catch (e3) {
            this.connection.emit("error", e3);
          }
        }
        _handleAuthSASLFinal(e2) {
          try {
            o.finalizeSession(this.saslSession, e2.data), this.saslSession = null;
          } catch (e3) {
            this.connection.emit("error", e3);
          }
        }
        _handleBackendKeyData(e2) {
          this.processID = e2.processID, this.secretKey = e2.secretKey;
        }
        _handleReadyForQuery(e2) {
          this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
          let t2 = this._getActiveQuery();
          this._activeQuery = null, this.readyForQuery = true, t2 && t2.handleReadyForQuery(this.connection), this._pulseQueryQueue();
        }
        _handleErrorWhileConnecting(e2) {
          if (!this._connectionError) {
            if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback) return this._connectionCallback(e2);
            this.emit("error", e2);
          }
        }
        _handleErrorEvent(e2) {
          if (this._connecting) return this._handleErrorWhileConnecting(e2);
          this._queryable = false, this._errorAllQueries(e2), this.emit("error", e2);
        }
        _handleErrorMessage(e2) {
          if (this._connecting) return this._handleErrorWhileConnecting(e2);
          let t2 = this._getActiveQuery();
          if (!t2) {
            this._handleErrorEvent(e2);
            return;
          }
          this._activeQuery = null, t2.handleError(e2, this.connection);
        }
        _handleRowDescription(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected rowDescription message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleRowDescription(e2);
        }
        _handleDataRow(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected dataRow message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleDataRow(e2);
        }
        _handlePortalSuspended(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected portalSuspended message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handlePortalSuspended(this.connection);
        }
        _handleEmptyQuery(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected emptyQuery message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleEmptyQuery(this.connection);
        }
        _handleCommandComplete(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected commandComplete message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleCommandComplete(e2, this.connection);
        }
        _handleParseComplete() {
          let e2 = this._getActiveQuery();
          if (null == e2) {
            let e3 = Error("Received unexpected parseComplete message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          e2.name && (this.connection.parsedStatements[e2.name] = e2.text);
        }
        _handleCopyInResponse(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected copyInResponse message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleCopyInResponse(this.connection);
        }
        _handleCopyData(e2) {
          let t2 = this._getActiveQuery();
          if (null == t2) {
            let e3 = Error("Received unexpected copyData message from backend.");
            this._handleErrorEvent(e3);
            return;
          }
          t2.handleCopyData(e2, this.connection);
        }
        _handleNotification(e2) {
          this.emit("notification", e2);
        }
        _handleNotice(e2) {
          this.emit("notice", e2);
        }
        getStartupConf() {
          let e2 = this.connectionParameters, t2 = { user: e2.user, database: e2.database }, r2 = e2.application_name || e2.fallback_application_name;
          return r2 && (t2.application_name = r2), e2.replication && (t2.replication = "" + e2.replication), e2.statement_timeout && (t2.statement_timeout = String(parseInt(e2.statement_timeout, 10))), e2.lock_timeout && (t2.lock_timeout = String(parseInt(e2.lock_timeout, 10))), e2.idle_in_transaction_session_timeout && (t2.idle_in_transaction_session_timeout = String(parseInt(e2.idle_in_transaction_session_timeout, 10))), e2.options && (t2.options = e2.options), t2;
        }
        cancel(e2, t2) {
          if (e2.activeQuery === t2) {
            let t3 = this.connection;
            this.host && 0 === this.host.indexOf("/") ? t3.connect(this.host + "/.s.PGSQL." + this.port) : t3.connect(this.port, this.host), t3.on("connect", function() {
              t3.cancel(e2.processID, e2.secretKey);
            });
          } else -1 !== e2._queryQueue.indexOf(t2) && e2._queryQueue.splice(e2._queryQueue.indexOf(t2), 1);
        }
        setTypeParser(e2, t2, r2) {
          return this._types.setTypeParser(e2, t2, r2);
        }
        getTypeParser(e2, t2) {
          return this._types.getTypeParser(e2, t2);
        }
        escapeIdentifier(e2) {
          return n.escapeIdentifier(e2);
        }
        escapeLiteral(e2) {
          return n.escapeLiteral(e2);
        }
        _pulseQueryQueue() {
          if (true === this.readyForQuery) {
            this._activeQuery = this._queryQueue.shift();
            let e2 = this._getActiveQuery();
            if (e2) {
              this.readyForQuery = false, this.hasExecuted = true;
              let t2 = e2.submit(this.connection);
              t2 && process.nextTick(() => {
                e2.handleError(t2, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
              });
            } else this.hasExecuted && (this._activeQuery = null, this.emit("drain"));
          }
        }
        query(e2, t2, r2) {
          let i2, n2, s2, o2, a2;
          if (null == e2) throw TypeError("Client was passed a null or undefined query");
          return ("function" == typeof e2.submit ? (s2 = e2.query_timeout || this.connectionParameters.query_timeout, n2 = i2 = e2, !i2.callback && ("function" == typeof t2 ? i2.callback = t2 : r2 && (i2.callback = r2))) : (s2 = e2.query_timeout || this.connectionParameters.query_timeout, (i2 = new l(e2, t2, r2)).callback || (n2 = new this._Promise((e3, t3) => {
            i2.callback = (r3, i3) => r3 ? t3(r3) : e3(i3);
          }).catch((e3) => {
            throw Error.captureStackTrace(e3), e3;
          }))), s2 && (a2 = i2.callback || (() => {
          }), o2 = setTimeout(() => {
            let e3 = Error("Query read timeout");
            process.nextTick(() => {
              i2.handleError(e3, this.connection);
            }), a2(e3), i2.callback = () => {
            };
            let t3 = this._queryQueue.indexOf(i2);
            t3 > -1 && this._queryQueue.splice(t3, 1), this._pulseQueryQueue();
          }, s2), i2.callback = (e3, t3) => {
            clearTimeout(o2), a2(e3, t3);
          }), this.binary && !i2.binary && (i2.binary = true), i2._result && !i2._result._types && (i2._result._types = this._types), this._queryable) ? this._ending ? process.nextTick(() => {
            i2.handleError(Error("Client was closed and is not queryable"), this.connection);
          }) : (this._queryQueue.length > 0 && g(), this._queryQueue.push(i2), this._pulseQueryQueue()) : process.nextTick(() => {
            i2.handleError(Error("Client has encountered a connection error and is not queryable"), this.connection);
          }), n2;
        }
        ref() {
          this.connection.ref();
        }
        unref() {
          this.connection.unref();
        }
        end(e2) {
          if (this._ending = true, !this.connection._connecting || this._ended) {
            if (!e2) return this._Promise.resolve();
            e2();
          }
          if (this._getActiveQuery() || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), !e2) return new this._Promise((e3) => {
            this.connection.once("end", e3);
          });
          this.connection.once("end", e2);
        }
        get queryQueue() {
          return f(), this._queryQueue;
        }
      }
      w.Query = l, e.exports = w;
    }, 2983: (e, t, r) => {
      "use strict";
      let i = r(8254), n = r(9126), s = r(2663).parse, o = function(e2, t2, r2) {
        return t2[e2] ? t2[e2] : (void 0 === r2 ? r2 = process.env["PG" + e2.toUpperCase()] : false === r2 || (r2 = process.env[r2]), r2 || n[e2]);
      }, a = function() {
        switch (process.env.PGSSLMODE) {
          case "disable":
            return false;
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            return true;
          case "no-verify":
            return { rejectUnauthorized: false };
        }
        return n.ssl;
      }, d = function(e2) {
        return "'" + ("" + e2).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
      }, l = function(e2, t2, r2) {
        let i2 = t2[r2];
        null != i2 && e2.push(r2 + "=" + d(i2));
      };
      class u {
        constructor(e2) {
          (e2 = "string" == typeof e2 ? s(e2) : e2 || {}).connectionString && (e2 = Object.assign({}, e2, s(e2.connectionString))), this.user = o("user", e2), this.database = o("database", e2), void 0 === this.database && (this.database = this.user), this.port = parseInt(o("port", e2), 10), this.host = o("host", e2), Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: o("password", e2) }), this.binary = o("binary", e2), this.options = o("options", e2), this.ssl = void 0 === e2.ssl ? a() : e2.ssl, "string" == typeof this.ssl && "true" === this.ssl && (this.ssl = true), "no-verify" === this.ssl && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = o("client_encoding", e2), this.replication = o("replication", e2), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = o("application_name", e2, "PGAPPNAME"), this.fallback_application_name = o("fallback_application_name", e2, false), this.statement_timeout = o("statement_timeout", e2, false), this.lock_timeout = o("lock_timeout", e2, false), this.idle_in_transaction_session_timeout = o("idle_in_transaction_session_timeout", e2, false), this.query_timeout = o("query_timeout", e2, false), void 0 === e2.connectionTimeoutMillis ? this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e2.connectionTimeoutMillis / 1e3), false === e2.keepAlive ? this.keepalives = 0 : true === e2.keepAlive && (this.keepalives = 1), "number" == typeof e2.keepAliveInitialDelayMillis && (this.keepalives_idle = Math.floor(e2.keepAliveInitialDelayMillis / 1e3));
        }
        getLibpqConnectionString(e2) {
          let t2 = [];
          l(t2, this, "user"), l(t2, this, "password"), l(t2, this, "port"), l(t2, this, "application_name"), l(t2, this, "fallback_application_name"), l(t2, this, "connect_timeout"), l(t2, this, "options");
          let r2 = "object" == typeof this.ssl ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
          if (l(t2, r2, "sslmode"), l(t2, r2, "sslca"), l(t2, r2, "sslkey"), l(t2, r2, "sslcert"), l(t2, r2, "sslrootcert"), this.database && t2.push("dbname=" + d(this.database)), this.replication && t2.push("replication=" + d(this.replication)), this.host && t2.push("host=" + d(this.host)), this.isDomainSocket) return e2(null, t2.join(" "));
          this.client_encoding && t2.push("client_encoding=" + d(this.client_encoding)), i.lookup(this.host, function(r3, i2) {
            return r3 ? e2(r3, null) : (t2.push("hostaddr=" + d(i2)), e2(null, t2.join(" ")));
          });
        }
      }
      e.exports = u;
    }, 4009: (e, t, r) => {
      "use strict";
      let i = r(5846).EventEmitter, { parse: n, serialize: s } = r(6106), { getStream: o, getSecureStream: a } = r(412), d = s.flush(), l = s.sync(), u = s.end();
      class c extends i {
        constructor(e2) {
          super(), e2 = e2 || {}, this.stream = e2.stream || o(e2.ssl), "function" == typeof this.stream && (this.stream = this.stream(e2)), this._keepAlive = e2.keepAlive, this._keepAliveInitialDelayMillis = e2.keepAliveInitialDelayMillis, this.parsedStatements = {}, this.ssl = e2.ssl || false, this._ending = false, this._emitMessage = false;
          let t2 = this;
          this.on("newListener", function(e3) {
            "message" === e3 && (t2._emitMessage = true);
          });
        }
        connect(e2, t2) {
          let i2 = this;
          this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(e2, t2), this.stream.once("connect", function() {
            i2._keepAlive && i2.stream.setKeepAlive(true, i2._keepAliveInitialDelayMillis), i2.emit("connect");
          });
          let n2 = function(e3) {
            i2._ending && ("ECONNRESET" === e3.code || "EPIPE" === e3.code) || i2.emit("error", e3);
          };
          if (this.stream.on("error", n2), this.stream.on("close", function() {
            i2.emit("end");
          }), !this.ssl) return this.attachListeners(this.stream);
          this.stream.once("data", function(e3) {
            switch (e3.toString("utf8")) {
              case "S":
                break;
              case "N":
                return i2.stream.end(), i2.emit("error", Error("The server does not support SSL connections"));
              default:
                return i2.stream.end(), i2.emit("error", Error("There was an error establishing an SSL connection"));
            }
            let s2 = { socket: i2.stream };
            true !== i2.ssl && (Object.assign(s2, i2.ssl), "key" in i2.ssl && (s2.key = i2.ssl.key));
            let o2 = r(7493);
            o2.isIP && 0 === o2.isIP(t2) && (s2.servername = t2);
            try {
              i2.stream = a(s2);
            } catch (e4) {
              return i2.emit("error", e4);
            }
            i2.attachListeners(i2.stream), i2.stream.on("error", n2), i2.emit("sslconnect");
          });
        }
        attachListeners(e2) {
          n(e2, (e3) => {
            let t2 = "error" === e3.name ? "errorMessage" : e3.name;
            this._emitMessage && this.emit("message", e3), this.emit(t2, e3);
          });
        }
        requestSsl() {
          this.stream.write(s.requestSsl());
        }
        startup(e2) {
          this.stream.write(s.startup(e2));
        }
        cancel(e2, t2) {
          this._send(s.cancel(e2, t2));
        }
        password(e2) {
          this._send(s.password(e2));
        }
        sendSASLInitialResponseMessage(e2, t2) {
          this._send(s.sendSASLInitialResponseMessage(e2, t2));
        }
        sendSCRAMClientFinalMessage(e2) {
          this._send(s.sendSCRAMClientFinalMessage(e2));
        }
        _send(e2) {
          return !!this.stream.writable && this.stream.write(e2);
        }
        query(e2) {
          this._send(s.query(e2));
        }
        parse(e2) {
          this._send(s.parse(e2));
        }
        bind(e2) {
          this._send(s.bind(e2));
        }
        execute(e2) {
          this._send(s.execute(e2));
        }
        flush() {
          this.stream.writable && this.stream.write(d);
        }
        sync() {
          this._ending = true, this._send(l);
        }
        ref() {
          this.stream.ref();
        }
        unref() {
          this.stream.unref();
        }
        end() {
          if (this._ending = true, !this._connecting || !this.stream.writable) {
            this.stream.end();
            return;
          }
          return this.stream.write(u, () => {
            this.stream.end();
          });
        }
        close(e2) {
          this._send(s.close(e2));
        }
        describe(e2) {
          this._send(s.describe(e2));
        }
        sendCopyFromChunk(e2) {
          this._send(s.copyData(e2));
        }
        endCopyFrom() {
          this._send(s.copyDone());
        }
        sendCopyFail(e2) {
          this._send(s.copyFail(e2));
        }
      }
      e.exports = c;
    }, 2629: (e) => {
      function t(e2, t2) {
        return Error("SASL channel binding: " + e2 + " when parsing public certificate " + t2.toString("base64"));
      }
      function r(e2, r2) {
        let i2 = e2[r2++];
        if (i2 < 128) return { length: i2, index: r2 };
        let n2 = 127 & i2;
        if (n2 > 4) throw t("bad length", e2);
        i2 = 0;
        for (let t2 = 0; t2 < n2; t2++) i2 = i2 << 8 | e2[r2++];
        return { length: i2, index: r2 };
      }
      function i(e2, i2) {
        if (6 !== e2[i2++]) throw t("non-OID data", e2);
        let { length: n2, index: s } = r(e2, i2), o = (i2 = s) + n2, a = e2[i2++], d = (a / 40 >> 0) + "." + a % 40;
        for (; i2 < o; ) {
          let t2 = 0;
          for (; i2 < o; ) {
            let r2 = e2[i2++];
            if (t2 = t2 << 7 | 127 & r2, r2 < 128) break;
          }
          d += "." + t2;
        }
        return { oid: d, index: i2 };
      }
      function n(e2, i2) {
        if (48 !== e2[i2++]) throw t("non-sequence data", e2);
        return r(e2, i2);
      }
      e.exports = { signatureAlgorithmHashFromCertificate: function(e2, s) {
        void 0 === s && (s = 0), s = n(e2, s).index;
        let { length: o, index: a } = n(e2, s);
        s = n(e2, s = a + o).index;
        let { oid: d, index: l } = i(e2, s);
        switch (d) {
          case "1.2.840.113549.1.1.4":
            return "MD5";
          case "1.2.840.113549.1.1.5":
          case "1.2.840.10045.4.1":
            return "SHA-1";
          case "1.2.840.113549.1.1.11":
          case "1.2.840.10045.4.3.2":
            return "SHA-256";
          case "1.2.840.113549.1.1.12":
          case "1.2.840.10045.4.3.3":
            return "SHA-384";
          case "1.2.840.113549.1.1.13":
          case "1.2.840.10045.4.3.4":
          case "1.3.101.110":
          case "1.3.101.112":
            return "SHA-512";
          case "1.2.840.113549.1.1.14":
          case "1.2.840.10045.4.3.1":
            return "SHA-224";
          case "1.2.840.113549.1.1.15":
            return "SHA512-224";
          case "1.2.840.113549.1.1.16":
            return "SHA512-256";
          case "1.2.840.113549.1.1.10": {
            if (s = n(e2, s = l).index, 160 !== e2[s++]) throw t("non-tag data", e2);
            s = r(e2, s).index, s = n(e2, s).index;
            let { oid: o2 } = i(e2, s);
            switch (o2) {
              case "1.2.840.113549.2.5":
                return "MD5";
              case "1.3.14.3.2.26":
                return "SHA-1";
              case "2.16.840.1.101.3.4.2.1":
                return "SHA-256";
              case "2.16.840.1.101.3.4.2.2":
                return "SHA-384";
              case "2.16.840.1.101.3.4.2.3":
                return "SHA-512";
            }
            throw t("unknown hash OID " + o2, e2);
          }
          case "1.3.101.111":
          case "1.3.101.113":
            throw t("Ed448 certificate channel binding is not currently supported by Postgres");
        }
        throw t("unknown OID " + d, e2);
      } };
    }, 7177: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      let n = r(2804), { signatureAlgorithmHashFromCertificate: s } = r(2629);
      async function o(e2, t2, r2, o2) {
        if ("SASLInitialResponse" !== e2.message) throw Error("SASL: Last message was not SASLInitialResponse");
        if ("string" != typeof t2) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
        if ("" === t2) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
        if ("string" != typeof r2) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
        let l = function(e3) {
          let t3 = d(e3), r3 = t3.get("r");
          if (r3) {
            if (!function(e4) {
              if ("string" != typeof e4) throw TypeError("SASL: text must be a string");
              return e4.split("").map((t4, r4) => e4.charCodeAt(r4)).every((e5) => e5 >= 33 && e5 <= 43 || e5 >= 45 && e5 <= 126);
            }(r3)) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
          } else throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
          let i2 = t3.get("s");
          if (i2) {
            if (!a(i2)) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
          } else throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
          let n2 = t3.get("i");
          if (n2) {
            if (!/^[1-9][0-9]*$/.test(n2)) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
          } else throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
          return { nonce: r3, salt: i2, iteration: parseInt(n2, 10) };
        }(r2);
        if (l.nonce.startsWith(e2.clientNonce)) {
          if (l.nonce.length === e2.clientNonce.length) throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
        } else throw Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
        let u = "n=*,r=" + e2.clientNonce, c = "r=" + l.nonce + ",s=" + l.salt + ",i=" + l.iteration, h = o2 ? "eSws" : "biws";
        if ("SCRAM-SHA-256-PLUS" === e2.mechanism) {
          let e3 = o2.getPeerCertificate().raw, t3 = s(e3);
          ("MD5" === t3 || "SHA-1" === t3) && (t3 = "SHA-256");
          let r3 = await n.hashByName(t3, e3);
          h = i.concat([i.from("p=tls-server-end-point,,"), i.from(r3)]).toString("base64");
        }
        let p = "c=" + h + ",r=" + l.nonce, f = u + "," + c + "," + p, m = i.from(l.salt, "base64"), y = await n.deriveKey(t2, m, l.iteration), g = await n.hmacSha256(y, "Client Key"), w = await n.sha256(g), v = await n.hmacSha256(w, f), b = function(e3, t3) {
          if (!i.isBuffer(e3)) throw TypeError("first argument must be a Buffer");
          if (!i.isBuffer(t3)) throw TypeError("second argument must be a Buffer");
          if (e3.length !== t3.length) throw Error("Buffer lengths must match");
          if (0 === e3.length) throw Error("Buffers cannot be empty");
          return i.from(e3.map((r3, i2) => e3[i2] ^ t3[i2]));
        }(i.from(g), i.from(v)).toString("base64"), N = await n.hmacSha256(y, "Server Key"), _ = await n.hmacSha256(N, f);
        e2.message = "SASLResponse", e2.serverSignature = i.from(_).toString("base64"), e2.response = p + ",p=" + b;
      }
      function a(e2) {
        return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(e2);
      }
      function d(e2) {
        if ("string" != typeof e2) throw TypeError("SASL: attribute pairs text must be a string");
        return new Map(e2.split(",").map((e3) => {
          if (!/^.=/.test(e3)) throw Error("SASL: Invalid attribute pair entry");
          return [e3[0], e3.substring(2)];
        }));
      }
      e.exports = { startSession: function(e2, t2) {
        let r2 = ["SCRAM-SHA-256"];
        t2 && r2.unshift("SCRAM-SHA-256-PLUS");
        let i2 = r2.find((t3) => e2.includes(t3));
        if (!i2) throw Error("SASL: Only mechanism(s) " + r2.join(" and ") + " are supported");
        if ("SCRAM-SHA-256-PLUS" === i2 && "function" != typeof t2.getPeerCertificate) throw Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
        let s2 = n.randomBytes(18).toString("base64");
        return { mechanism: i2, clientNonce: s2, response: ("SCRAM-SHA-256-PLUS" === i2 ? "p=tls-server-end-point" : t2 ? "y" : "n") + ",,n=*,r=" + s2, message: "SASLInitialResponse" };
      }, continueSession: o, finalizeSession: function(e2, t2) {
        if ("SASLResponse" !== e2.message) throw Error("SASL: Last message was not SASLResponse");
        if ("string" != typeof t2) throw Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
        let { serverSignature: r2 } = function(e3) {
          let t3 = d(e3).get("v");
          if (t3) {
            if (!a(t3)) throw Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
          } else throw Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
          return { serverSignature: t3 };
        }(t2);
        if (r2 !== e2.serverSignature) throw Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      } };
    }, 4085: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      let n = r(2440);
      function s(e2) {
        return n.createHash("md5").update(e2, "utf-8").digest("hex");
      }
      async function o(e2, t2, r2) {
        return n.pbkdf2Sync(e2, t2, r2, 32, "sha256");
      }
      e.exports = { postgresMd5PasswordHash: function(e2, t2, r2) {
        let n2 = s(t2 + e2);
        return "md5" + s(i.concat([i.from(n2), r2]));
      }, randomBytes: n.randomBytes, deriveKey: o, sha256: function(e2) {
        return n.createHash("sha256").update(e2).digest();
      }, hashByName: function(e2, t2) {
        return e2 = e2.replace(/(\D)-/, "$1"), n.createHash(e2).update(t2).digest();
      }, hmacSha256: function(e2, t2) {
        return n.createHmac("sha256", e2).update(t2).digest();
      }, md5: s };
    }, 7473: (e, t, r) => {
      var i = r(6195).Buffer;
      let n = r(2440);
      e.exports = { postgresMd5PasswordHash: l, randomBytes: function(e2) {
        return s.getRandomValues(i.alloc(e2));
      }, deriveKey: p, sha256: u, hashByName: c, hmacSha256: h, md5: d };
      let s = n.webcrypto || globalThis.crypto, o = s.subtle, a = new TextEncoder();
      async function d(e2) {
        try {
          return n.createHash("md5").update(e2, "utf-8").digest("hex");
        } catch (r2) {
          let t2 = "string" == typeof e2 ? a.encode(e2) : e2;
          return Array.from(new Uint8Array(await o.digest("MD5", t2))).map((e3) => e3.toString(16).padStart(2, "0")).join("");
        }
      }
      async function l(e2, t2, r2) {
        let n2 = await d(t2 + e2);
        return "md5" + await d(i.concat([i.from(n2), r2]));
      }
      async function u(e2) {
        return await o.digest("SHA-256", e2);
      }
      async function c(e2, t2) {
        return await o.digest(e2, t2);
      }
      async function h(e2, t2) {
        let r2 = await o.importKey("raw", e2, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
        return await o.sign("HMAC", r2, a.encode(t2));
      }
      async function p(e2, t2, r2) {
        let i2 = await o.importKey("raw", a.encode(e2), "PBKDF2", false, ["deriveBits"]);
        return await o.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: t2, iterations: r2 }, i2, 256, ["deriveBits"]);
      }
    }, 2804: (e, t, r) => {
      "use strict";
      15 > parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) ? e.exports = r(4085) : e.exports = r(7473);
    }, 9126: (e, t, r) => {
      "use strict";
      let i;
      try {
        i = "win32" === process.platform ? process.env.USERNAME : process.env.USER;
      } catch {
      }
      e.exports = { host: "localhost", user: i, database: void 0, password: null, connectionString: void 0, port: 5432, rows: 0, binary: false, max: 10, idleTimeoutMillis: 3e4, client_encoding: "", ssl: false, application_name: void 0, fallback_application_name: void 0, options: void 0, parseInputDatesAsUTC: false, statement_timeout: false, lock_timeout: false, idle_in_transaction_session_timeout: false, query_timeout: false, connect_timeout: 0, keepalives: 1, keepalives_idle: 0 };
      let n = r(7498), s = n.getTypeParser(20, "text"), o = n.getTypeParser(1016, "text");
      e.exports.__defineSetter__("parseInt8", function(e2) {
        n.setTypeParser(20, "text", e2 ? n.getTypeParser(23, "text") : s), n.setTypeParser(1016, "text", e2 ? n.getTypeParser(1007, "text") : o);
      });
    }, 6679: (e, t, r) => {
      "use strict";
      let i = r(1880), n = r(9126), s = r(4009), o = r(7418), a = r(6480), d = r(6781), l = r(494), { DatabaseError: u } = r(6106), { escapeIdentifier: c, escapeLiteral: h } = r(6480), p = (e2) => class extends d {
        constructor(t2) {
          super(t2, e2);
        }
      }, f = function(e2) {
        this.defaults = n, this.Client = e2, this.Query = this.Client.Query, this.Pool = p(this.Client), this._pools = [], this.Connection = s, this.types = r(7498), this.DatabaseError = u, this.TypeOverrides = l, this.escapeIdentifier = c, this.escapeLiteral = h, this.Result = o, this.utils = a;
      }, m = i, y = false;
      try {
        y = !!process.env.NODE_PG_FORCE_NATIVE;
      } catch {
      }
      y && (m = r(3959)), e.exports = new f(m), Object.defineProperty(e.exports, "native", { configurable: true, enumerable: false, get() {
        let t2 = null;
        try {
          t2 = new f(r(3959));
        } catch (e2) {
          if ("MODULE_NOT_FOUND" !== e2.code) throw e2;
        }
        return Object.defineProperty(e.exports, "native", { value: t2 }), t2;
      } });
    }, 6770: (e, t, r) => {
      var i;
      let n = r(2476);
      try {
        i = r(Object(function() {
          var e2 = Error("Cannot find module 'pg-native'");
          throw e2.code = "MODULE_NOT_FOUND", e2;
        }()));
      } catch (e2) {
        throw e2;
      }
      let s = r(494), o = r(5846).EventEmitter, a = r(2476), d = r(2983), l = r(10), u = n.deprecate(() => {
      }, "Calling client.query() when the client is already executing a query is deprecated and will be removed in pg@9.0. Use async/await or an external async flow control mechanism instead."), c = e.exports = function(e2) {
        o.call(this), e2 = e2 || {}, this._Promise = e2.Promise || r.g.Promise, this._types = new s(e2.types), this.native = new i({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
        let t2 = this.connectionParameters = new d(e2);
        e2.nativeConnectionString && (t2.nativeConnectionString = e2.nativeConnectionString), this.user = t2.user, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: t2.password }), this.database = t2.database, this.host = t2.host, this.port = t2.port, this.namedQueries = {};
      };
      c.Query = l, a.inherits(c, o), c.prototype._errorAllQueries = function(e2) {
        let t2 = (t3) => {
          process.nextTick(() => {
            t3.native = this.native, t3.handleError(e2);
          });
        };
        this._hasActiveQuery() && (t2(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(t2), this._queryQueue.length = 0;
      }, c.prototype._connect = function(e2) {
        let t2 = this;
        if (this._connecting) {
          process.nextTick(() => e2(Error("Client has already been connected. You cannot reuse a client.")));
          return;
        }
        this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(r2, i2) {
          if (t2.connectionParameters.nativeConnectionString && (i2 = t2.connectionParameters.nativeConnectionString), r2) return e2(r2);
          t2.native.connect(i2, function(r3) {
            if (r3) return t2.native.end(), e2(r3);
            t2._connected = true, t2.native.on("error", function(e3) {
              t2._queryable = false, t2._errorAllQueries(e3), t2.emit("error", e3);
            }), t2.native.on("notification", function(e3) {
              t2.emit("notification", { channel: e3.relname, payload: e3.extra });
            }), t2.emit("connect"), t2._pulseQueryQueue(true), e2(null, this);
          });
        });
      }, c.prototype.connect = function(e2) {
        if (e2) {
          this._connect(e2);
          return;
        }
        return new this._Promise((e3, t2) => {
          this._connect((r2) => {
            r2 ? t2(r2) : e3(this);
          });
        });
      }, c.prototype.query = function(e2, t2, r2) {
        let i2, n2, s2, o2, a2;
        if (null == e2) throw TypeError("Client was passed a null or undefined query");
        if ("function" == typeof e2.submit) s2 = e2.query_timeout || this.connectionParameters.query_timeout, n2 = i2 = e2, "function" == typeof t2 && (e2.callback = t2);
        else if (s2 = e2.query_timeout || this.connectionParameters.query_timeout, !(i2 = new l(e2, t2, r2)).callback) {
          let e3, t3;
          n2 = new this._Promise((r3, i3) => {
            e3 = r3, t3 = i3;
          }).catch((e4) => {
            throw Error.captureStackTrace(e4), e4;
          }), i2.callback = (r3, i3) => r3 ? t3(r3) : e3(i3);
        }
        return (s2 && (a2 = i2.callback || (() => {
        }), o2 = setTimeout(() => {
          let e3 = Error("Query read timeout");
          process.nextTick(() => {
            i2.handleError(e3, this.connection);
          }), a2(e3), i2.callback = () => {
          };
          let t3 = this._queryQueue.indexOf(i2);
          t3 > -1 && this._queryQueue.splice(t3, 1), this._pulseQueryQueue();
        }, s2), i2.callback = (e3, t3) => {
          clearTimeout(o2), a2(e3, t3);
        }), this._queryable) ? this._ending ? (i2.native = this.native, process.nextTick(() => {
          i2.handleError(Error("Client was closed and is not queryable"));
        })) : (this._queryQueue.length > 0 && u(), this._queryQueue.push(i2), this._pulseQueryQueue()) : (i2.native = this.native, process.nextTick(() => {
          i2.handleError(Error("Client has encountered a connection error and is not queryable"));
        })), n2;
      }, c.prototype.end = function(e2) {
        let t2;
        let r2 = this;
        return this._ending = true, this._connected || this.once("connect", this.end.bind(this, e2)), e2 || (t2 = new this._Promise(function(t3, r3) {
          e2 = (e3) => e3 ? r3(e3) : t3();
        })), this.native.end(function() {
          r2._connected = false, r2._errorAllQueries(Error("Connection terminated")), process.nextTick(() => {
            r2.emit("end"), e2 && e2();
          });
        }), t2;
      }, c.prototype._hasActiveQuery = function() {
        return this._activeQuery && "error" !== this._activeQuery.state && "end" !== this._activeQuery.state;
      }, c.prototype._pulseQueryQueue = function(e2) {
        if (!this._connected || this._hasActiveQuery()) return;
        let t2 = this._queryQueue.shift();
        if (!t2) {
          e2 || this.emit("drain");
          return;
        }
        this._activeQuery = t2, t2.submit(this);
        let r2 = this;
        t2.once("_done", function() {
          r2._pulseQueryQueue();
        });
      }, c.prototype.cancel = function(e2) {
        this._activeQuery === e2 ? this.native.cancel(function() {
        }) : -1 !== this._queryQueue.indexOf(e2) && this._queryQueue.splice(this._queryQueue.indexOf(e2), 1);
      }, c.prototype.ref = function() {
      }, c.prototype.unref = function() {
      }, c.prototype.setTypeParser = function(e2, t2, r2) {
        return this._types.setTypeParser(e2, t2, r2);
      }, c.prototype.getTypeParser = function(e2, t2) {
        return this._types.getTypeParser(e2, t2);
      }, c.prototype.isConnected = function() {
        return this._connected;
      };
    }, 3959: (e, t, r) => {
      "use strict";
      e.exports = r(6770);
    }, 10: (e, t, r) => {
      "use strict";
      let i = r(5846).EventEmitter, n = r(2476), s = r(6480), o = e.exports = function(e2, t2, r2) {
        i.call(this), e2 = s.normalizeQueryConfig(e2, t2, r2), this.text = e2.text, this.values = e2.values, this.name = e2.name, this.queryMode = e2.queryMode, this.callback = e2.callback, this.state = "new", this._arrayMode = "array" === e2.rowMode, this._emitRowEvents = false, this.on("newListener", function(e3) {
          "row" === e3 && (this._emitRowEvents = true);
        }.bind(this));
      };
      n.inherits(o, i);
      let a = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
      o.prototype.handleError = function(e2) {
        let t2 = this.native.pq.resultErrorFields();
        if (t2) for (let r2 in t2) e2[a[r2] || r2] = t2[r2];
        this.callback ? this.callback(e2) : this.emit("error", e2), this.state = "error";
      }, o.prototype.then = function(e2, t2) {
        return this._getPromise().then(e2, t2);
      }, o.prototype.catch = function(e2) {
        return this._getPromise().catch(e2);
      }, o.prototype._getPromise = function() {
        return this._promise || (this._promise = new Promise(function(e2, t2) {
          this._once("end", e2), this._once("error", t2);
        }.bind(this))), this._promise;
      }, o.prototype.submit = function(e2) {
        this.state = "running";
        let t2 = this;
        this.native = e2.native, e2.native.arrayMode = this._arrayMode;
        let r2 = function(r3, i2, n2) {
          if (e2.native.arrayMode = false, setImmediate(function() {
            t2.emit("_done");
          }), r3) return t2.handleError(r3);
          t2._emitRowEvents && (n2.length > 1 ? i2.forEach((e3, r4) => {
            e3.forEach((e4) => {
              t2.emit("row", e4, n2[r4]);
            });
          }) : i2.forEach(function(e3) {
            t2.emit("row", e3, n2);
          })), t2.state = "end", t2.emit("end", n2), t2.callback && t2.callback(null, n2);
        };
        if (process.domain && (r2 = process.domain.bind(r2)), this.name) {
          this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", this.name, this.name.length), console.error("This can cause conflicts and silent errors executing queries"));
          let i2 = (this.values || []).map(s.prepareValue);
          if (e2.namedQueries[this.name]) {
            if (this.text && e2.namedQueries[this.name] !== this.text) {
              let e3 = Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
              return r2(e3);
            }
            return e2.native.execute(this.name, i2, r2);
          }
          return e2.native.prepare(this.name, this.text, i2.length, function(n2) {
            return n2 ? r2(n2) : (e2.namedQueries[t2.name] = t2.text, t2.native.execute(t2.name, i2, r2));
          });
        }
        if (this.values) {
          if (!Array.isArray(this.values)) {
            let e3 = Error("Query values must be an array");
            return r2(e3);
          }
          let t3 = this.values.map(s.prepareValue);
          e2.native.query(this.text, t3, r2);
        } else "extended" === this.queryMode ? e2.native.query(this.text, [], r2) : e2.native.query(this.text, r2);
      };
    }, 7254: (e, t, r) => {
      "use strict";
      let { EventEmitter: i } = r(5846), n = r(7418), s = r(6480);
      class o extends i {
        constructor(e2, t2, r2) {
          super(), e2 = s.normalizeQueryConfig(e2, t2, r2), this.text = e2.text, this.values = e2.values, this.rows = e2.rows, this.types = e2.types, this.name = e2.name, this.queryMode = e2.queryMode, this.binary = e2.binary, this.portal = e2.portal || "", this.callback = e2.callback, this._rowMode = e2.rowMode, process.domain && e2.callback && (this.callback = process.domain.bind(e2.callback)), this._result = new n(this._rowMode, this.types), this._results = this._result, this._canceledDueToError = false;
        }
        requiresPreparation() {
          return "extended" === this.queryMode || !!this.name || !!this.rows || !!this.text && !!this.values && this.values.length > 0;
        }
        _checkForMultirow() {
          this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new n(this._rowMode, this._result._types), this._results.push(this._result));
        }
        handleRowDescription(e2) {
          this._checkForMultirow(), this._result.addFields(e2.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
        }
        handleDataRow(e2) {
          let t2;
          if (!this._canceledDueToError) {
            try {
              t2 = this._result.parseRow(e2.fields);
            } catch (e3) {
              this._canceledDueToError = e3;
              return;
            }
            this.emit("row", t2, this._result), this._accumulateRows && this._result.addRow(t2);
          }
        }
        handleCommandComplete(e2, t2) {
          this._checkForMultirow(), this._result.addCommandComplete(e2), this.rows && t2.sync();
        }
        handleEmptyQuery(e2) {
          this.rows && e2.sync();
        }
        handleError(e2, t2) {
          if (this._canceledDueToError && (e2 = this._canceledDueToError, this._canceledDueToError = false), this.callback) return this.callback(e2);
          this.emit("error", e2);
        }
        handleReadyForQuery(e2) {
          if (this._canceledDueToError) return this.handleError(this._canceledDueToError, e2);
          if (this.callback) try {
            this.callback(null, this._results);
          } catch (e3) {
            process.nextTick(() => {
              throw e3;
            });
          }
          this.emit("end", this._results);
        }
        submit(e2) {
          if ("string" != typeof this.text && "string" != typeof this.name) return Error("A query must have either text or a name. Supplying neither is unsupported.");
          let t2 = e2.parsedStatements[this.name];
          if (this.text && t2 && this.text !== t2) return Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
          if (this.values && !Array.isArray(this.values)) return Error("Query values must be an array");
          if (this.requiresPreparation()) {
            e2.stream.cork && e2.stream.cork();
            try {
              this.prepare(e2);
            } finally {
              e2.stream.uncork && e2.stream.uncork();
            }
          } else e2.query(this.text);
          return null;
        }
        hasBeenParsed(e2) {
          return this.name && e2.parsedStatements[this.name];
        }
        handlePortalSuspended(e2) {
          this._getRows(e2, this.rows);
        }
        _getRows(e2, t2) {
          e2.execute({ portal: this.portal, rows: t2 }), t2 ? e2.flush() : e2.sync();
        }
        prepare(e2) {
          this.hasBeenParsed(e2) || e2.parse({ text: this.text, name: this.name, types: this.types });
          try {
            e2.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: s.prepareValue });
          } catch (t2) {
            this.handleError(t2, e2);
            return;
          }
          e2.describe({ type: "P", name: this.portal || "" }), this._getRows(e2, this.rows);
        }
        handleCopyInResponse(e2) {
          e2.sendCopyFail("No source stream defined");
        }
        handleCopyData(e2, t2) {
        }
      }
      e.exports = o;
    }, 7418: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      let n = r(7498), s = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
      class o {
        constructor(e2, t2) {
          this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t2, this.RowCtor = null, this.rowAsArray = "array" === e2, this.rowAsArray && (this.parseRow = this._parseRowAsArray), this._prebuiltEmptyResultObject = null;
        }
        addCommandComplete(e2) {
          let t2;
          (t2 = e2.text ? s.exec(e2.text) : s.exec(e2.command)) && (this.command = t2[1], t2[3] ? (this.oid = parseInt(t2[2], 10), this.rowCount = parseInt(t2[3], 10)) : t2[2] && (this.rowCount = parseInt(t2[2], 10)));
        }
        _parseRowAsArray(e2) {
          let t2 = Array(e2.length);
          for (let r2 = 0, i2 = e2.length; r2 < i2; r2++) {
            let i3 = e2[r2];
            null !== i3 ? t2[r2] = this._parsers[r2](i3) : t2[r2] = null;
          }
          return t2;
        }
        parseRow(e2) {
          let t2 = { ...this._prebuiltEmptyResultObject };
          for (let r2 = 0, n2 = e2.length; r2 < n2; r2++) {
            let n3 = e2[r2], s2 = this.fields[r2].name;
            if (null !== n3) {
              let e3 = "binary" === this.fields[r2].format ? i.from(n3) : n3;
              t2[s2] = this._parsers[r2](e3);
            } else t2[s2] = null;
          }
          return t2;
        }
        addRow(e2) {
          this.rows.push(e2);
        }
        addFields(e2) {
          this.fields = e2, this.fields.length && (this._parsers = Array(e2.length));
          let t2 = {};
          for (let r2 = 0; r2 < e2.length; r2++) {
            let i2 = e2[r2];
            t2[i2.name] = null, this._types ? this._parsers[r2] = this._types.getTypeParser(i2.dataTypeID, i2.format || "text") : this._parsers[r2] = n.getTypeParser(i2.dataTypeID, i2.format || "text");
          }
          this._prebuiltEmptyResultObject = { ...t2 };
        }
      }
      e.exports = o;
    }, 412: (e, t, r) => {
      let { getStream: i, getSecureStream: n } = !function() {
        if ("object" == typeof navigator && null !== navigator && "string" == typeof navigator.userAgent) return "Cloudflare-Workers" === navigator.userAgent;
        if ("function" == typeof Response) {
          let e2 = new Response(null, { cf: { thing: true } });
          if ("object" == typeof e2.cf && null !== e2.cf && e2.cf.thing) return true;
        }
        return false;
      }() ? { getStream: function(e2) {
        return new (r(7493)).Socket();
      }, getSecureStream: function(e2) {
        return r(7069).connect(e2);
      } } : { getStream: function(e2) {
        let { CloudflareSocket: t2 } = r(2711);
        return new t2(e2);
      }, getSecureStream: function(e2) {
        return e2.socket.startTls(e2), e2.socket;
      } };
      e.exports = { getStream: i, getSecureStream: n };
    }, 494: (e, t, r) => {
      "use strict";
      let i = r(7498);
      function n(e2) {
        this._types = e2 || i, this.text = {}, this.binary = {};
      }
      n.prototype.getOverrides = function(e2) {
        switch (e2) {
          case "text":
            return this.text;
          case "binary":
            return this.binary;
          default:
            return {};
        }
      }, n.prototype.setTypeParser = function(e2, t2, r2) {
        "function" == typeof t2 && (r2 = t2, t2 = "text"), this.getOverrides(t2)[e2] = r2;
      }, n.prototype.getTypeParser = function(e2, t2) {
        return t2 = t2 || "text", this.getOverrides(t2)[e2] || this._types.getTypeParser(e2, t2);
      }, e.exports = n;
    }, 6480: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer;
      let n = r(9126), s = r(2476), { isDate: o } = s.types || s, a = function(e2, t2) {
        if (null == e2) return null;
        if ("object" == typeof e2) {
          if (e2 instanceof i) return e2;
          if (ArrayBuffer.isView(e2)) {
            let t3 = i.from(e2.buffer, e2.byteOffset, e2.byteLength);
            return t3.length === e2.byteLength ? t3 : t3.slice(e2.byteOffset, e2.byteOffset + e2.byteLength);
          }
          return o(e2) ? n.parseInputDatesAsUTC ? function(e3) {
            let t3 = e3.getUTCFullYear(), r2 = t3 < 1;
            r2 && (t3 = Math.abs(t3) + 1);
            let i2 = String(t3).padStart(4, "0") + "-" + String(e3.getUTCMonth() + 1).padStart(2, "0") + "-" + String(e3.getUTCDate()).padStart(2, "0") + "T" + String(e3.getUTCHours()).padStart(2, "0") + ":" + String(e3.getUTCMinutes()).padStart(2, "0") + ":" + String(e3.getUTCSeconds()).padStart(2, "0") + "." + String(e3.getUTCMilliseconds()).padStart(3, "0");
            return i2 += "+00:00", r2 && (i2 += " BC"), i2;
          }(e2) : function(e3) {
            let t3 = -e3.getTimezoneOffset(), r2 = e3.getFullYear(), i2 = r2 < 1;
            i2 && (r2 = Math.abs(r2) + 1);
            let n2 = String(r2).padStart(4, "0") + "-" + String(e3.getMonth() + 1).padStart(2, "0") + "-" + String(e3.getDate()).padStart(2, "0") + "T" + String(e3.getHours()).padStart(2, "0") + ":" + String(e3.getMinutes()).padStart(2, "0") + ":" + String(e3.getSeconds()).padStart(2, "0") + "." + String(e3.getMilliseconds()).padStart(3, "0");
            return t3 < 0 ? (n2 += "-", t3 *= -1) : n2 += "+", n2 += String(Math.floor(t3 / 60)).padStart(2, "0") + ":" + String(t3 % 60).padStart(2, "0"), i2 && (n2 += " BC"), n2;
          }(e2) : Array.isArray(e2) ? function e3(t3) {
            let r2 = "{";
            for (let n2 = 0; n2 < t3.length; n2++) if (n2 > 0 && (r2 += ","), null === t3[n2] || void 0 === t3[n2]) r2 += "NULL";
            else if (Array.isArray(t3[n2])) r2 += e3(t3[n2]);
            else if (ArrayBuffer.isView(t3[n2])) {
              let e4 = t3[n2];
              if (!(e4 instanceof i)) {
                let t4 = i.from(e4.buffer, e4.byteOffset, e4.byteLength);
                e4 = t4.length === e4.byteLength ? t4 : t4.slice(e4.byteOffset, e4.byteOffset + e4.byteLength);
              }
              r2 += "\\\\x" + e4.toString("hex");
            } else r2 += '"' + a(t3[n2]).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
            return r2 + "}";
          }(e2) : function(e3, t3) {
            if (e3 && "function" == typeof e3.toPostgres) {
              if (-1 !== (t3 = t3 || []).indexOf(e3)) throw Error('circular reference detected while preparing "' + e3 + '" for query');
              return t3.push(e3), a(e3.toPostgres(a), t3);
            }
            return JSON.stringify(e3);
          }(e2, t2);
        }
        return e2.toString();
      };
      e.exports = { prepareValue: function(e2) {
        return a(e2);
      }, normalizeQueryConfig: function(e2, t2, r2) {
        return e2 = "string" == typeof e2 ? { text: e2 } : e2, t2 && ("function" == typeof t2 ? e2.callback = t2 : e2.values = t2), r2 && (e2.callback = r2), e2;
      }, escapeIdentifier: function(e2) {
        return '"' + e2.replace(/"/g, '""') + '"';
      }, escapeLiteral: function(e2) {
        let t2 = false, r2 = "'";
        if (null == e2 || "string" != typeof e2) return "''";
        for (let i2 = 0; i2 < e2.length; i2++) {
          let n2 = e2[i2];
          "'" === n2 ? r2 += n2 + n2 : "\\" === n2 ? (r2 += n2 + n2, t2 = true) : r2 += n2;
        }
        return r2 += "'", true === t2 && (r2 = " E" + r2), r2;
      } };
    }, 3475: (e, t, r) => {
      "use strict";
      var i = r(6632), n = r(8915).Stream, s = r(8911), o = r(2476), a = "win32" === process.platform, d = process.stderr, l = ["host", "port", "database", "user", "password"], u = l.length, c = l[u - 1];
      function h() {
        if (d instanceof n && true === d.writable) {
          var e2 = Array.prototype.slice.call(arguments).concat("\n");
          d.write(o.format.apply(o, e2));
        }
      }
      Object.defineProperty(e.exports, "isWin", { get: function() {
        return a;
      }, set: function(e2) {
        a = e2;
      } }), e.exports.warnTo = function(e2) {
        var t2 = d;
        return d = e2, t2;
      }, e.exports.getFileName = function(e2) {
        var t2 = e2 || process.env;
        return t2.PGPASSFILE || (a ? i.join(t2.APPDATA || "./", "postgresql", "pgpass.conf") : i.join(t2.HOME || "./", ".pgpass"));
      }, e.exports.usePgPass = function(e2, t2) {
        return !Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD") && (!!a || ((t2 = t2 || "<unkn>", (61440 & e2.mode) != 32768) ? (h('WARNING: password file "%s" is not a plain file', t2), false) : !(63 & e2.mode) || (h('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', t2), false)));
      };
      var p = e.exports.match = function(e2, t2) {
        return l.slice(0, -1).reduce(function(r2, i2, n2) {
          return 1 == n2 && Number(e2[i2] || 5432) === Number(t2[i2]) ? r2 && true : r2 && ("*" === t2[i2] || t2[i2] === e2[i2]);
        }, true);
      };
      e.exports.getPassword = function(e2, t2, r2) {
        var i2, n2 = t2.pipe(s()), o2 = function(e3) {
          t2.destroy(), h("WARNING: error on reading file: %s", e3), r2(void 0);
        };
        t2.on("error", o2), n2.on("data", function(t3) {
          var r3 = f(t3);
          r3 && m(r3) && p(e2, r3) && (i2 = r3[c], n2.end());
        }).on("end", function() {
          t2.destroy(), r2(i2);
        }).on("error", o2);
      };
      var f = e.exports.parseLine = function(e2) {
        if (e2.length < 11 || e2.match(/^\s+#/)) return null;
        for (var t2 = "", r2 = "", i2 = 0, n2 = 0, s2 = {}, o2 = function(t3, r3, i3) {
          var n3 = e2.substring(r3, i3);
          Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE") || (n3 = n3.replace(/\\([:\\])/g, "$1")), s2[l[t3]] = n3;
        }, a2 = 0; a2 < e2.length - 1; a2 += 1) {
          if (t2 = e2.charAt(a2 + 1), r2 = e2.charAt(a2), i2 == u - 1) {
            o2(i2, n2);
            break;
          }
          a2 >= 0 && ":" == t2 && "\\" !== r2 && (o2(i2, n2, a2 + 1), n2 = a2 + 2, i2 += 1);
        }
        return s2 = Object.keys(s2).length === u ? s2 : null;
      }, m = e.exports.isValidEntry = function(e2) {
        for (var t2 = { 0: function(e3) {
          return e3.length > 0;
        }, 1: function(e3) {
          return "*" === e3 || isFinite(e3 = Number(e3)) && e3 > 0 && e3 < 9007199254740992 && Math.floor(e3) === e3;
        }, 2: function(e3) {
          return e3.length > 0;
        }, 3: function(e3) {
          return e3.length > 0;
        }, 4: function(e3) {
          return e3.length > 0;
        } }, r2 = 0; r2 < l.length; r2 += 1) if (!(0, t2[r2])(e2[l[r2]] || "")) return false;
        return true;
      };
    }, 5895: (e, t, r) => {
      "use strict";
      r(6632);
      var i = r(5080), n = r(3475);
      e.exports = function(e2, t2) {
        var r2 = n.getFileName();
        i.stat(r2, function(s, o) {
          if (s || !n.usePgPass(o, r2)) return t2(void 0);
          var a = i.createReadStream(r2);
          n.getPassword(e2, a, t2);
        });
      }, e.exports.warnTo = n.warnTo;
    }, 6375: (e, t) => {
      "use strict";
      t.parse = function(e2, t2) {
        return new r(e2, t2).parse();
      };
      class r {
        constructor(e2, t2) {
          this.source = e2, this.transform = t2 || i, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
        }
        isEof() {
          return this.position >= this.source.length;
        }
        nextCharacter() {
          var e2 = this.source[this.position++];
          return "\\" === e2 ? { value: this.source[this.position++], escaped: true } : { value: e2, escaped: false };
        }
        record(e2) {
          this.recorded.push(e2);
        }
        newEntry(e2) {
          var t2;
          (this.recorded.length > 0 || e2) && ("NULL" !== (t2 = this.recorded.join("")) || e2 || (t2 = null), null !== t2 && (t2 = this.transform(t2)), this.entries.push(t2), this.recorded = []);
        }
        consumeDimensions() {
          if ("[" === this.source[0]) for (; !this.isEof() && "=" !== this.nextCharacter().value; ) ;
        }
        parse(e2) {
          var t2, i2, n;
          for (this.consumeDimensions(); !this.isEof(); ) if ("{" !== (t2 = this.nextCharacter()).value || n) {
            if ("}" !== t2.value || n) '"' !== t2.value || t2.escaped ? "," !== t2.value || n ? this.record(t2.value) : this.newEntry() : (n && this.newEntry(true), n = !n);
            else if (this.dimension--, !this.dimension && (this.newEntry(), e2)) return this.entries;
          } else this.dimension++, this.dimension > 1 && (i2 = new r(this.source.substr(this.position - 1), this.transform), this.entries.push(i2.parse(true)), this.position += i2.position - 2);
          if (0 !== this.dimension) throw Error("array dimension not balanced");
          return this.entries;
        }
      }
      function i(e2) {
        return e2;
      }
    }, 7454: (e, t, r) => {
      "use strict";
      var i = r(6195).Buffer, n = i.from || i;
      e.exports = function(e2) {
        if (/^\\x/.test(e2)) return n(e2.substr(2), "hex");
        for (var t2 = "", r2 = 0; r2 < e2.length; ) if ("\\" !== e2[r2]) t2 += e2[r2], ++r2;
        else if (/[0-7]{3}/.test(e2.substr(r2 + 1, 3))) t2 += String.fromCharCode(parseInt(e2.substr(r2 + 1, 3), 8)), r2 += 4;
        else {
          for (var i2 = 1; r2 + i2 < e2.length && "\\" === e2[r2 + i2]; ) i2++;
          for (var s = 0; s < Math.floor(i2 / 2); ++s) t2 += "\\";
          r2 += 2 * Math.floor(i2 / 2);
        }
        return n(t2, "binary");
      };
    }, 3857: (e) => {
      "use strict";
      var t = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, r = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, i = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, n = /^-?infinity$/;
      function s(e2) {
        return e2 >= 0 && e2 < 100;
      }
      e.exports = function(e2) {
        if (n.test(e2)) return Number(e2.replace("i", "I"));
        var o, a = t.exec(e2);
        if (!a) return function(e3) {
          var t2 = r.exec(e3);
          if (t2) {
            var i2 = parseInt(t2[1], 10);
            t2[4] && (i2 = -(i2 - 1));
            var n2 = new Date(i2, parseInt(t2[2], 10) - 1, t2[3]);
            return s(i2) && n2.setFullYear(i2), n2;
          }
        }(e2) || null;
        var d = !!a[8], l = parseInt(a[1], 10);
        d && (l = -(l - 1));
        var u = parseInt(a[2], 10) - 1, c = a[3], h = parseInt(a[4], 10), p = parseInt(a[5], 10), f = parseInt(a[6], 10), m = a[7];
        m = m ? 1e3 * parseFloat(m) : 0;
        var y = function(e3) {
          if (e3.endsWith("+00")) return 0;
          var t2 = i.exec(e3.split(" ")[1]);
          if (t2) {
            var r2 = t2[1];
            return "Z" === r2 ? 0 : (3600 * parseInt(t2[2], 10) + 60 * parseInt(t2[3] || 0, 10) + parseInt(t2[4] || 0, 10)) * ("-" === r2 ? -1 : 1) * 1e3;
          }
        }(e2);
        return null != y ? (o = new Date(Date.UTC(l, u, c, h, p, f, m)), s(l) && o.setUTCFullYear(l), 0 !== y && o.setTime(o.getTime() - y)) : (o = new Date(l, u, c, h, p, f, m), s(l) && o.setFullYear(l)), o;
      };
    }, 6696: (e, t, r) => {
      "use strict";
      var i = r(5793);
      function n(e2) {
        if (!(this instanceof n)) return new n(e2);
        i(this, function(e3) {
          if (!e3) return {};
          var t2 = u.exec(e3), r2 = "-" === t2[8];
          return Object.keys(c).reduce(function(e4, i2) {
            var n2, s2 = t2[c[i2]];
            return s2 && (s2 = "milliseconds" === i2 ? parseInt((n2 = s2) + "000000".slice(n2.length), 10) / 1e3 : parseInt(s2, 10)) && (r2 && ~h.indexOf(i2) && (s2 *= -1), e4[i2] = s2), e4;
          }, {});
        }(e2));
      }
      e.exports = n;
      var s = ["seconds", "minutes", "hours", "days", "months", "years"];
      n.prototype.toPostgres = function() {
        var e2 = s.filter(this.hasOwnProperty, this);
        return (this.milliseconds && 0 > e2.indexOf("seconds") && e2.push("seconds"), 0 === e2.length) ? "0" : e2.map(function(e3) {
          var t2 = this[e3] || 0;
          return "seconds" === e3 && this.milliseconds && (t2 = (t2 + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "")), t2 + " " + e3;
        }, this).join(" ");
      };
      var o = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, a = ["years", "months", "days"], d = ["hours", "minutes", "seconds"];
      n.prototype.toISOString = n.prototype.toISO = function() {
        return "P" + a.map(e2, this).join("") + "T" + d.map(e2, this).join("");
        function e2(e3) {
          var t2 = this[e3] || 0;
          return "seconds" === e3 && this.milliseconds && (t2 = (t2 + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "")), t2 + o[e3];
        }
      };
      var l = "([+-]?\\d+)", u = new RegExp([l + "\\s+years?", l + "\\s+mons?", l + "\\s+days?", "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?"].map(function(e2) {
        return "(" + e2 + ")?";
      }).join("\\s*")), c = { years: 2, months: 4, days: 6, hours: 9, minutes: 10, seconds: 11, milliseconds: 12 }, h = ["hours", "minutes", "seconds", "milliseconds"];
    }, 2091: (e, t, r) => {
      var i = r(6195), n = i.Buffer;
      function s(e2, t2) {
        for (var r2 in e2) t2[r2] = e2[r2];
      }
      function o(e2, t2, r2) {
        return n(e2, t2, r2);
      }
      n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = i : (s(i, t), t.Buffer = o), o.prototype = Object.create(n.prototype), s(n, o), o.from = function(e2, t2, r2) {
        if ("number" == typeof e2) throw TypeError("Argument must not be a number");
        return n(e2, t2, r2);
      }, o.alloc = function(e2, t2, r2) {
        if ("number" != typeof e2) throw TypeError("Argument must be a number");
        var i2 = n(e2);
        return void 0 !== t2 ? "string" == typeof r2 ? i2.fill(t2, r2) : i2.fill(t2) : i2.fill(0), i2;
      }, o.allocUnsafe = function(e2) {
        if ("number" != typeof e2) throw TypeError("Argument must be a number");
        return n(e2);
      }, o.allocUnsafeSlow = function(e2) {
        if ("number" != typeof e2) throw TypeError("Argument must be a number");
        return i.SlowBuffer(e2);
      };
    }, 8911: (e, t, r) => {
      "use strict";
      let { Transform: i } = r(8915), { StringDecoder: n } = r(7963), s = Symbol("last"), o = Symbol("decoder");
      function a(e2, t2, r2) {
        let i2;
        if (this.overflow) {
          if (1 === (i2 = this[o].write(e2).split(this.matcher)).length) return r2();
          i2.shift(), this.overflow = false;
        } else this[s] += this[o].write(e2), i2 = this[s].split(this.matcher);
        this[s] = i2.pop();
        for (let e3 = 0; e3 < i2.length; e3++) try {
          l(this, this.mapper(i2[e3]));
        } catch (e4) {
          return r2(e4);
        }
        if (this.overflow = this[s].length > this.maxLength, this.overflow && !this.skipOverflow) {
          r2(Error("maximum buffer reached"));
          return;
        }
        r2();
      }
      function d(e2) {
        if (this[s] += this[o].end(), this[s]) try {
          l(this, this.mapper(this[s]));
        } catch (t2) {
          return e2(t2);
        }
        e2();
      }
      function l(e2, t2) {
        void 0 !== t2 && e2.push(t2);
      }
      function u(e2) {
        return e2;
      }
      e.exports = function(e2, t2, r2) {
        switch (e2 = e2 || /\r?\n/, t2 = t2 || u, r2 = r2 || {}, arguments.length) {
          case 1:
            "function" == typeof e2 ? (t2 = e2, e2 = /\r?\n/) : "object" != typeof e2 || e2 instanceof RegExp || e2[Symbol.split] || (r2 = e2, e2 = /\r?\n/);
            break;
          case 2:
            "function" == typeof e2 ? (r2 = t2, t2 = e2, e2 = /\r?\n/) : "object" == typeof t2 && (r2 = t2, t2 = u);
        }
        (r2 = Object.assign({}, r2)).autoDestroy = true, r2.transform = a, r2.flush = d, r2.readableObjectMode = true;
        let l2 = new i(r2);
        return l2[s] = "", l2[o] = new n("utf8"), l2.matcher = e2, l2.mapper = t2, l2.maxLength = r2.maxLength, l2.skipOverflow = r2.skipOverflow || false, l2.overflow = false, l2._destroy = function(e3, t3) {
          this._writableState.errorEmitted = false, t3(e3);
        }, l2;
      };
    }, 7963: (e, t, r) => {
      "use strict";
      var i = r(2091).Buffer, n = i.isEncoding || function(e2) {
        switch ((e2 = "" + e2) && e2.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function s(e2) {
        var t2;
        switch (this.encoding = function(e3) {
          var t3 = function(e4) {
            var t4;
            if (!e4) return "utf8";
            for (; ; ) switch (e4) {
              case "utf8":
              case "utf-8":
                return "utf8";
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return "utf16le";
              case "latin1":
              case "binary":
                return "latin1";
              case "base64":
              case "ascii":
              case "hex":
                return e4;
              default:
                if (t4) return;
                e4 = ("" + e4).toLowerCase(), t4 = true;
            }
          }(e3);
          if ("string" != typeof t3 && (i.isEncoding === n || !n(e3))) throw Error("Unknown encoding: " + e3);
          return t3 || e3;
        }(e2), this.encoding) {
          case "utf16le":
            this.text = d, this.end = l, t2 = 4;
            break;
          case "utf8":
            this.fillLast = a, t2 = 4;
            break;
          case "base64":
            this.text = u, this.end = c, t2 = 3;
            break;
          default:
            this.write = h, this.end = p;
            return;
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = i.allocUnsafe(t2);
      }
      function o(e2) {
        return e2 <= 127 ? 0 : e2 >> 5 == 6 ? 2 : e2 >> 4 == 14 ? 3 : e2 >> 3 == 30 ? 4 : e2 >> 6 == 2 ? -1 : -2;
      }
      function a(e2) {
        var t2 = this.lastTotal - this.lastNeed, r2 = function(e3, t3, r3) {
          if ((192 & t3[0]) != 128) return e3.lastNeed = 0, "\uFFFD";
          if (e3.lastNeed > 1 && t3.length > 1) {
            if ((192 & t3[1]) != 128) return e3.lastNeed = 1, "\uFFFD";
            if (e3.lastNeed > 2 && t3.length > 2 && (192 & t3[2]) != 128) return e3.lastNeed = 2, "\uFFFD";
          }
        }(this, e2, 0);
        return void 0 !== r2 ? r2 : this.lastNeed <= e2.length ? (e2.copy(this.lastChar, t2, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e2.copy(this.lastChar, t2, 0, e2.length), this.lastNeed -= e2.length);
      }
      function d(e2, t2) {
        if ((e2.length - t2) % 2 == 0) {
          var r2 = e2.toString("utf16le", t2);
          if (r2) {
            var i2 = r2.charCodeAt(r2.length - 1);
            if (i2 >= 55296 && i2 <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1], r2.slice(0, -1);
          }
          return r2;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e2[e2.length - 1], e2.toString("utf16le", t2, e2.length - 1);
      }
      function l(e2) {
        var t2 = e2 && e2.length ? this.write(e2) : "";
        if (this.lastNeed) {
          var r2 = this.lastTotal - this.lastNeed;
          return t2 + this.lastChar.toString("utf16le", 0, r2);
        }
        return t2;
      }
      function u(e2, t2) {
        var r2 = (e2.length - t2) % 3;
        return 0 === r2 ? e2.toString("base64", t2) : (this.lastNeed = 3 - r2, this.lastTotal = 3, 1 === r2 ? this.lastChar[0] = e2[e2.length - 1] : (this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1]), e2.toString("base64", t2, e2.length - r2));
      }
      function c(e2) {
        var t2 = e2 && e2.length ? this.write(e2) : "";
        return this.lastNeed ? t2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t2;
      }
      function h(e2) {
        return e2.toString(this.encoding);
      }
      function p(e2) {
        return e2 && e2.length ? this.write(e2) : "";
      }
      t.StringDecoder = s, s.prototype.write = function(e2) {
        var t2, r2;
        if (0 === e2.length) return "";
        if (this.lastNeed) {
          if (void 0 === (t2 = this.fillLast(e2))) return "";
          r2 = this.lastNeed, this.lastNeed = 0;
        } else r2 = 0;
        return r2 < e2.length ? t2 ? t2 + this.text(e2, r2) : this.text(e2, r2) : t2 || "";
      }, s.prototype.end = function(e2) {
        var t2 = e2 && e2.length ? this.write(e2) : "";
        return this.lastNeed ? t2 + "\uFFFD" : t2;
      }, s.prototype.text = function(e2, t2) {
        var r2 = function(e3, t3, r3) {
          var i3 = t3.length - 1;
          if (i3 < r3) return 0;
          var n2 = o(t3[i3]);
          return n2 >= 0 ? (n2 > 0 && (e3.lastNeed = n2 - 1), n2) : --i3 < r3 || -2 === n2 ? 0 : (n2 = o(t3[i3])) >= 0 ? (n2 > 0 && (e3.lastNeed = n2 - 2), n2) : --i3 < r3 || -2 === n2 ? 0 : (n2 = o(t3[i3])) >= 0 ? (n2 > 0 && (2 === n2 ? n2 = 0 : e3.lastNeed = n2 - 3), n2) : 0;
        }(this, e2, t2);
        if (!this.lastNeed) return e2.toString("utf8", t2);
        this.lastTotal = r2;
        var i2 = e2.length - (r2 - this.lastNeed);
        return e2.copy(this.lastChar, 0, i2), e2.toString("utf8", t2, i2);
      }, s.prototype.fillLast = function(e2) {
        if (this.lastNeed <= e2.length) return e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e2.length), this.lastNeed -= e2.length;
      };
    }, 5793: (e) => {
      e.exports = function(e2) {
        for (var r = 1; r < arguments.length; r++) {
          var i = arguments[r];
          for (var n in i) t.call(i, n) && (e2[n] = i[n]);
        }
        return e2;
      };
      var t = Object.prototype.hasOwnProperty;
    }, 7195: (e, t, r) => {
      "use strict";
      r.d(t, { getCloudflareContext: () => n });
      let i = Symbol.for("__cloudflare-context__");
      function n(e2 = { async: false }) {
        return e2.async ? a() : function() {
          let e3 = s();
          if (e3) return e3;
          if (o()) throw Error("\n\nERROR: `getCloudflareContext` has been called in sync mode in either a static route or at the top level of a non-static one, both cases are not allowed but can be solved by either:\n  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");
          throw Error(l);
        }();
      }
      function s() {
        return globalThis[i];
      }
      function o() {
        let e2 = globalThis;
        return e2.__NEXT_DATA__?.nextExport === true;
      }
      async function a() {
        let e2 = s();
        if (e2) return e2;
        if (o()) {
          var t2;
          let e3 = await d();
          return t2 = e3, globalThis[i] = t2, e3;
        }
        throw Error(l);
      }
      async function d(e2) {
        let { getPlatformProxy: t2 } = await import(`${"__wrangler".replaceAll("_", "")}`), r2 = e2?.environment ?? process.env.NEXT_DEV_WRANGLER_ENV, { env: i2, cf: n2, ctx: s2 } = await t2({ ...e2, envFiles: [], environment: r2 });
        return { env: i2, cf: n2, ctx: s2 };
      }
      let l = '\n\nERROR: `getCloudflareContext` has been called without having called `initOpenNextCloudflareForDev` from the Next.js config file.\nYou should update your Next.js config file as shown below:\n\n   ```\n   // next.config.mjs\n\n   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";\n\n   initOpenNextCloudflareForDev();\n\n   const nextConfig = { ... };\n   export default nextConfig;\n   ```\n\n';
    }, 7419: (e, t, r) => {
      "use strict";
      var i, n, s, o;
      let a;
      r.r(t), r.d(t, { env: () => eM }), function(e2) {
        e2.assertEqual = (e3) => {
        }, e2.assertIs = function(e3) {
        }, e2.assertNever = function(e3) {
          throw Error();
        }, e2.arrayToEnum = (e3) => {
          let t2 = {};
          for (let r2 of e3) t2[r2] = r2;
          return t2;
        }, e2.getValidEnumValues = (t2) => {
          let r2 = e2.objectKeys(t2).filter((e3) => "number" != typeof t2[t2[e3]]), i2 = {};
          for (let e3 of r2) i2[e3] = t2[e3];
          return e2.objectValues(i2);
        }, e2.objectValues = (t2) => e2.objectKeys(t2).map(function(e3) {
          return t2[e3];
        }), e2.objectKeys = "function" == typeof Object.keys ? (e3) => Object.keys(e3) : (e3) => {
          let t2 = [];
          for (let r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && t2.push(r2);
          return t2;
        }, e2.find = (e3, t2) => {
          for (let r2 of e3) if (t2(r2)) return r2;
        }, e2.isInteger = "function" == typeof Number.isInteger ? (e3) => Number.isInteger(e3) : (e3) => "number" == typeof e3 && Number.isFinite(e3) && Math.floor(e3) === e3, e2.joinValues = function(e3, t2 = " | ") {
          return e3.map((e4) => "string" == typeof e4 ? `'${e4}'` : e4).join(t2);
        }, e2.jsonStringifyReplacer = (e3, t2) => "bigint" == typeof t2 ? t2.toString() : t2;
      }(i || (i = {})), (n || (n = {})).mergeShapes = (e2, t2) => ({ ...e2, ...t2 });
      let d = i.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]), l = (e2) => {
        switch (typeof e2) {
          case "undefined":
            return d.undefined;
          case "string":
            return d.string;
          case "number":
            return Number.isNaN(e2) ? d.nan : d.number;
          case "boolean":
            return d.boolean;
          case "function":
            return d.function;
          case "bigint":
            return d.bigint;
          case "symbol":
            return d.symbol;
          case "object":
            if (Array.isArray(e2)) return d.array;
            if (null === e2) return d.null;
            if (e2.then && "function" == typeof e2.then && e2.catch && "function" == typeof e2.catch) return d.promise;
            if ("undefined" != typeof Map && e2 instanceof Map) return d.map;
            if ("undefined" != typeof Set && e2 instanceof Set) return d.set;
            if ("undefined" != typeof Date && e2 instanceof Date) return d.date;
            return d.object;
          default:
            return d.unknown;
        }
      }, u = i.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
      class c extends Error {
        get errors() {
          return this.issues;
        }
        constructor(e2) {
          super(), this.issues = [], this.addIssue = (e3) => {
            this.issues = [...this.issues, e3];
          }, this.addIssues = (e3 = []) => {
            this.issues = [...this.issues, ...e3];
          };
          let t2 = new.target.prototype;
          Object.setPrototypeOf ? Object.setPrototypeOf(this, t2) : this.__proto__ = t2, this.name = "ZodError", this.issues = e2;
        }
        format(e2) {
          let t2 = e2 || function(e3) {
            return e3.message;
          }, r2 = { _errors: [] }, i2 = (e3) => {
            for (let n2 of e3.issues) if ("invalid_union" === n2.code) n2.unionErrors.map(i2);
            else if ("invalid_return_type" === n2.code) i2(n2.returnTypeError);
            else if ("invalid_arguments" === n2.code) i2(n2.argumentsError);
            else if (0 === n2.path.length) r2._errors.push(t2(n2));
            else {
              let e4 = r2, i3 = 0;
              for (; i3 < n2.path.length; ) {
                let r3 = n2.path[i3];
                i3 === n2.path.length - 1 ? (e4[r3] = e4[r3] || { _errors: [] }, e4[r3]._errors.push(t2(n2))) : e4[r3] = e4[r3] || { _errors: [] }, e4 = e4[r3], i3++;
              }
            }
          };
          return i2(this), r2;
        }
        static assert(e2) {
          if (!(e2 instanceof c)) throw Error(`Not a ZodError: ${e2}`);
        }
        toString() {
          return this.message;
        }
        get message() {
          return JSON.stringify(this.issues, i.jsonStringifyReplacer, 2);
        }
        get isEmpty() {
          return 0 === this.issues.length;
        }
        flatten(e2 = (e3) => e3.message) {
          let t2 = {}, r2 = [];
          for (let i2 of this.issues) if (i2.path.length > 0) {
            let r3 = i2.path[0];
            t2[r3] = t2[r3] || [], t2[r3].push(e2(i2));
          } else r2.push(e2(i2));
          return { formErrors: r2, fieldErrors: t2 };
        }
        get formErrors() {
          return this.flatten();
        }
      }
      c.create = (e2) => new c(e2);
      let h = (e2, t2) => {
        let r2;
        switch (e2.code) {
          case u.invalid_type:
            r2 = e2.received === d.undefined ? "Required" : `Expected ${e2.expected}, received ${e2.received}`;
            break;
          case u.invalid_literal:
            r2 = `Invalid literal value, expected ${JSON.stringify(e2.expected, i.jsonStringifyReplacer)}`;
            break;
          case u.unrecognized_keys:
            r2 = `Unrecognized key(s) in object: ${i.joinValues(e2.keys, ", ")}`;
            break;
          case u.invalid_union:
            r2 = "Invalid input";
            break;
          case u.invalid_union_discriminator:
            r2 = `Invalid discriminator value. Expected ${i.joinValues(e2.options)}`;
            break;
          case u.invalid_enum_value:
            r2 = `Invalid enum value. Expected ${i.joinValues(e2.options)}, received '${e2.received}'`;
            break;
          case u.invalid_arguments:
            r2 = "Invalid function arguments";
            break;
          case u.invalid_return_type:
            r2 = "Invalid function return type";
            break;
          case u.invalid_date:
            r2 = "Invalid date";
            break;
          case u.invalid_string:
            "object" == typeof e2.validation ? "includes" in e2.validation ? (r2 = `Invalid input: must include "${e2.validation.includes}"`, "number" == typeof e2.validation.position && (r2 = `${r2} at one or more positions greater than or equal to ${e2.validation.position}`)) : "startsWith" in e2.validation ? r2 = `Invalid input: must start with "${e2.validation.startsWith}"` : "endsWith" in e2.validation ? r2 = `Invalid input: must end with "${e2.validation.endsWith}"` : i.assertNever(e2.validation) : r2 = "regex" !== e2.validation ? `Invalid ${e2.validation}` : "Invalid";
            break;
          case u.too_small:
            r2 = "array" === e2.type ? `Array must contain ${e2.exact ? "exactly" : e2.inclusive ? "at least" : "more than"} ${e2.minimum} element(s)` : "string" === e2.type ? `String must contain ${e2.exact ? "exactly" : e2.inclusive ? "at least" : "over"} ${e2.minimum} character(s)` : "number" === e2.type ? `Number must be ${e2.exact ? "exactly equal to " : e2.inclusive ? "greater than or equal to " : "greater than "}${e2.minimum}` : "bigint" === e2.type ? `Number must be ${e2.exact ? "exactly equal to " : e2.inclusive ? "greater than or equal to " : "greater than "}${e2.minimum}` : "date" === e2.type ? `Date must be ${e2.exact ? "exactly equal to " : e2.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e2.minimum))}` : "Invalid input";
            break;
          case u.too_big:
            r2 = "array" === e2.type ? `Array must contain ${e2.exact ? "exactly" : e2.inclusive ? "at most" : "less than"} ${e2.maximum} element(s)` : "string" === e2.type ? `String must contain ${e2.exact ? "exactly" : e2.inclusive ? "at most" : "under"} ${e2.maximum} character(s)` : "number" === e2.type ? `Number must be ${e2.exact ? "exactly" : e2.inclusive ? "less than or equal to" : "less than"} ${e2.maximum}` : "bigint" === e2.type ? `BigInt must be ${e2.exact ? "exactly" : e2.inclusive ? "less than or equal to" : "less than"} ${e2.maximum}` : "date" === e2.type ? `Date must be ${e2.exact ? "exactly" : e2.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e2.maximum))}` : "Invalid input";
            break;
          case u.custom:
            r2 = "Invalid input";
            break;
          case u.invalid_intersection_types:
            r2 = "Intersection results could not be merged";
            break;
          case u.not_multiple_of:
            r2 = `Number must be a multiple of ${e2.multipleOf}`;
            break;
          case u.not_finite:
            r2 = "Number must be finite";
            break;
          default:
            r2 = t2.defaultError, i.assertNever(e2);
        }
        return { message: r2 };
      };
      !function(e2) {
        e2.errToObj = (e3) => "string" == typeof e3 ? { message: e3 } : e3 || {}, e2.toString = (e3) => "string" == typeof e3 ? e3 : e3?.message;
      }(s || (s = {}));
      let p = (e2) => {
        let { data: t2, path: r2, errorMaps: i2, issueData: n2 } = e2, s2 = [...r2, ...n2.path || []], o2 = { ...n2, path: s2 };
        if (void 0 !== n2.message) return { ...n2, path: s2, message: n2.message };
        let a2 = "";
        for (let e3 of i2.filter((e4) => !!e4).slice().reverse()) a2 = e3(o2, { data: t2, defaultError: a2 }).message;
        return { ...n2, path: s2, message: a2 };
      };
      function f(e2, t2) {
        let r2 = p({ issueData: t2, data: e2.data, path: e2.path, errorMaps: [e2.common.contextualErrorMap, e2.schemaErrorMap, h, h == h ? void 0 : h].filter((e3) => !!e3) });
        e2.common.issues.push(r2);
      }
      class m {
        constructor() {
          this.value = "valid";
        }
        dirty() {
          "valid" === this.value && (this.value = "dirty");
        }
        abort() {
          "aborted" !== this.value && (this.value = "aborted");
        }
        static mergeArray(e2, t2) {
          let r2 = [];
          for (let i2 of t2) {
            if ("aborted" === i2.status) return y;
            "dirty" === i2.status && e2.dirty(), r2.push(i2.value);
          }
          return { status: e2.value, value: r2 };
        }
        static async mergeObjectAsync(e2, t2) {
          let r2 = [];
          for (let e3 of t2) {
            let t3 = await e3.key, i2 = await e3.value;
            r2.push({ key: t3, value: i2 });
          }
          return m.mergeObjectSync(e2, r2);
        }
        static mergeObjectSync(e2, t2) {
          let r2 = {};
          for (let i2 of t2) {
            let { key: t3, value: n2 } = i2;
            if ("aborted" === t3.status || "aborted" === n2.status) return y;
            "dirty" === t3.status && e2.dirty(), "dirty" === n2.status && e2.dirty(), "__proto__" !== t3.value && (void 0 !== n2.value || i2.alwaysSet) && (r2[t3.value] = n2.value);
          }
          return { status: e2.value, value: r2 };
        }
      }
      let y = Object.freeze({ status: "aborted" }), g = (e2) => ({ status: "dirty", value: e2 }), w = (e2) => ({ status: "valid", value: e2 }), v = (e2) => "aborted" === e2.status, b = (e2) => "dirty" === e2.status, N = (e2) => "valid" === e2.status, _ = (e2) => "undefined" != typeof Promise && e2 instanceof Promise;
      class x {
        constructor(e2, t2, r2, i2) {
          this._cachedPath = [], this.parent = e2, this.data = t2, this._path = r2, this._key = i2;
        }
        get path() {
          return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
        }
      }
      let S = (e2, t2) => {
        if (N(t2)) return { success: true, data: t2.value };
        if (!e2.common.issues.length) throw Error("Validation failed but no issues detected.");
        return { success: false, get error() {
          if (this._error) return this._error;
          let t3 = new c(e2.common.issues);
          return this._error = t3, this._error;
        } };
      };
      function C(e2) {
        if (!e2) return {};
        let { errorMap: t2, invalid_type_error: r2, required_error: i2, description: n2 } = e2;
        if (t2 && (r2 || i2)) throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
        return t2 ? { errorMap: t2, description: n2 } : { errorMap: (t3, n3) => {
          let { message: s2 } = e2;
          return "invalid_enum_value" === t3.code ? { message: s2 ?? n3.defaultError } : void 0 === n3.data ? { message: s2 ?? i2 ?? n3.defaultError } : "invalid_type" !== t3.code ? { message: n3.defaultError } : { message: s2 ?? r2 ?? n3.defaultError };
        }, description: n2 };
      }
      class k {
        get description() {
          return this._def.description;
        }
        _getType(e2) {
          return l(e2.data);
        }
        _getOrReturnCtx(e2, t2) {
          return t2 || { common: e2.parent.common, data: e2.data, parsedType: l(e2.data), schemaErrorMap: this._def.errorMap, path: e2.path, parent: e2.parent };
        }
        _processInputParams(e2) {
          return { status: new m(), ctx: { common: e2.parent.common, data: e2.data, parsedType: l(e2.data), schemaErrorMap: this._def.errorMap, path: e2.path, parent: e2.parent } };
        }
        _parseSync(e2) {
          let t2 = this._parse(e2);
          if (_(t2)) throw Error("Synchronous parse encountered promise.");
          return t2;
        }
        _parseAsync(e2) {
          return Promise.resolve(this._parse(e2));
        }
        parse(e2, t2) {
          let r2 = this.safeParse(e2, t2);
          if (r2.success) return r2.data;
          throw r2.error;
        }
        safeParse(e2, t2) {
          let r2 = { common: { issues: [], async: t2?.async ?? false, contextualErrorMap: t2?.errorMap }, path: t2?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e2, parsedType: l(e2) }, i2 = this._parseSync({ data: e2, path: r2.path, parent: r2 });
          return S(r2, i2);
        }
        "~validate"(e2) {
          let t2 = { common: { issues: [], async: !!this["~standard"].async }, path: [], schemaErrorMap: this._def.errorMap, parent: null, data: e2, parsedType: l(e2) };
          if (!this["~standard"].async) try {
            let r2 = this._parseSync({ data: e2, path: [], parent: t2 });
            return N(r2) ? { value: r2.value } : { issues: t2.common.issues };
          } catch (e3) {
            e3?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = true), t2.common = { issues: [], async: true };
          }
          return this._parseAsync({ data: e2, path: [], parent: t2 }).then((e3) => N(e3) ? { value: e3.value } : { issues: t2.common.issues });
        }
        async parseAsync(e2, t2) {
          let r2 = await this.safeParseAsync(e2, t2);
          if (r2.success) return r2.data;
          throw r2.error;
        }
        async safeParseAsync(e2, t2) {
          let r2 = { common: { issues: [], contextualErrorMap: t2?.errorMap, async: true }, path: t2?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e2, parsedType: l(e2) }, i2 = this._parse({ data: e2, path: r2.path, parent: r2 });
          return S(r2, await (_(i2) ? i2 : Promise.resolve(i2)));
        }
        refine(e2, t2) {
          let r2 = (e3) => "string" == typeof t2 || void 0 === t2 ? { message: t2 } : "function" == typeof t2 ? t2(e3) : t2;
          return this._refinement((t3, i2) => {
            let n2 = e2(t3), s2 = () => i2.addIssue({ code: u.custom, ...r2(t3) });
            return "undefined" != typeof Promise && n2 instanceof Promise ? n2.then((e3) => !!e3 || (s2(), false)) : !!n2 || (s2(), false);
          });
        }
        refinement(e2, t2) {
          return this._refinement((r2, i2) => !!e2(r2) || (i2.addIssue("function" == typeof t2 ? t2(r2, i2) : t2), false));
        }
        _refinement(e2) {
          return new ev({ schema: this, typeName: o.ZodEffects, effect: { type: "refinement", refinement: e2 } });
        }
        superRefine(e2) {
          return this._refinement(e2);
        }
        constructor(e2) {
          this.spa = this.safeParseAsync, this._def = e2, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = { version: 1, vendor: "zod", validate: (e3) => this["~validate"](e3) };
        }
        optional() {
          return eb.create(this, this._def);
        }
        nullable() {
          return eN.create(this, this._def);
        }
        nullish() {
          return this.nullable().optional();
        }
        array() {
          return er.create(this);
        }
        promise() {
          return ew.create(this, this._def);
        }
        or(e2) {
          return en.create([this, e2], this._def);
        }
        and(e2) {
          return ea.create(this, e2, this._def);
        }
        transform(e2) {
          return new ev({ ...C(this._def), schema: this, typeName: o.ZodEffects, effect: { type: "transform", transform: e2 } });
        }
        default(e2) {
          return new e_({ ...C(this._def), innerType: this, defaultValue: "function" == typeof e2 ? e2 : () => e2, typeName: o.ZodDefault });
        }
        brand() {
          return new eC({ typeName: o.ZodBranded, type: this, ...C(this._def) });
        }
        catch(e2) {
          return new ex({ ...C(this._def), innerType: this, catchValue: "function" == typeof e2 ? e2 : () => e2, typeName: o.ZodCatch });
        }
        describe(e2) {
          return new this.constructor({ ...this._def, description: e2 });
        }
        pipe(e2) {
          return ek.create(this, e2);
        }
        readonly() {
          return eE.create(this);
        }
        isOptional() {
          return this.safeParse(void 0).success;
        }
        isNullable() {
          return this.safeParse(null).success;
        }
      }
      let E = /^c[^\s-]{8,}$/i, O = /^[0-9a-z]+$/, T = /^[0-9A-HJKMNP-TV-Z]{26}$/i, A = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, I = /^[a-z0-9_-]{21}$/i, P = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, R = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, M = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, q = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, W = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, L = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, D = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, j = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, B = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, F = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", U = RegExp(`^${F}$`);
      function $(e2) {
        let t2 = "[0-5]\\d";
        e2.precision ? t2 = `${t2}\\.\\d{${e2.precision}}` : null == e2.precision && (t2 = `${t2}(\\.\\d+)?`);
        let r2 = e2.precision ? "+" : "?";
        return `([01]\\d|2[0-3]):[0-5]\\d(:${t2})${r2}`;
      }
      class Q extends k {
        _parse(e2) {
          var t2, r2, n2, s2;
          let o2;
          if (this._def.coerce && (e2.data = String(e2.data)), this._getType(e2) !== d.string) {
            let t3 = this._getOrReturnCtx(e2);
            return f(t3, { code: u.invalid_type, expected: d.string, received: t3.parsedType }), y;
          }
          let l2 = new m();
          for (let d2 of this._def.checks) if ("min" === d2.kind) e2.data.length < d2.value && (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.too_small, minimum: d2.value, type: "string", inclusive: true, exact: false, message: d2.message }), l2.dirty());
          else if ("max" === d2.kind) e2.data.length > d2.value && (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.too_big, maximum: d2.value, type: "string", inclusive: true, exact: false, message: d2.message }), l2.dirty());
          else if ("length" === d2.kind) {
            let t3 = e2.data.length > d2.value, r3 = e2.data.length < d2.value;
            (t3 || r3) && (o2 = this._getOrReturnCtx(e2, o2), t3 ? f(o2, { code: u.too_big, maximum: d2.value, type: "string", inclusive: true, exact: true, message: d2.message }) : r3 && f(o2, { code: u.too_small, minimum: d2.value, type: "string", inclusive: true, exact: true, message: d2.message }), l2.dirty());
          } else if ("email" === d2.kind) M.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "email", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("emoji" === d2.kind) a || (a = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), a.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "emoji", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("uuid" === d2.kind) A.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "uuid", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("nanoid" === d2.kind) I.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "nanoid", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("cuid" === d2.kind) E.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "cuid", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("cuid2" === d2.kind) O.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "cuid2", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("ulid" === d2.kind) T.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "ulid", code: u.invalid_string, message: d2.message }), l2.dirty());
          else if ("url" === d2.kind) try {
            new URL(e2.data);
          } catch {
            f(o2 = this._getOrReturnCtx(e2, o2), { validation: "url", code: u.invalid_string, message: d2.message }), l2.dirty();
          }
          else "regex" === d2.kind ? (d2.regex.lastIndex = 0, d2.regex.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "regex", code: u.invalid_string, message: d2.message }), l2.dirty())) : "trim" === d2.kind ? e2.data = e2.data.trim() : "includes" === d2.kind ? e2.data.includes(d2.value, d2.position) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: { includes: d2.value, position: d2.position }, message: d2.message }), l2.dirty()) : "toLowerCase" === d2.kind ? e2.data = e2.data.toLowerCase() : "toUpperCase" === d2.kind ? e2.data = e2.data.toUpperCase() : "startsWith" === d2.kind ? e2.data.startsWith(d2.value) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: { startsWith: d2.value }, message: d2.message }), l2.dirty()) : "endsWith" === d2.kind ? e2.data.endsWith(d2.value) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: { endsWith: d2.value }, message: d2.message }), l2.dirty()) : "datetime" === d2.kind ? function(e3) {
            let t3 = `${F}T${$(e3)}`, r3 = [];
            return r3.push(e3.local ? "Z?" : "Z"), e3.offset && r3.push("([+-]\\d{2}:?\\d{2})"), t3 = `${t3}(${r3.join("|")})`, RegExp(`^${t3}$`);
          }(d2).test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: "datetime", message: d2.message }), l2.dirty()) : "date" === d2.kind ? U.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: "date", message: d2.message }), l2.dirty()) : "time" === d2.kind ? RegExp(`^${$(d2)}$`).test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { code: u.invalid_string, validation: "time", message: d2.message }), l2.dirty()) : "duration" === d2.kind ? R.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "duration", code: u.invalid_string, message: d2.message }), l2.dirty()) : "ip" === d2.kind ? (t2 = e2.data, ("v4" === (r2 = d2.version) || !r2) && q.test(t2) || ("v6" === r2 || !r2) && L.test(t2) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "ip", code: u.invalid_string, message: d2.message }), l2.dirty())) : "jwt" === d2.kind ? !function(e3, t3) {
            if (!P.test(e3)) return false;
            try {
              let [r3] = e3.split(".");
              if (!r3) return false;
              let i2 = r3.replace(/-/g, "+").replace(/_/g, "/").padEnd(r3.length + (4 - r3.length % 4) % 4, "="), n3 = JSON.parse(atob(i2));
              if ("object" != typeof n3 || null === n3 || "typ" in n3 && n3?.typ !== "JWT" || !n3.alg || t3 && n3.alg !== t3) return false;
              return true;
            } catch {
              return false;
            }
          }(e2.data, d2.alg) && (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "jwt", code: u.invalid_string, message: d2.message }), l2.dirty()) : "cidr" === d2.kind ? (n2 = e2.data, ("v4" === (s2 = d2.version) || !s2) && W.test(n2) || ("v6" === s2 || !s2) && D.test(n2) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "cidr", code: u.invalid_string, message: d2.message }), l2.dirty())) : "base64" === d2.kind ? j.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "base64", code: u.invalid_string, message: d2.message }), l2.dirty()) : "base64url" === d2.kind ? B.test(e2.data) || (f(o2 = this._getOrReturnCtx(e2, o2), { validation: "base64url", code: u.invalid_string, message: d2.message }), l2.dirty()) : i.assertNever(d2);
          return { status: l2.value, value: e2.data };
        }
        _regex(e2, t2, r2) {
          return this.refinement((t3) => e2.test(t3), { validation: t2, code: u.invalid_string, ...s.errToObj(r2) });
        }
        _addCheck(e2) {
          return new Q({ ...this._def, checks: [...this._def.checks, e2] });
        }
        email(e2) {
          return this._addCheck({ kind: "email", ...s.errToObj(e2) });
        }
        url(e2) {
          return this._addCheck({ kind: "url", ...s.errToObj(e2) });
        }
        emoji(e2) {
          return this._addCheck({ kind: "emoji", ...s.errToObj(e2) });
        }
        uuid(e2) {
          return this._addCheck({ kind: "uuid", ...s.errToObj(e2) });
        }
        nanoid(e2) {
          return this._addCheck({ kind: "nanoid", ...s.errToObj(e2) });
        }
        cuid(e2) {
          return this._addCheck({ kind: "cuid", ...s.errToObj(e2) });
        }
        cuid2(e2) {
          return this._addCheck({ kind: "cuid2", ...s.errToObj(e2) });
        }
        ulid(e2) {
          return this._addCheck({ kind: "ulid", ...s.errToObj(e2) });
        }
        base64(e2) {
          return this._addCheck({ kind: "base64", ...s.errToObj(e2) });
        }
        base64url(e2) {
          return this._addCheck({ kind: "base64url", ...s.errToObj(e2) });
        }
        jwt(e2) {
          return this._addCheck({ kind: "jwt", ...s.errToObj(e2) });
        }
        ip(e2) {
          return this._addCheck({ kind: "ip", ...s.errToObj(e2) });
        }
        cidr(e2) {
          return this._addCheck({ kind: "cidr", ...s.errToObj(e2) });
        }
        datetime(e2) {
          return "string" == typeof e2 ? this._addCheck({ kind: "datetime", precision: null, offset: false, local: false, message: e2 }) : this._addCheck({ kind: "datetime", precision: void 0 === e2?.precision ? null : e2?.precision, offset: e2?.offset ?? false, local: e2?.local ?? false, ...s.errToObj(e2?.message) });
        }
        date(e2) {
          return this._addCheck({ kind: "date", message: e2 });
        }
        time(e2) {
          return "string" == typeof e2 ? this._addCheck({ kind: "time", precision: null, message: e2 }) : this._addCheck({ kind: "time", precision: void 0 === e2?.precision ? null : e2?.precision, ...s.errToObj(e2?.message) });
        }
        duration(e2) {
          return this._addCheck({ kind: "duration", ...s.errToObj(e2) });
        }
        regex(e2, t2) {
          return this._addCheck({ kind: "regex", regex: e2, ...s.errToObj(t2) });
        }
        includes(e2, t2) {
          return this._addCheck({ kind: "includes", value: e2, position: t2?.position, ...s.errToObj(t2?.message) });
        }
        startsWith(e2, t2) {
          return this._addCheck({ kind: "startsWith", value: e2, ...s.errToObj(t2) });
        }
        endsWith(e2, t2) {
          return this._addCheck({ kind: "endsWith", value: e2, ...s.errToObj(t2) });
        }
        min(e2, t2) {
          return this._addCheck({ kind: "min", value: e2, ...s.errToObj(t2) });
        }
        max(e2, t2) {
          return this._addCheck({ kind: "max", value: e2, ...s.errToObj(t2) });
        }
        length(e2, t2) {
          return this._addCheck({ kind: "length", value: e2, ...s.errToObj(t2) });
        }
        nonempty(e2) {
          return this.min(1, s.errToObj(e2));
        }
        trim() {
          return new Q({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
        }
        toLowerCase() {
          return new Q({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
        }
        toUpperCase() {
          return new Q({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
        }
        get isDatetime() {
          return !!this._def.checks.find((e2) => "datetime" === e2.kind);
        }
        get isDate() {
          return !!this._def.checks.find((e2) => "date" === e2.kind);
        }
        get isTime() {
          return !!this._def.checks.find((e2) => "time" === e2.kind);
        }
        get isDuration() {
          return !!this._def.checks.find((e2) => "duration" === e2.kind);
        }
        get isEmail() {
          return !!this._def.checks.find((e2) => "email" === e2.kind);
        }
        get isURL() {
          return !!this._def.checks.find((e2) => "url" === e2.kind);
        }
        get isEmoji() {
          return !!this._def.checks.find((e2) => "emoji" === e2.kind);
        }
        get isUUID() {
          return !!this._def.checks.find((e2) => "uuid" === e2.kind);
        }
        get isNANOID() {
          return !!this._def.checks.find((e2) => "nanoid" === e2.kind);
        }
        get isCUID() {
          return !!this._def.checks.find((e2) => "cuid" === e2.kind);
        }
        get isCUID2() {
          return !!this._def.checks.find((e2) => "cuid2" === e2.kind);
        }
        get isULID() {
          return !!this._def.checks.find((e2) => "ulid" === e2.kind);
        }
        get isIP() {
          return !!this._def.checks.find((e2) => "ip" === e2.kind);
        }
        get isCIDR() {
          return !!this._def.checks.find((e2) => "cidr" === e2.kind);
        }
        get isBase64() {
          return !!this._def.checks.find((e2) => "base64" === e2.kind);
        }
        get isBase64url() {
          return !!this._def.checks.find((e2) => "base64url" === e2.kind);
        }
        get minLength() {
          let e2 = null;
          for (let t2 of this._def.checks) "min" === t2.kind && (null === e2 || t2.value > e2) && (e2 = t2.value);
          return e2;
        }
        get maxLength() {
          let e2 = null;
          for (let t2 of this._def.checks) "max" === t2.kind && (null === e2 || t2.value < e2) && (e2 = t2.value);
          return e2;
        }
      }
      Q.create = (e2) => new Q({ checks: [], typeName: o.ZodString, coerce: e2?.coerce ?? false, ...C(e2) });
      class V extends k {
        constructor() {
          super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
        }
        _parse(e2) {
          let t2;
          if (this._def.coerce && (e2.data = Number(e2.data)), this._getType(e2) !== d.number) {
            let t3 = this._getOrReturnCtx(e2);
            return f(t3, { code: u.invalid_type, expected: d.number, received: t3.parsedType }), y;
          }
          let r2 = new m();
          for (let n2 of this._def.checks) "int" === n2.kind ? i.isInteger(e2.data) || (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.invalid_type, expected: "integer", received: "float", message: n2.message }), r2.dirty()) : "min" === n2.kind ? (n2.inclusive ? e2.data < n2.value : e2.data <= n2.value) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_small, minimum: n2.value, type: "number", inclusive: n2.inclusive, exact: false, message: n2.message }), r2.dirty()) : "max" === n2.kind ? (n2.inclusive ? e2.data > n2.value : e2.data >= n2.value) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_big, maximum: n2.value, type: "number", inclusive: n2.inclusive, exact: false, message: n2.message }), r2.dirty()) : "multipleOf" === n2.kind ? 0 !== function(e3, t3) {
            let r3 = (e3.toString().split(".")[1] || "").length, i2 = (t3.toString().split(".")[1] || "").length, n3 = r3 > i2 ? r3 : i2;
            return Number.parseInt(e3.toFixed(n3).replace(".", "")) % Number.parseInt(t3.toFixed(n3).replace(".", "")) / 10 ** n3;
          }(e2.data, n2.value) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.not_multiple_of, multipleOf: n2.value, message: n2.message }), r2.dirty()) : "finite" === n2.kind ? Number.isFinite(e2.data) || (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.not_finite, message: n2.message }), r2.dirty()) : i.assertNever(n2);
          return { status: r2.value, value: e2.data };
        }
        gte(e2, t2) {
          return this.setLimit("min", e2, true, s.toString(t2));
        }
        gt(e2, t2) {
          return this.setLimit("min", e2, false, s.toString(t2));
        }
        lte(e2, t2) {
          return this.setLimit("max", e2, true, s.toString(t2));
        }
        lt(e2, t2) {
          return this.setLimit("max", e2, false, s.toString(t2));
        }
        setLimit(e2, t2, r2, i2) {
          return new V({ ...this._def, checks: [...this._def.checks, { kind: e2, value: t2, inclusive: r2, message: s.toString(i2) }] });
        }
        _addCheck(e2) {
          return new V({ ...this._def, checks: [...this._def.checks, e2] });
        }
        int(e2) {
          return this._addCheck({ kind: "int", message: s.toString(e2) });
        }
        positive(e2) {
          return this._addCheck({ kind: "min", value: 0, inclusive: false, message: s.toString(e2) });
        }
        negative(e2) {
          return this._addCheck({ kind: "max", value: 0, inclusive: false, message: s.toString(e2) });
        }
        nonpositive(e2) {
          return this._addCheck({ kind: "max", value: 0, inclusive: true, message: s.toString(e2) });
        }
        nonnegative(e2) {
          return this._addCheck({ kind: "min", value: 0, inclusive: true, message: s.toString(e2) });
        }
        multipleOf(e2, t2) {
          return this._addCheck({ kind: "multipleOf", value: e2, message: s.toString(t2) });
        }
        finite(e2) {
          return this._addCheck({ kind: "finite", message: s.toString(e2) });
        }
        safe(e2) {
          return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: s.toString(e2) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: s.toString(e2) });
        }
        get minValue() {
          let e2 = null;
          for (let t2 of this._def.checks) "min" === t2.kind && (null === e2 || t2.value > e2) && (e2 = t2.value);
          return e2;
        }
        get maxValue() {
          let e2 = null;
          for (let t2 of this._def.checks) "max" === t2.kind && (null === e2 || t2.value < e2) && (e2 = t2.value);
          return e2;
        }
        get isInt() {
          return !!this._def.checks.find((e2) => "int" === e2.kind || "multipleOf" === e2.kind && i.isInteger(e2.value));
        }
        get isFinite() {
          let e2 = null, t2 = null;
          for (let r2 of this._def.checks) {
            if ("finite" === r2.kind || "int" === r2.kind || "multipleOf" === r2.kind) return true;
            "min" === r2.kind ? (null === t2 || r2.value > t2) && (t2 = r2.value) : "max" === r2.kind && (null === e2 || r2.value < e2) && (e2 = r2.value);
          }
          return Number.isFinite(t2) && Number.isFinite(e2);
        }
      }
      V.create = (e2) => new V({ checks: [], typeName: o.ZodNumber, coerce: e2?.coerce || false, ...C(e2) });
      class K extends k {
        constructor() {
          super(...arguments), this.min = this.gte, this.max = this.lte;
        }
        _parse(e2) {
          let t2;
          if (this._def.coerce) try {
            e2.data = BigInt(e2.data);
          } catch {
            return this._getInvalidInput(e2);
          }
          if (this._getType(e2) !== d.bigint) return this._getInvalidInput(e2);
          let r2 = new m();
          for (let n2 of this._def.checks) "min" === n2.kind ? (n2.inclusive ? e2.data < n2.value : e2.data <= n2.value) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_small, type: "bigint", minimum: n2.value, inclusive: n2.inclusive, message: n2.message }), r2.dirty()) : "max" === n2.kind ? (n2.inclusive ? e2.data > n2.value : e2.data >= n2.value) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_big, type: "bigint", maximum: n2.value, inclusive: n2.inclusive, message: n2.message }), r2.dirty()) : "multipleOf" === n2.kind ? e2.data % n2.value !== BigInt(0) && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.not_multiple_of, multipleOf: n2.value, message: n2.message }), r2.dirty()) : i.assertNever(n2);
          return { status: r2.value, value: e2.data };
        }
        _getInvalidInput(e2) {
          let t2 = this._getOrReturnCtx(e2);
          return f(t2, { code: u.invalid_type, expected: d.bigint, received: t2.parsedType }), y;
        }
        gte(e2, t2) {
          return this.setLimit("min", e2, true, s.toString(t2));
        }
        gt(e2, t2) {
          return this.setLimit("min", e2, false, s.toString(t2));
        }
        lte(e2, t2) {
          return this.setLimit("max", e2, true, s.toString(t2));
        }
        lt(e2, t2) {
          return this.setLimit("max", e2, false, s.toString(t2));
        }
        setLimit(e2, t2, r2, i2) {
          return new K({ ...this._def, checks: [...this._def.checks, { kind: e2, value: t2, inclusive: r2, message: s.toString(i2) }] });
        }
        _addCheck(e2) {
          return new K({ ...this._def, checks: [...this._def.checks, e2] });
        }
        positive(e2) {
          return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: s.toString(e2) });
        }
        negative(e2) {
          return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: s.toString(e2) });
        }
        nonpositive(e2) {
          return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: s.toString(e2) });
        }
        nonnegative(e2) {
          return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: s.toString(e2) });
        }
        multipleOf(e2, t2) {
          return this._addCheck({ kind: "multipleOf", value: e2, message: s.toString(t2) });
        }
        get minValue() {
          let e2 = null;
          for (let t2 of this._def.checks) "min" === t2.kind && (null === e2 || t2.value > e2) && (e2 = t2.value);
          return e2;
        }
        get maxValue() {
          let e2 = null;
          for (let t2 of this._def.checks) "max" === t2.kind && (null === e2 || t2.value < e2) && (e2 = t2.value);
          return e2;
        }
      }
      K.create = (e2) => new K({ checks: [], typeName: o.ZodBigInt, coerce: e2?.coerce ?? false, ...C(e2) });
      class J extends k {
        _parse(e2) {
          if (this._def.coerce && (e2.data = !!e2.data), this._getType(e2) !== d.boolean) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.boolean, received: t2.parsedType }), y;
          }
          return w(e2.data);
        }
      }
      J.create = (e2) => new J({ typeName: o.ZodBoolean, coerce: e2?.coerce || false, ...C(e2) });
      class H extends k {
        _parse(e2) {
          let t2;
          if (this._def.coerce && (e2.data = new Date(e2.data)), this._getType(e2) !== d.date) {
            let t3 = this._getOrReturnCtx(e2);
            return f(t3, { code: u.invalid_type, expected: d.date, received: t3.parsedType }), y;
          }
          if (Number.isNaN(e2.data.getTime())) return f(this._getOrReturnCtx(e2), { code: u.invalid_date }), y;
          let r2 = new m();
          for (let n2 of this._def.checks) "min" === n2.kind ? e2.data.getTime() < n2.value && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_small, message: n2.message, inclusive: true, exact: false, minimum: n2.value, type: "date" }), r2.dirty()) : "max" === n2.kind ? e2.data.getTime() > n2.value && (f(t2 = this._getOrReturnCtx(e2, t2), { code: u.too_big, message: n2.message, inclusive: true, exact: false, maximum: n2.value, type: "date" }), r2.dirty()) : i.assertNever(n2);
          return { status: r2.value, value: new Date(e2.data.getTime()) };
        }
        _addCheck(e2) {
          return new H({ ...this._def, checks: [...this._def.checks, e2] });
        }
        min(e2, t2) {
          return this._addCheck({ kind: "min", value: e2.getTime(), message: s.toString(t2) });
        }
        max(e2, t2) {
          return this._addCheck({ kind: "max", value: e2.getTime(), message: s.toString(t2) });
        }
        get minDate() {
          let e2 = null;
          for (let t2 of this._def.checks) "min" === t2.kind && (null === e2 || t2.value > e2) && (e2 = t2.value);
          return null != e2 ? new Date(e2) : null;
        }
        get maxDate() {
          let e2 = null;
          for (let t2 of this._def.checks) "max" === t2.kind && (null === e2 || t2.value < e2) && (e2 = t2.value);
          return null != e2 ? new Date(e2) : null;
        }
      }
      H.create = (e2) => new H({ checks: [], coerce: e2?.coerce || false, typeName: o.ZodDate, ...C(e2) });
      class G extends k {
        _parse(e2) {
          if (this._getType(e2) !== d.symbol) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.symbol, received: t2.parsedType }), y;
          }
          return w(e2.data);
        }
      }
      G.create = (e2) => new G({ typeName: o.ZodSymbol, ...C(e2) });
      class z extends k {
        _parse(e2) {
          if (this._getType(e2) !== d.undefined) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.undefined, received: t2.parsedType }), y;
          }
          return w(e2.data);
        }
      }
      z.create = (e2) => new z({ typeName: o.ZodUndefined, ...C(e2) });
      class Z extends k {
        _parse(e2) {
          if (this._getType(e2) !== d.null) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.null, received: t2.parsedType }), y;
          }
          return w(e2.data);
        }
      }
      Z.create = (e2) => new Z({ typeName: o.ZodNull, ...C(e2) });
      class Y extends k {
        constructor() {
          super(...arguments), this._any = true;
        }
        _parse(e2) {
          return w(e2.data);
        }
      }
      Y.create = (e2) => new Y({ typeName: o.ZodAny, ...C(e2) });
      class X extends k {
        constructor() {
          super(...arguments), this._unknown = true;
        }
        _parse(e2) {
          return w(e2.data);
        }
      }
      X.create = (e2) => new X({ typeName: o.ZodUnknown, ...C(e2) });
      class ee extends k {
        _parse(e2) {
          let t2 = this._getOrReturnCtx(e2);
          return f(t2, { code: u.invalid_type, expected: d.never, received: t2.parsedType }), y;
        }
      }
      ee.create = (e2) => new ee({ typeName: o.ZodNever, ...C(e2) });
      class et extends k {
        _parse(e2) {
          if (this._getType(e2) !== d.undefined) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.void, received: t2.parsedType }), y;
          }
          return w(e2.data);
        }
      }
      et.create = (e2) => new et({ typeName: o.ZodVoid, ...C(e2) });
      class er extends k {
        _parse(e2) {
          let { ctx: t2, status: r2 } = this._processInputParams(e2), i2 = this._def;
          if (t2.parsedType !== d.array) return f(t2, { code: u.invalid_type, expected: d.array, received: t2.parsedType }), y;
          if (null !== i2.exactLength) {
            let e3 = t2.data.length > i2.exactLength.value, n3 = t2.data.length < i2.exactLength.value;
            (e3 || n3) && (f(t2, { code: e3 ? u.too_big : u.too_small, minimum: n3 ? i2.exactLength.value : void 0, maximum: e3 ? i2.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: i2.exactLength.message }), r2.dirty());
          }
          if (null !== i2.minLength && t2.data.length < i2.minLength.value && (f(t2, { code: u.too_small, minimum: i2.minLength.value, type: "array", inclusive: true, exact: false, message: i2.minLength.message }), r2.dirty()), null !== i2.maxLength && t2.data.length > i2.maxLength.value && (f(t2, { code: u.too_big, maximum: i2.maxLength.value, type: "array", inclusive: true, exact: false, message: i2.maxLength.message }), r2.dirty()), t2.common.async) return Promise.all([...t2.data].map((e3, r3) => i2.type._parseAsync(new x(t2, e3, t2.path, r3)))).then((e3) => m.mergeArray(r2, e3));
          let n2 = [...t2.data].map((e3, r3) => i2.type._parseSync(new x(t2, e3, t2.path, r3)));
          return m.mergeArray(r2, n2);
        }
        get element() {
          return this._def.type;
        }
        min(e2, t2) {
          return new er({ ...this._def, minLength: { value: e2, message: s.toString(t2) } });
        }
        max(e2, t2) {
          return new er({ ...this._def, maxLength: { value: e2, message: s.toString(t2) } });
        }
        length(e2, t2) {
          return new er({ ...this._def, exactLength: { value: e2, message: s.toString(t2) } });
        }
        nonempty(e2) {
          return this.min(1, e2);
        }
      }
      er.create = (e2, t2) => new er({ type: e2, minLength: null, maxLength: null, exactLength: null, typeName: o.ZodArray, ...C(t2) });
      class ei extends k {
        constructor() {
          super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
        }
        _getCached() {
          if (null !== this._cached) return this._cached;
          let e2 = this._def.shape(), t2 = i.objectKeys(e2);
          return this._cached = { shape: e2, keys: t2 }, this._cached;
        }
        _parse(e2) {
          if (this._getType(e2) !== d.object) {
            let t3 = this._getOrReturnCtx(e2);
            return f(t3, { code: u.invalid_type, expected: d.object, received: t3.parsedType }), y;
          }
          let { status: t2, ctx: r2 } = this._processInputParams(e2), { shape: i2, keys: n2 } = this._getCached(), s2 = [];
          if (!(this._def.catchall instanceof ee && "strip" === this._def.unknownKeys)) for (let e3 in r2.data) n2.includes(e3) || s2.push(e3);
          let o2 = [];
          for (let e3 of n2) {
            let t3 = i2[e3], n3 = r2.data[e3];
            o2.push({ key: { status: "valid", value: e3 }, value: t3._parse(new x(r2, n3, r2.path, e3)), alwaysSet: e3 in r2.data });
          }
          if (this._def.catchall instanceof ee) {
            let e3 = this._def.unknownKeys;
            if ("passthrough" === e3) for (let e4 of s2) o2.push({ key: { status: "valid", value: e4 }, value: { status: "valid", value: r2.data[e4] } });
            else if ("strict" === e3) s2.length > 0 && (f(r2, { code: u.unrecognized_keys, keys: s2 }), t2.dirty());
            else if ("strip" === e3) ;
            else throw Error("Internal ZodObject error: invalid unknownKeys value.");
          } else {
            let e3 = this._def.catchall;
            for (let t3 of s2) {
              let i3 = r2.data[t3];
              o2.push({ key: { status: "valid", value: t3 }, value: e3._parse(new x(r2, i3, r2.path, t3)), alwaysSet: t3 in r2.data });
            }
          }
          return r2.common.async ? Promise.resolve().then(async () => {
            let e3 = [];
            for (let t3 of o2) {
              let r3 = await t3.key, i3 = await t3.value;
              e3.push({ key: r3, value: i3, alwaysSet: t3.alwaysSet });
            }
            return e3;
          }).then((e3) => m.mergeObjectSync(t2, e3)) : m.mergeObjectSync(t2, o2);
        }
        get shape() {
          return this._def.shape();
        }
        strict(e2) {
          return s.errToObj, new ei({ ...this._def, unknownKeys: "strict", ...void 0 !== e2 ? { errorMap: (t2, r2) => {
            let i2 = this._def.errorMap?.(t2, r2).message ?? r2.defaultError;
            return "unrecognized_keys" === t2.code ? { message: s.errToObj(e2).message ?? i2 } : { message: i2 };
          } } : {} });
        }
        strip() {
          return new ei({ ...this._def, unknownKeys: "strip" });
        }
        passthrough() {
          return new ei({ ...this._def, unknownKeys: "passthrough" });
        }
        extend(e2) {
          return new ei({ ...this._def, shape: () => ({ ...this._def.shape(), ...e2 }) });
        }
        merge(e2) {
          return new ei({ unknownKeys: e2._def.unknownKeys, catchall: e2._def.catchall, shape: () => ({ ...this._def.shape(), ...e2._def.shape() }), typeName: o.ZodObject });
        }
        setKey(e2, t2) {
          return this.augment({ [e2]: t2 });
        }
        catchall(e2) {
          return new ei({ ...this._def, catchall: e2 });
        }
        pick(e2) {
          let t2 = {};
          for (let r2 of i.objectKeys(e2)) e2[r2] && this.shape[r2] && (t2[r2] = this.shape[r2]);
          return new ei({ ...this._def, shape: () => t2 });
        }
        omit(e2) {
          let t2 = {};
          for (let r2 of i.objectKeys(this.shape)) e2[r2] || (t2[r2] = this.shape[r2]);
          return new ei({ ...this._def, shape: () => t2 });
        }
        deepPartial() {
          return function e2(t2) {
            if (t2 instanceof ei) {
              let r2 = {};
              for (let i2 in t2.shape) {
                let n2 = t2.shape[i2];
                r2[i2] = eb.create(e2(n2));
              }
              return new ei({ ...t2._def, shape: () => r2 });
            }
            return t2 instanceof er ? new er({ ...t2._def, type: e2(t2.element) }) : t2 instanceof eb ? eb.create(e2(t2.unwrap())) : t2 instanceof eN ? eN.create(e2(t2.unwrap())) : t2 instanceof ed ? ed.create(t2.items.map((t3) => e2(t3))) : t2;
          }(this);
        }
        partial(e2) {
          let t2 = {};
          for (let r2 of i.objectKeys(this.shape)) {
            let i2 = this.shape[r2];
            e2 && !e2[r2] ? t2[r2] = i2 : t2[r2] = i2.optional();
          }
          return new ei({ ...this._def, shape: () => t2 });
        }
        required(e2) {
          let t2 = {};
          for (let r2 of i.objectKeys(this.shape)) if (e2 && !e2[r2]) t2[r2] = this.shape[r2];
          else {
            let e3 = this.shape[r2];
            for (; e3 instanceof eb; ) e3 = e3._def.innerType;
            t2[r2] = e3;
          }
          return new ei({ ...this._def, shape: () => t2 });
        }
        keyof() {
          return em(i.objectKeys(this.shape));
        }
      }
      ei.create = (e2, t2) => new ei({ shape: () => e2, unknownKeys: "strip", catchall: ee.create(), typeName: o.ZodObject, ...C(t2) }), ei.strictCreate = (e2, t2) => new ei({ shape: () => e2, unknownKeys: "strict", catchall: ee.create(), typeName: o.ZodObject, ...C(t2) }), ei.lazycreate = (e2, t2) => new ei({ shape: e2, unknownKeys: "strip", catchall: ee.create(), typeName: o.ZodObject, ...C(t2) });
      class en extends k {
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2), r2 = this._def.options;
          if (t2.common.async) return Promise.all(r2.map(async (e3) => {
            let r3 = { ...t2, common: { ...t2.common, issues: [] }, parent: null };
            return { result: await e3._parseAsync({ data: t2.data, path: t2.path, parent: r3 }), ctx: r3 };
          })).then(function(e3) {
            for (let t3 of e3) if ("valid" === t3.result.status) return t3.result;
            for (let r4 of e3) if ("dirty" === r4.result.status) return t2.common.issues.push(...r4.ctx.common.issues), r4.result;
            let r3 = e3.map((e4) => new c(e4.ctx.common.issues));
            return f(t2, { code: u.invalid_union, unionErrors: r3 }), y;
          });
          {
            let e3;
            let i2 = [];
            for (let n3 of r2) {
              let r3 = { ...t2, common: { ...t2.common, issues: [] }, parent: null }, s2 = n3._parseSync({ data: t2.data, path: t2.path, parent: r3 });
              if ("valid" === s2.status) return s2;
              "dirty" !== s2.status || e3 || (e3 = { result: s2, ctx: r3 }), r3.common.issues.length && i2.push(r3.common.issues);
            }
            if (e3) return t2.common.issues.push(...e3.ctx.common.issues), e3.result;
            let n2 = i2.map((e4) => new c(e4));
            return f(t2, { code: u.invalid_union, unionErrors: n2 }), y;
          }
        }
        get options() {
          return this._def.options;
        }
      }
      en.create = (e2, t2) => new en({ options: e2, typeName: o.ZodUnion, ...C(t2) });
      let es = (e2) => {
        if (e2 instanceof ep) return es(e2.schema);
        if (e2 instanceof ev) return es(e2.innerType());
        if (e2 instanceof ef) return [e2.value];
        if (e2 instanceof ey) return e2.options;
        if (e2 instanceof eg) return i.objectValues(e2.enum);
        if (e2 instanceof e_) return es(e2._def.innerType);
        if (e2 instanceof z) return [void 0];
        else if (e2 instanceof Z) return [null];
        else if (e2 instanceof eb) return [void 0, ...es(e2.unwrap())];
        else if (e2 instanceof eN) return [null, ...es(e2.unwrap())];
        else if (e2 instanceof eC) return es(e2.unwrap());
        else if (e2 instanceof eE) return es(e2.unwrap());
        else if (e2 instanceof ex) return es(e2._def.innerType);
        else return [];
      };
      class eo extends k {
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2);
          if (t2.parsedType !== d.object) return f(t2, { code: u.invalid_type, expected: d.object, received: t2.parsedType }), y;
          let r2 = this.discriminator, i2 = t2.data[r2], n2 = this.optionsMap.get(i2);
          return n2 ? t2.common.async ? n2._parseAsync({ data: t2.data, path: t2.path, parent: t2 }) : n2._parseSync({ data: t2.data, path: t2.path, parent: t2 }) : (f(t2, { code: u.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [r2] }), y);
        }
        get discriminator() {
          return this._def.discriminator;
        }
        get options() {
          return this._def.options;
        }
        get optionsMap() {
          return this._def.optionsMap;
        }
        static create(e2, t2, r2) {
          let i2 = /* @__PURE__ */ new Map();
          for (let r3 of t2) {
            let t3 = es(r3.shape[e2]);
            if (!t3.length) throw Error(`A discriminator value for key \`${e2}\` could not be extracted from all schema options`);
            for (let n2 of t3) {
              if (i2.has(n2)) throw Error(`Discriminator property ${String(e2)} has duplicate value ${String(n2)}`);
              i2.set(n2, r3);
            }
          }
          return new eo({ typeName: o.ZodDiscriminatedUnion, discriminator: e2, options: t2, optionsMap: i2, ...C(r2) });
        }
      }
      class ea extends k {
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2), n2 = (e3, n3) => {
            if (v(e3) || v(n3)) return y;
            let s2 = function e4(t3, r3) {
              let n4 = l(t3), s3 = l(r3);
              if (t3 === r3) return { valid: true, data: t3 };
              if (n4 === d.object && s3 === d.object) {
                let n5 = i.objectKeys(r3), s4 = i.objectKeys(t3).filter((e5) => -1 !== n5.indexOf(e5)), o2 = { ...t3, ...r3 };
                for (let i2 of s4) {
                  let n6 = e4(t3[i2], r3[i2]);
                  if (!n6.valid) return { valid: false };
                  o2[i2] = n6.data;
                }
                return { valid: true, data: o2 };
              }
              if (n4 === d.array && s3 === d.array) {
                if (t3.length !== r3.length) return { valid: false };
                let i2 = [];
                for (let n5 = 0; n5 < t3.length; n5++) {
                  let s4 = e4(t3[n5], r3[n5]);
                  if (!s4.valid) return { valid: false };
                  i2.push(s4.data);
                }
                return { valid: true, data: i2 };
              }
              return n4 === d.date && s3 === d.date && +t3 == +r3 ? { valid: true, data: t3 } : { valid: false };
            }(e3.value, n3.value);
            return s2.valid ? ((b(e3) || b(n3)) && t2.dirty(), { status: t2.value, value: s2.data }) : (f(r2, { code: u.invalid_intersection_types }), y);
          };
          return r2.common.async ? Promise.all([this._def.left._parseAsync({ data: r2.data, path: r2.path, parent: r2 }), this._def.right._parseAsync({ data: r2.data, path: r2.path, parent: r2 })]).then(([e3, t3]) => n2(e3, t3)) : n2(this._def.left._parseSync({ data: r2.data, path: r2.path, parent: r2 }), this._def.right._parseSync({ data: r2.data, path: r2.path, parent: r2 }));
        }
      }
      ea.create = (e2, t2, r2) => new ea({ left: e2, right: t2, typeName: o.ZodIntersection, ...C(r2) });
      class ed extends k {
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2);
          if (r2.parsedType !== d.array) return f(r2, { code: u.invalid_type, expected: d.array, received: r2.parsedType }), y;
          if (r2.data.length < this._def.items.length) return f(r2, { code: u.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), y;
          !this._def.rest && r2.data.length > this._def.items.length && (f(r2, { code: u.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), t2.dirty());
          let i2 = [...r2.data].map((e3, t3) => {
            let i3 = this._def.items[t3] || this._def.rest;
            return i3 ? i3._parse(new x(r2, e3, r2.path, t3)) : null;
          }).filter((e3) => !!e3);
          return r2.common.async ? Promise.all(i2).then((e3) => m.mergeArray(t2, e3)) : m.mergeArray(t2, i2);
        }
        get items() {
          return this._def.items;
        }
        rest(e2) {
          return new ed({ ...this._def, rest: e2 });
        }
      }
      ed.create = (e2, t2) => {
        if (!Array.isArray(e2)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
        return new ed({ items: e2, typeName: o.ZodTuple, rest: null, ...C(t2) });
      };
      class el extends k {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2);
          if (r2.parsedType !== d.object) return f(r2, { code: u.invalid_type, expected: d.object, received: r2.parsedType }), y;
          let i2 = [], n2 = this._def.keyType, s2 = this._def.valueType;
          for (let e3 in r2.data) i2.push({ key: n2._parse(new x(r2, e3, r2.path, e3)), value: s2._parse(new x(r2, r2.data[e3], r2.path, e3)), alwaysSet: e3 in r2.data });
          return r2.common.async ? m.mergeObjectAsync(t2, i2) : m.mergeObjectSync(t2, i2);
        }
        get element() {
          return this._def.valueType;
        }
        static create(e2, t2, r2) {
          return new el(t2 instanceof k ? { keyType: e2, valueType: t2, typeName: o.ZodRecord, ...C(r2) } : { keyType: Q.create(), valueType: e2, typeName: o.ZodRecord, ...C(t2) });
        }
      }
      class eu extends k {
        get keySchema() {
          return this._def.keyType;
        }
        get valueSchema() {
          return this._def.valueType;
        }
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2);
          if (r2.parsedType !== d.map) return f(r2, { code: u.invalid_type, expected: d.map, received: r2.parsedType }), y;
          let i2 = this._def.keyType, n2 = this._def.valueType, s2 = [...r2.data.entries()].map(([e3, t3], s3) => ({ key: i2._parse(new x(r2, e3, r2.path, [s3, "key"])), value: n2._parse(new x(r2, t3, r2.path, [s3, "value"])) }));
          if (r2.common.async) {
            let e3 = /* @__PURE__ */ new Map();
            return Promise.resolve().then(async () => {
              for (let r3 of s2) {
                let i3 = await r3.key, n3 = await r3.value;
                if ("aborted" === i3.status || "aborted" === n3.status) return y;
                ("dirty" === i3.status || "dirty" === n3.status) && t2.dirty(), e3.set(i3.value, n3.value);
              }
              return { status: t2.value, value: e3 };
            });
          }
          {
            let e3 = /* @__PURE__ */ new Map();
            for (let r3 of s2) {
              let i3 = r3.key, n3 = r3.value;
              if ("aborted" === i3.status || "aborted" === n3.status) return y;
              ("dirty" === i3.status || "dirty" === n3.status) && t2.dirty(), e3.set(i3.value, n3.value);
            }
            return { status: t2.value, value: e3 };
          }
        }
      }
      eu.create = (e2, t2, r2) => new eu({ valueType: t2, keyType: e2, typeName: o.ZodMap, ...C(r2) });
      class ec extends k {
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2);
          if (r2.parsedType !== d.set) return f(r2, { code: u.invalid_type, expected: d.set, received: r2.parsedType }), y;
          let i2 = this._def;
          null !== i2.minSize && r2.data.size < i2.minSize.value && (f(r2, { code: u.too_small, minimum: i2.minSize.value, type: "set", inclusive: true, exact: false, message: i2.minSize.message }), t2.dirty()), null !== i2.maxSize && r2.data.size > i2.maxSize.value && (f(r2, { code: u.too_big, maximum: i2.maxSize.value, type: "set", inclusive: true, exact: false, message: i2.maxSize.message }), t2.dirty());
          let n2 = this._def.valueType;
          function s2(e3) {
            let r3 = /* @__PURE__ */ new Set();
            for (let i3 of e3) {
              if ("aborted" === i3.status) return y;
              "dirty" === i3.status && t2.dirty(), r3.add(i3.value);
            }
            return { status: t2.value, value: r3 };
          }
          let o2 = [...r2.data.values()].map((e3, t3) => n2._parse(new x(r2, e3, r2.path, t3)));
          return r2.common.async ? Promise.all(o2).then((e3) => s2(e3)) : s2(o2);
        }
        min(e2, t2) {
          return new ec({ ...this._def, minSize: { value: e2, message: s.toString(t2) } });
        }
        max(e2, t2) {
          return new ec({ ...this._def, maxSize: { value: e2, message: s.toString(t2) } });
        }
        size(e2, t2) {
          return this.min(e2, t2).max(e2, t2);
        }
        nonempty(e2) {
          return this.min(1, e2);
        }
      }
      ec.create = (e2, t2) => new ec({ valueType: e2, minSize: null, maxSize: null, typeName: o.ZodSet, ...C(t2) });
      class eh extends k {
        constructor() {
          super(...arguments), this.validate = this.implement;
        }
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2);
          if (t2.parsedType !== d.function) return f(t2, { code: u.invalid_type, expected: d.function, received: t2.parsedType }), y;
          function r2(e3, r3) {
            return p({ data: e3, path: t2.path, errorMaps: [t2.common.contextualErrorMap, t2.schemaErrorMap, h, h].filter((e4) => !!e4), issueData: { code: u.invalid_arguments, argumentsError: r3 } });
          }
          function i2(e3, r3) {
            return p({ data: e3, path: t2.path, errorMaps: [t2.common.contextualErrorMap, t2.schemaErrorMap, h, h].filter((e4) => !!e4), issueData: { code: u.invalid_return_type, returnTypeError: r3 } });
          }
          let n2 = { errorMap: t2.common.contextualErrorMap }, s2 = t2.data;
          if (this._def.returns instanceof ew) {
            let e3 = this;
            return w(async function(...t3) {
              let o2 = new c([]), a2 = await e3._def.args.parseAsync(t3, n2).catch((e4) => {
                throw o2.addIssue(r2(t3, e4)), o2;
              }), d2 = await Reflect.apply(s2, this, a2);
              return await e3._def.returns._def.type.parseAsync(d2, n2).catch((e4) => {
                throw o2.addIssue(i2(d2, e4)), o2;
              });
            });
          }
          {
            let e3 = this;
            return w(function(...t3) {
              let o2 = e3._def.args.safeParse(t3, n2);
              if (!o2.success) throw new c([r2(t3, o2.error)]);
              let a2 = Reflect.apply(s2, this, o2.data), d2 = e3._def.returns.safeParse(a2, n2);
              if (!d2.success) throw new c([i2(a2, d2.error)]);
              return d2.data;
            });
          }
        }
        parameters() {
          return this._def.args;
        }
        returnType() {
          return this._def.returns;
        }
        args(...e2) {
          return new eh({ ...this._def, args: ed.create(e2).rest(X.create()) });
        }
        returns(e2) {
          return new eh({ ...this._def, returns: e2 });
        }
        implement(e2) {
          return this.parse(e2);
        }
        strictImplement(e2) {
          return this.parse(e2);
        }
        static create(e2, t2, r2) {
          return new eh({ args: e2 || ed.create([]).rest(X.create()), returns: t2 || X.create(), typeName: o.ZodFunction, ...C(r2) });
        }
      }
      class ep extends k {
        get schema() {
          return this._def.getter();
        }
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2);
          return this._def.getter()._parse({ data: t2.data, path: t2.path, parent: t2 });
        }
      }
      ep.create = (e2, t2) => new ep({ getter: e2, typeName: o.ZodLazy, ...C(t2) });
      class ef extends k {
        _parse(e2) {
          if (e2.data !== this._def.value) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { received: t2.data, code: u.invalid_literal, expected: this._def.value }), y;
          }
          return { status: "valid", value: e2.data };
        }
        get value() {
          return this._def.value;
        }
      }
      function em(e2, t2) {
        return new ey({ values: e2, typeName: o.ZodEnum, ...C(t2) });
      }
      ef.create = (e2, t2) => new ef({ value: e2, typeName: o.ZodLiteral, ...C(t2) });
      class ey extends k {
        _parse(e2) {
          if ("string" != typeof e2.data) {
            let t2 = this._getOrReturnCtx(e2), r2 = this._def.values;
            return f(t2, { expected: i.joinValues(r2), received: t2.parsedType, code: u.invalid_type }), y;
          }
          if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e2.data)) {
            let t2 = this._getOrReturnCtx(e2), r2 = this._def.values;
            return f(t2, { received: t2.data, code: u.invalid_enum_value, options: r2 }), y;
          }
          return w(e2.data);
        }
        get options() {
          return this._def.values;
        }
        get enum() {
          let e2 = {};
          for (let t2 of this._def.values) e2[t2] = t2;
          return e2;
        }
        get Values() {
          let e2 = {};
          for (let t2 of this._def.values) e2[t2] = t2;
          return e2;
        }
        get Enum() {
          let e2 = {};
          for (let t2 of this._def.values) e2[t2] = t2;
          return e2;
        }
        extract(e2, t2 = this._def) {
          return ey.create(e2, { ...this._def, ...t2 });
        }
        exclude(e2, t2 = this._def) {
          return ey.create(this.options.filter((t3) => !e2.includes(t3)), { ...this._def, ...t2 });
        }
      }
      ey.create = em;
      class eg extends k {
        _parse(e2) {
          let t2 = i.getValidEnumValues(this._def.values), r2 = this._getOrReturnCtx(e2);
          if (r2.parsedType !== d.string && r2.parsedType !== d.number) {
            let e3 = i.objectValues(t2);
            return f(r2, { expected: i.joinValues(e3), received: r2.parsedType, code: u.invalid_type }), y;
          }
          if (this._cache || (this._cache = new Set(i.getValidEnumValues(this._def.values))), !this._cache.has(e2.data)) {
            let e3 = i.objectValues(t2);
            return f(r2, { received: r2.data, code: u.invalid_enum_value, options: e3 }), y;
          }
          return w(e2.data);
        }
        get enum() {
          return this._def.values;
        }
      }
      eg.create = (e2, t2) => new eg({ values: e2, typeName: o.ZodNativeEnum, ...C(t2) });
      class ew extends k {
        unwrap() {
          return this._def.type;
        }
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2);
          return t2.parsedType !== d.promise && false === t2.common.async ? (f(t2, { code: u.invalid_type, expected: d.promise, received: t2.parsedType }), y) : w((t2.parsedType === d.promise ? t2.data : Promise.resolve(t2.data)).then((e3) => this._def.type.parseAsync(e3, { path: t2.path, errorMap: t2.common.contextualErrorMap })));
        }
      }
      ew.create = (e2, t2) => new ew({ type: e2, typeName: o.ZodPromise, ...C(t2) });
      class ev extends k {
        innerType() {
          return this._def.schema;
        }
        sourceType() {
          return this._def.schema._def.typeName === o.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
        }
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2), n2 = this._def.effect || null, s2 = { addIssue: (e3) => {
            f(r2, e3), e3.fatal ? t2.abort() : t2.dirty();
          }, get path() {
            return r2.path;
          } };
          if (s2.addIssue = s2.addIssue.bind(s2), "preprocess" === n2.type) {
            let e3 = n2.transform(r2.data, s2);
            if (r2.common.async) return Promise.resolve(e3).then(async (e4) => {
              if ("aborted" === t2.value) return y;
              let i2 = await this._def.schema._parseAsync({ data: e4, path: r2.path, parent: r2 });
              return "aborted" === i2.status ? y : "dirty" === i2.status || "dirty" === t2.value ? g(i2.value) : i2;
            });
            {
              if ("aborted" === t2.value) return y;
              let i2 = this._def.schema._parseSync({ data: e3, path: r2.path, parent: r2 });
              return "aborted" === i2.status ? y : "dirty" === i2.status || "dirty" === t2.value ? g(i2.value) : i2;
            }
          }
          if ("refinement" === n2.type) {
            let e3 = (e4) => {
              let t3 = n2.refinement(e4, s2);
              if (r2.common.async) return Promise.resolve(t3);
              if (t3 instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
              return e4;
            };
            if (false !== r2.common.async) return this._def.schema._parseAsync({ data: r2.data, path: r2.path, parent: r2 }).then((r3) => "aborted" === r3.status ? y : ("dirty" === r3.status && t2.dirty(), e3(r3.value).then(() => ({ status: t2.value, value: r3.value }))));
            {
              let i2 = this._def.schema._parseSync({ data: r2.data, path: r2.path, parent: r2 });
              return "aborted" === i2.status ? y : ("dirty" === i2.status && t2.dirty(), e3(i2.value), { status: t2.value, value: i2.value });
            }
          }
          if ("transform" === n2.type) {
            if (false !== r2.common.async) return this._def.schema._parseAsync({ data: r2.data, path: r2.path, parent: r2 }).then((e3) => N(e3) ? Promise.resolve(n2.transform(e3.value, s2)).then((e4) => ({ status: t2.value, value: e4 })) : y);
            {
              let e3 = this._def.schema._parseSync({ data: r2.data, path: r2.path, parent: r2 });
              if (!N(e3)) return y;
              let i2 = n2.transform(e3.value, s2);
              if (i2 instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
              return { status: t2.value, value: i2 };
            }
          }
          i.assertNever(n2);
        }
      }
      ev.create = (e2, t2, r2) => new ev({ schema: e2, typeName: o.ZodEffects, effect: t2, ...C(r2) }), ev.createWithPreprocess = (e2, t2, r2) => new ev({ schema: t2, effect: { type: "preprocess", transform: e2 }, typeName: o.ZodEffects, ...C(r2) });
      class eb extends k {
        _parse(e2) {
          return this._getType(e2) === d.undefined ? w(void 0) : this._def.innerType._parse(e2);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eb.create = (e2, t2) => new eb({ innerType: e2, typeName: o.ZodOptional, ...C(t2) });
      class eN extends k {
        _parse(e2) {
          return this._getType(e2) === d.null ? w(null) : this._def.innerType._parse(e2);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eN.create = (e2, t2) => new eN({ innerType: e2, typeName: o.ZodNullable, ...C(t2) });
      class e_ extends k {
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2), r2 = t2.data;
          return t2.parsedType === d.undefined && (r2 = this._def.defaultValue()), this._def.innerType._parse({ data: r2, path: t2.path, parent: t2 });
        }
        removeDefault() {
          return this._def.innerType;
        }
      }
      e_.create = (e2, t2) => new e_({ innerType: e2, typeName: o.ZodDefault, defaultValue: "function" == typeof t2.default ? t2.default : () => t2.default, ...C(t2) });
      class ex extends k {
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2), r2 = { ...t2, common: { ...t2.common, issues: [] } }, i2 = this._def.innerType._parse({ data: r2.data, path: r2.path, parent: { ...r2 } });
          return _(i2) ? i2.then((e3) => ({ status: "valid", value: "valid" === e3.status ? e3.value : this._def.catchValue({ get error() {
            return new c(r2.common.issues);
          }, input: r2.data }) })) : { status: "valid", value: "valid" === i2.status ? i2.value : this._def.catchValue({ get error() {
            return new c(r2.common.issues);
          }, input: r2.data }) };
        }
        removeCatch() {
          return this._def.innerType;
        }
      }
      ex.create = (e2, t2) => new ex({ innerType: e2, typeName: o.ZodCatch, catchValue: "function" == typeof t2.catch ? t2.catch : () => t2.catch, ...C(t2) });
      class eS extends k {
        _parse(e2) {
          if (this._getType(e2) !== d.nan) {
            let t2 = this._getOrReturnCtx(e2);
            return f(t2, { code: u.invalid_type, expected: d.nan, received: t2.parsedType }), y;
          }
          return { status: "valid", value: e2.data };
        }
      }
      eS.create = (e2) => new eS({ typeName: o.ZodNaN, ...C(e2) }), Symbol("zod_brand");
      class eC extends k {
        _parse(e2) {
          let { ctx: t2 } = this._processInputParams(e2), r2 = t2.data;
          return this._def.type._parse({ data: r2, path: t2.path, parent: t2 });
        }
        unwrap() {
          return this._def.type;
        }
      }
      class ek extends k {
        _parse(e2) {
          let { status: t2, ctx: r2 } = this._processInputParams(e2);
          if (r2.common.async) return (async () => {
            let e3 = await this._def.in._parseAsync({ data: r2.data, path: r2.path, parent: r2 });
            return "aborted" === e3.status ? y : "dirty" === e3.status ? (t2.dirty(), g(e3.value)) : this._def.out._parseAsync({ data: e3.value, path: r2.path, parent: r2 });
          })();
          {
            let e3 = this._def.in._parseSync({ data: r2.data, path: r2.path, parent: r2 });
            return "aborted" === e3.status ? y : "dirty" === e3.status ? (t2.dirty(), { status: "dirty", value: e3.value }) : this._def.out._parseSync({ data: e3.value, path: r2.path, parent: r2 });
          }
        }
        static create(e2, t2) {
          return new ek({ in: e2, out: t2, typeName: o.ZodPipeline });
        }
      }
      class eE extends k {
        _parse(e2) {
          let t2 = this._def.innerType._parse(e2), r2 = (e3) => (N(e3) && (e3.value = Object.freeze(e3.value)), e3);
          return _(t2) ? t2.then((e3) => r2(e3)) : r2(t2);
        }
        unwrap() {
          return this._def.innerType;
        }
      }
      eE.create = (e2, t2) => new eE({ innerType: e2, typeName: o.ZodReadonly, ...C(t2) }), ei.lazycreate, function(e2) {
        e2.ZodString = "ZodString", e2.ZodNumber = "ZodNumber", e2.ZodNaN = "ZodNaN", e2.ZodBigInt = "ZodBigInt", e2.ZodBoolean = "ZodBoolean", e2.ZodDate = "ZodDate", e2.ZodSymbol = "ZodSymbol", e2.ZodUndefined = "ZodUndefined", e2.ZodNull = "ZodNull", e2.ZodAny = "ZodAny", e2.ZodUnknown = "ZodUnknown", e2.ZodNever = "ZodNever", e2.ZodVoid = "ZodVoid", e2.ZodArray = "ZodArray", e2.ZodObject = "ZodObject", e2.ZodUnion = "ZodUnion", e2.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e2.ZodIntersection = "ZodIntersection", e2.ZodTuple = "ZodTuple", e2.ZodRecord = "ZodRecord", e2.ZodMap = "ZodMap", e2.ZodSet = "ZodSet", e2.ZodFunction = "ZodFunction", e2.ZodLazy = "ZodLazy", e2.ZodLiteral = "ZodLiteral", e2.ZodEnum = "ZodEnum", e2.ZodEffects = "ZodEffects", e2.ZodNativeEnum = "ZodNativeEnum", e2.ZodOptional = "ZodOptional", e2.ZodNullable = "ZodNullable", e2.ZodDefault = "ZodDefault", e2.ZodCatch = "ZodCatch", e2.ZodPromise = "ZodPromise", e2.ZodBranded = "ZodBranded", e2.ZodPipeline = "ZodPipeline", e2.ZodReadonly = "ZodReadonly";
      }(o || (o = {}));
      let eO = Q.create;
      V.create, eS.create, K.create, J.create, H.create, G.create, z.create, Z.create, Y.create, X.create, ee.create, et.create, er.create;
      let eT = ei.create;
      ei.strictCreate, en.create, eo.create, ea.create, ed.create, el.create, eu.create, ec.create, eh.create, ep.create, ef.create;
      let eA = ey.create;
      eg.create, ew.create, ev.create, eb.create, eN.create, ev.createWithPreprocess, ek.create;
      class eI extends Error {
        constructor(...e2) {
          super(...e2), this.name = "ConfigError";
        }
      }
      let eP = eO().min(1).refine((e2) => !/^https?:\/\//i.test(e2), "must not include a scheme").refine((e2) => !e2.endsWith("/"), "must not end with a slash"), eR = eT({ NODE_ENV: eA(["development", "test", "production"]).default("development"), CF_ACCESS_TEAM_DOMAIN: eP, CF_ACCESS_AUD_WORKSPACE: eO().min(1), CF_ACCESS_AUD_PETTY_CASH: eO().min(1), CF_ACCESS_AUD_RIDER_PAYMENTS: eO().min(1), IAM_DATABASE_URL: eO().url() }), eM = function() {
        let e2 = eR.safeParse(process.env);
        if (!e2.success) {
          let [t2] = e2.error.issues, r2 = t2?.path.join(".") ?? "<unknown>", i2 = t2?.message ?? "invalid value";
          throw new eI(`Invalid environment: ${r2} \u2014 ${i2}`);
        }
        return Object.freeze(e2.data);
      }();
    }, 5829: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { _resetDbForTests: () => iD, closeDb: () => iL, getDb: () => iW, iam: () => ij });
      var i = r(6195).Buffer;
      function n(e10) {
        return void 0 === e10 || void 0 === e10;
      }
      function s(e10) {
        return "string" == typeof e10;
      }
      function o(e10) {
        return "number" == typeof e10;
      }
      function a(e10) {
        return "boolean" == typeof e10;
      }
      function d(e10) {
        return "bigint" == typeof e10;
      }
      function l(e10) {
        return "function" == typeof e10;
      }
      function u(e10) {
        return "object" == typeof e10 && null !== e10;
      }
      function c(e10) {
        return Object.freeze(e10);
      }
      function h(e10) {
        return p(e10) ? e10 : [e10];
      }
      function p(e10) {
        return Array.isArray(e10);
      }
      function f(e10) {
        return e10;
      }
      Object.prototype.toString;
      let m = c({ is: (e10) => "AlterTableNode" === e10.kind, create: (e10) => c({ kind: "AlterTableNode", table: e10 }), cloneWithTableProps: (e10, t10) => c({ ...e10, ...t10 }), cloneWithColumnAlteration: (e10, t10) => c({ ...e10, columnAlterations: e10.columnAlterations ? [...e10.columnAlterations, t10] : [t10] }) }), y = c({ is: (e10) => "IdentifierNode" === e10.kind, create: (e10) => c({ kind: "IdentifierNode", name: e10 }) }), g = c({ is: (e10) => "CreateIndexNode" === e10.kind, create: (e10) => c({ kind: "CreateIndexNode", name: y.create(e10) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }), cloneWithColumns: (e10, t10) => c({ ...e10, columns: [...e10.columns || [], ...t10] }) }), w = c({ is: (e10) => "CreateSchemaNode" === e10.kind, create: (e10, t10) => c({ kind: "CreateSchemaNode", schema: y.create(e10), ...t10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), v = ["preserve rows", "delete rows", "drop"], b = c({ is: (e10) => "CreateTableNode" === e10.kind, create: (e10) => c({ kind: "CreateTableNode", table: e10, columns: c([]) }), cloneWithColumn: (e10, t10) => c({ ...e10, columns: c([...e10.columns, t10]) }), cloneWithConstraint: (e10, t10) => c({ ...e10, constraints: e10.constraints ? c([...e10.constraints, t10]) : c([t10]) }), cloneWithFrontModifier: (e10, t10) => c({ ...e10, frontModifiers: e10.frontModifiers ? c([...e10.frontModifiers, t10]) : c([t10]) }), cloneWithEndModifier: (e10, t10) => c({ ...e10, endModifiers: e10.endModifiers ? c([...e10.endModifiers, t10]) : c([t10]) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), N = c({ is: (e10) => "SchemableIdentifierNode" === e10.kind, create: (e10) => c({ kind: "SchemableIdentifierNode", identifier: y.create(e10) }), createWithSchema: (e10, t10) => c({ kind: "SchemableIdentifierNode", schema: y.create(e10), identifier: y.create(t10) }) }), _ = c({ is: (e10) => "DropIndexNode" === e10.kind, create: (e10, t10) => c({ kind: "DropIndexNode", name: N.create(e10), ...t10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), x = c({ is: (e10) => "DropSchemaNode" === e10.kind, create: (e10, t10) => c({ kind: "DropSchemaNode", schema: y.create(e10), ...t10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), S = c({ is: (e10) => "DropTableNode" === e10.kind, create: (e10, t10) => c({ kind: "DropTableNode", table: e10, ...t10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), C = c({ is: (e10) => "AliasNode" === e10.kind, create: (e10, t10) => c({ kind: "AliasNode", node: e10, alias: t10 }) }), k = c({ is: (e10) => "TableNode" === e10.kind, create: (e10) => c({ kind: "TableNode", table: N.create(e10) }), createWithSchema: (e10, t10) => c({ kind: "TableNode", table: N.createWithSchema(e10, t10) }) });
      function E(e10) {
        return u(e10) && l(e10.toOperationNode);
      }
      let O = c({ is: (e10) => "SelectModifierNode" === e10.kind, create: (e10, t10) => c({ kind: "SelectModifierNode", modifier: e10, of: t10 }), createWithExpression: (e10) => c({ kind: "SelectModifierNode", rawModifier: e10 }) }), T = c({ is: (e10) => "AndNode" === e10.kind, create: (e10, t10) => c({ kind: "AndNode", left: e10, right: t10 }) }), A = c({ is: (e10) => "OrNode" === e10.kind, create: (e10, t10) => c({ kind: "OrNode", left: e10, right: t10 }) }), I = c({ is: (e10) => "OnNode" === e10.kind, create: (e10) => c({ kind: "OnNode", on: e10 }), cloneWithOperation: (e10, t10, r10) => c({ ...e10, on: "And" === t10 ? T.create(e10.on, r10) : A.create(e10.on, r10) }) }), P = c({ is: (e10) => "JoinNode" === e10.kind, create: (e10, t10) => c({ kind: "JoinNode", joinType: e10, table: t10, on: void 0 }), createWithOn: (e10, t10, r10) => c({ kind: "JoinNode", joinType: e10, table: t10, on: I.create(r10) }), cloneWithOn: (e10, t10) => c({ ...e10, on: e10.on ? I.cloneWithOperation(e10.on, "And", t10) : I.create(t10) }) }), R = c({ is: (e10) => "BinaryOperationNode" === e10.kind, create: (e10, t10, r10) => c({ kind: "BinaryOperationNode", leftOperand: e10, operator: t10, rightOperand: r10 }) }), M = ["->", "->>"], q = ["=", "==", "!=", "<>", ">", ">=", "<", "<=", "in", "not in", "is", "is not", "like", "not like", "match", "ilike", "not ilike", "@>", "<@", "^@", "&&", "?", "?&", "?|", "!<", "!>", "<=>", "!~", "~", "~*", "!~*", "@@", "@@@", "!!", "<->", "regexp", "is distinct from", "is not distinct from", "+", "-", "*", "/", "%", "^", "&", "|", "#", "<<", ">>", "&&", "||", ...M, "not", "-", "exists", "not exists", "between", "between symmetric"], W = c({ is: (e10) => "OperatorNode" === e10.kind, create: (e10) => c({ kind: "OperatorNode", operator: e10 }) });
      function L(e10) {
        return s(e10) && M.includes(e10);
      }
      let D = c({ is: (e10) => "ColumnNode" === e10.kind, create: (e10) => c({ kind: "ColumnNode", column: y.create(e10) }) }), j = c({ is: (e10) => "SelectAllNode" === e10.kind, create: () => c({ kind: "SelectAllNode" }) }), B = c({ is: (e10) => "ReferenceNode" === e10.kind, create: (e10, t10) => c({ kind: "ReferenceNode", table: t10, column: e10 }), createSelectAll: (e10) => c({ kind: "ReferenceNode", table: e10, column: j.create() }) });
      class F {
        #e;
        get dynamicReference() {
          return this.#e;
        }
        get refType() {
        }
        constructor(e10) {
          this.#e = e10;
        }
        toOperationNode() {
          return Y(this.#e);
        }
      }
      function U(e10) {
        return u(e10) && E(e10) && s(e10.dynamicReference);
      }
      let $ = c({ is: (e10) => "OrderByItemNode" === e10.kind, create: (e10, t10) => c({ kind: "OrderByItemNode", orderBy: e10, direction: t10 }) }), Q = c({ is: (e10) => "RawNode" === e10.kind, create: (e10, t10) => c({ kind: "RawNode", sqlFragments: c(e10), parameters: c(t10) }), createWithSql: (e10) => Q.create([e10], []), createWithChild: (e10) => Q.create(["", ""], [e10]), createWithChildren: (e10) => Q.create(Array(e10.length + 1).fill(""), e10) });
      function V(e10) {
        return "asc" === e10 || "desc" === e10;
      }
      function K(e10) {
        if (2 === e10.length) return [J(e10[0], e10[1])];
        if (1 === e10.length) {
          let [t10] = e10;
          return Array.isArray(t10) ? t10.map((e11) => J(e11)) : [J(t10)];
        }
        throw Error(`Invalid number of arguments at order by! expected 1-2, received ${e10.length}`);
      }
      function J(e10, t10) {
        let r10 = function(e11) {
          if (rs(e11)) return ri(e11);
          if (U(e11)) return e11.toOperationNode();
          let [t11, r11] = e11.split(" ");
          if (r11) {
            if (!V(r11)) throw Error(`Invalid order by direction: ${r11}`);
            return $.create(et(t11), H(r11));
          }
          return et(e11);
        }(e10);
        if ($.is(r10)) {
          if (t10) throw Error("Cannot specify direction twice!");
          return r10;
        }
        return $.create(r10, H(t10));
      }
      function H(e10) {
        return e10 ? "asc" === e10 || "desc" === e10 ? Q.createWithSql(e10) : e10.toOperationNode() : void 0;
      }
      let G = c({ is: (e10) => "JSONReferenceNode" === e10.kind, create: (e10, t10) => c({ kind: "JSONReferenceNode", reference: e10, traversal: t10 }), cloneWithTraversal: (e10, t10) => c({ ...e10, traversal: t10 }) }), z = c({ is: (e10) => "JSONOperatorChainNode" === e10.kind, create: (e10) => c({ kind: "JSONOperatorChainNode", operator: e10, values: c([]) }), cloneWithValue: (e10, t10) => c({ ...e10, values: c([...e10.values, t10]) }) }), Z = c({ is: (e10) => "JSONPathNode" === e10.kind, create: (e10) => c({ kind: "JSONPathNode", inOperator: e10, pathLegs: c([]) }), cloneWithLeg: (e10, t10) => c({ ...e10, pathLegs: c([...e10.pathLegs, t10]) }) });
      function Y(e10) {
        return s(e10) ? et(e10) : e10.toOperationNode();
      }
      function X(e10) {
        return p(e10) ? e10.map((e11) => ee(e11)) : [ee(e10)];
      }
      function ee(e10) {
        return rs(e10) ? ri(e10) : Y(e10);
      }
      function et(e10) {
        if (!e10.includes(".")) return B.create(D.create(e10));
        let t10 = e10.split(".").map(en);
        if (3 === t10.length) return function(e11) {
          let [t11, r10, i2] = e11;
          return B.create(D.create(i2), k.createWithSchema(t11, r10));
        }(t10);
        if (2 === t10.length) return function(e11) {
          let [t11, r10] = e11;
          return B.create(D.create(r10), k.create(t11));
        }(t10);
        throw Error(`invalid column reference ${e10}`);
      }
      function er(e10) {
        return D.create(e10);
      }
      function ei(e10) {
        if (!e10.includes(" ")) return er(e10);
        {
          let [t10, r10] = e10.split(" ").map(en);
          if (!V(r10)) throw Error(`invalid order direction "${r10}" next to "${t10}"`);
          return K([t10, r10])[0];
        }
      }
      function en(e10) {
        return e10.trim();
      }
      let es = c({ is: (e10) => "PrimitiveValueListNode" === e10.kind, create: (e10) => c({ kind: "PrimitiveValueListNode", values: c([...e10]) }) }), eo = c({ is: (e10) => "ValueListNode" === e10.kind, create: (e10) => c({ kind: "ValueListNode", values: c(e10) }) }), ea = c({ is: (e10) => "ValueNode" === e10.kind, create: (e10) => c({ kind: "ValueNode", value: e10 }), createImmediate: (e10) => c({ kind: "ValueNode", value: e10, immediate: true }) });
      function ed(e10) {
        return rs(e10) ? ri(e10) : ea.create(e10);
      }
      function el(e10) {
        return o(e10) || a(e10) || null === e10;
      }
      function eu(e10) {
        if (!el(e10)) throw Error(`unsafe immediate value ${JSON.stringify(e10)}`);
        return ea.createImmediate(e10);
      }
      let ec = c({ is: (e10) => "ParensNode" === e10.kind, create: (e10) => c({ kind: "ParensNode", node: e10 }) });
      function eh(e10) {
        if (3 === e10.length) return ep(e10[0], e10[1], e10[2]);
        if (1 === e10.length) return ed(e10[0]);
        throw Error(`invalid arguments: ${JSON.stringify(e10)}`);
      }
      function ep(e10, t10, r10) {
        return ("is" === t10 || "is not" === t10) && eg(r10) ? R.create(ee(e10), ew(t10), ea.createImmediate(r10)) : R.create(ee(e10), ew(t10), p(r10) ? r10.some(rs) ? eo.create(r10.map((e11) => ed(e11))) : es.create(r10) : ed(r10));
      }
      function ef(e10, t10, r10) {
        return R.create(ee(e10), ew(t10), ee(r10));
      }
      function em(e10, t10) {
        return ey(Object.entries(e10).filter(([, e11]) => !n(e11)).map(([e11, t11]) => ep(e11, eg(t11) ? "is" : "=", t11)), t10);
      }
      function ey(e10, t10, r10 = true) {
        let i2 = "and" === t10 ? T.create : A.create;
        if (0 === e10.length) return R.create(ea.createImmediate(1), W.create("="), ea.createImmediate("and" === t10 ? 1 : 0));
        let n2 = ev(e10[0]);
        for (let t11 = 1; t11 < e10.length; ++t11) n2 = i2(n2, ev(e10[t11]));
        return e10.length > 1 && r10 ? ec.create(n2) : n2;
      }
      function eg(e10) {
        return null === e10 || a(e10);
      }
      function ew(e10) {
        if (s(e10) && q.includes(e10)) return W.create(e10);
        if (E(e10)) return e10.toOperationNode();
        throw Error(`invalid operator ${JSON.stringify(e10)}`);
      }
      function ev(e10) {
        return E(e10) ? e10.toOperationNode() : e10;
      }
      let eb = c({ is: (e10) => "OrderByNode" === e10.kind, create: (e10) => c({ kind: "OrderByNode", items: c([...e10]) }), cloneWithItems: (e10, t10) => c({ ...e10, items: c([...e10.items, ...t10]) }) }), eN = c({ is: (e10) => "PartitionByNode" === e10.kind, create: (e10) => c({ kind: "PartitionByNode", items: c(e10) }), cloneWithItems: (e10, t10) => c({ ...e10, items: c([...e10.items, ...t10]) }) }), e_ = c({ is: (e10) => "OverNode" === e10.kind, create: () => c({ kind: "OverNode" }), cloneWithOrderByItems: (e10, t10) => c({ ...e10, orderBy: e10.orderBy ? eb.cloneWithItems(e10.orderBy, t10) : eb.create(t10) }), cloneWithPartitionByItems: (e10, t10) => c({ ...e10, partitionBy: e10.partitionBy ? eN.cloneWithItems(e10.partitionBy, t10) : eN.create(t10) }) });
      function ex(e10, t10) {
        Object.defineProperties(e10.prototype, { then: { enumerable: false, value: () => {
          throw Error(t10);
        } } });
      }
      class eS {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        on(...e10) {
          return new eS({ ...this.#t, joinNode: P.cloneWithOn(this.#t.joinNode, eh(e10)) });
        }
        onRef(e10, t10, r10) {
          return new eS({ ...this.#t, joinNode: P.cloneWithOn(this.#t.joinNode, ef(e10, t10, r10)) });
        }
        onTrue() {
          return new eS({ ...this.#t, joinNode: P.cloneWithOn(this.#t.joinNode, Q.createWithSql("true")) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.joinNode;
        }
      }
      ex(eS, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");
      let eC = c({ is: (e10) => "PartitionByItemNode" === e10.kind, create: (e10) => c({ kind: "PartitionByItemNode", partitionBy: e10 }) });
      class ek {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        orderBy(e10, t10) {
          return new ek({ overNode: e_.cloneWithOrderByItems(this.#t.overNode, K([e10, t10])) });
        }
        partitionBy(e10) {
          return new ek({ overNode: e_.cloneWithPartitionByItems(this.#t.overNode, X(e10).map(eC.create)) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.overNode;
        }
      }
      ex(ek, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");
      let eE = c({ is: (e10) => "SelectionNode" === e10.kind, create: (e10) => c({ kind: "SelectionNode", selection: e10 }), createSelectAll: () => c({ kind: "SelectionNode", selection: j.create() }), createSelectAllFromTable: (e10) => c({ kind: "SelectionNode", selection: B.createSelectAll(e10) }) });
      function eO(e10) {
        return l(e10) ? eO(e10(rr())) : p(e10) ? e10.map((e11) => eT(e11)) : [eT(e10)];
      }
      function eT(e10) {
        return s(e10) ? eE.create(function(e11) {
          let t10 = " as ";
          if (!e11.includes(t10)) return et(e11);
          {
            let [r10, i2] = e11.split(t10).map(en);
            return C.create(et(r10), y.create(i2));
          }
        }(e10)) : U(e10) ? eE.create(e10.toOperationNode()) : eE.create(rn(e10));
      }
      function eA(e10) {
        return e10 ? Array.isArray(e10) ? e10.map(eI) : [eI(e10)] : [eE.createSelectAll()];
      }
      function eI(e10) {
        if (s(e10)) return eE.createSelectAllFromTable(rl(e10));
        throw Error(`invalid value selectAll expression: ${JSON.stringify(e10)}`);
      }
      let eP = c({ is: (e10) => "ValuesNode" === e10.kind, create: (e10) => c({ kind: "ValuesNode", values: c(e10) }) }), eR = c({ is: (e10) => "DefaultInsertValueNode" === e10.kind, create: () => c({ kind: "DefaultInsertValueNode" }) });
      function eM(e10) {
        let t10 = l(e10) ? e10(rr()) : e10;
        return function(e11) {
          let t11 = function(e12) {
            let t12 = /* @__PURE__ */ new Map();
            for (let r10 of e12) for (let e13 of Object.keys(r10)) t12.has(e13) || void 0 === r10[e13] || t12.set(e13, t12.size);
            return t12;
          }(e11);
          return [c([...t11.keys()].map(D.create)), eP.create(e11.map((e12) => function(e13, t12) {
            let r10 = Object.keys(e13), i2 = Array.from({ length: t12.size }), s2 = false, o2 = r10.length;
            for (let a2 of r10) {
              let r11 = t12.get(a2);
              if (n(r11)) {
                o2--;
                continue;
              }
              let d2 = e13[a2];
              (n(d2) || rs(d2)) && (s2 = true), i2[r11] = d2;
            }
            if (o2 < t12.size || s2) {
              let e14 = eR.create();
              return eo.create(i2.map((t13) => n(t13) ? e14 : ed(t13)));
            }
            return es.create(i2);
          }(e12, t11)))];
        }(p(t10) ? t10 : c([t10]));
      }
      let eq = c({ is: (e10) => "InsertQueryNode" === e10.kind, create: (e10, t10, r10) => c({ kind: "InsertQueryNode", into: e10, ...t10 && { with: t10 }, replace: r10 }), createWithoutInto: () => c({ kind: "InsertQueryNode" }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), eW = c({ is: (e10) => "FromNode" === e10.kind, create: (e10) => c({ kind: "FromNode", froms: c(e10) }), cloneWithFroms: (e10, t10) => c({ ...e10, froms: c([...e10.froms, ...t10]) }) }), eL = c({ is: (e10) => "GroupByNode" === e10.kind, create: (e10) => c({ kind: "GroupByNode", items: c(e10) }), cloneWithItems: (e10, t10) => c({ ...e10, items: c([...e10.items, ...t10]) }) }), eD = c({ is: (e10) => "HavingNode" === e10.kind, create: (e10) => c({ kind: "HavingNode", having: e10 }), cloneWithOperation: (e10, t10, r10) => c({ ...e10, having: "And" === t10 ? T.create(e10.having, r10) : A.create(e10.having, r10) }) }), ej = c({ is: (e10) => "SelectQueryNode" === e10.kind, create: (e10) => c({ kind: "SelectQueryNode", ...e10 && { with: e10 } }), createFrom: (e10, t10) => c({ kind: "SelectQueryNode", from: eW.create(e10), ...t10 && { with: t10 } }), cloneWithSelections: (e10, t10) => c({ ...e10, selections: e10.selections ? c([...e10.selections, ...t10]) : c(t10) }), cloneWithDistinctOn: (e10, t10) => c({ ...e10, distinctOn: e10.distinctOn ? c([...e10.distinctOn, ...t10]) : c(t10) }), cloneWithFrontModifier: (e10, t10) => c({ ...e10, frontModifiers: e10.frontModifiers ? c([...e10.frontModifiers, t10]) : c([t10]) }), cloneWithOrderByItems: (e10, t10) => c({ ...e10, orderBy: e10.orderBy ? eb.cloneWithItems(e10.orderBy, t10) : eb.create(t10) }), cloneWithGroupByItems: (e10, t10) => c({ ...e10, groupBy: e10.groupBy ? eL.cloneWithItems(e10.groupBy, t10) : eL.create(t10) }), cloneWithLimit: (e10, t10) => c({ ...e10, limit: t10 }), cloneWithOffset: (e10, t10) => c({ ...e10, offset: t10 }), cloneWithFetch: (e10, t10) => c({ ...e10, fetch: t10 }), cloneWithHaving: (e10, t10) => c({ ...e10, having: e10.having ? eD.cloneWithOperation(e10.having, "And", t10) : eD.create(t10) }), cloneWithSetOperations: (e10, t10) => c({ ...e10, setOperations: e10.setOperations ? c([...e10.setOperations, ...t10]) : c([...t10]) }), cloneWithoutSelections: (e10) => c({ ...e10, selections: [] }), cloneWithoutLimit: (e10) => c({ ...e10, limit: void 0 }), cloneWithoutOffset: (e10) => c({ ...e10, offset: void 0 }), cloneWithoutOrderBy: (e10) => c({ ...e10, orderBy: void 0 }), cloneWithoutGroupBy: (e10) => c({ ...e10, groupBy: void 0 }) }), eB = c({ is: (e10) => "UpdateQueryNode" === e10.kind, create: (e10, t10) => c({ kind: "UpdateQueryNode", table: e10, ...t10 && { with: t10 } }), createWithoutTable: () => c({ kind: "UpdateQueryNode" }), cloneWithFromItems: (e10, t10) => c({ ...e10, from: e10.from ? eW.cloneWithFroms(e10.from, t10) : eW.create(t10) }), cloneWithUpdates: (e10, t10) => c({ ...e10, updates: e10.updates ? c([...e10.updates, ...t10]) : t10 }), cloneWithLimit: (e10, t10) => c({ ...e10, limit: t10 }) }), eF = c({ is: (e10) => "UsingNode" === e10.kind, create: (e10) => c({ kind: "UsingNode", tables: c(e10) }), cloneWithTables: (e10, t10) => c({ ...e10, tables: c([...e10.tables, ...t10]) }) }), eU = c({ is: (e10) => "DeleteQueryNode" === e10.kind, create: (e10, t10) => c({ kind: "DeleteQueryNode", from: eW.create(e10), ...t10 && { with: t10 } }), cloneWithOrderByItems: (e10, t10) => c({ ...e10, orderBy: e10.orderBy ? eb.cloneWithItems(e10.orderBy, t10) : eb.create(t10) }), cloneWithoutOrderBy: (e10) => c({ ...e10, orderBy: void 0 }), cloneWithLimit: (e10, t10) => c({ ...e10, limit: t10 }), cloneWithoutLimit: (e10) => c({ ...e10, limit: void 0 }), cloneWithUsing: (e10, t10) => c({ ...e10, using: void 0 !== e10.using ? eF.cloneWithTables(e10.using, t10) : eF.create(t10) }) }), e$ = c({ is: (e10) => "WhereNode" === e10.kind, create: (e10) => c({ kind: "WhereNode", where: e10 }), cloneWithOperation: (e10, t10, r10) => c({ ...e10, where: "And" === t10 ? T.create(e10.where, r10) : A.create(e10.where, r10) }) }), eQ = c({ is: (e10) => "ReturningNode" === e10.kind, create: (e10) => c({ kind: "ReturningNode", selections: c(e10) }), cloneWithSelections: (e10, t10) => c({ ...e10, selections: e10.selections ? c([...e10.selections, ...t10]) : c(t10) }) }), eV = c({ is: (e10) => "ExplainNode" === e10.kind, create: (e10, t10) => c({ kind: "ExplainNode", format: e10, options: t10 }) }), eK = c({ is: (e10) => "WhenNode" === e10.kind, create: (e10) => c({ kind: "WhenNode", condition: e10 }), cloneWithResult: (e10, t10) => c({ ...e10, result: t10 }) }), eJ = c({ is: (e10) => "MergeQueryNode" === e10.kind, create: (e10, t10) => c({ kind: "MergeQueryNode", into: e10, ...t10 && { with: t10 } }), cloneWithUsing: (e10, t10) => c({ ...e10, using: t10 }), cloneWithWhen: (e10, t10) => c({ ...e10, whens: e10.whens ? c([...e10.whens, t10]) : c([t10]) }), cloneWithThen: (e10, t10) => c({ ...e10, whens: e10.whens ? c([...e10.whens.slice(0, -1), eK.cloneWithResult(e10.whens[e10.whens.length - 1], t10)]) : void 0 }) }), eH = c({ is: (e10) => "OutputNode" === e10.kind, create: (e10) => c({ kind: "OutputNode", selections: c(e10) }), cloneWithSelections: (e10, t10) => c({ ...e10, selections: e10.selections ? c([...e10.selections, ...t10]) : c(t10) }) }), eG = c({ is: (e10) => ej.is(e10) || eq.is(e10) || eB.is(e10) || eU.is(e10) || eJ.is(e10), cloneWithEndModifier: (e10, t10) => c({ ...e10, endModifiers: e10.endModifiers ? c([...e10.endModifiers, t10]) : c([t10]) }), cloneWithWhere: (e10, t10) => c({ ...e10, where: e10.where ? e$.cloneWithOperation(e10.where, "And", t10) : e$.create(t10) }), cloneWithJoin: (e10, t10) => c({ ...e10, joins: e10.joins ? c([...e10.joins, t10]) : c([t10]) }), cloneWithReturning: (e10, t10) => c({ ...e10, returning: e10.returning ? eQ.cloneWithSelections(e10.returning, t10) : eQ.create(t10) }), cloneWithoutReturning: (e10) => c({ ...e10, returning: void 0 }), cloneWithoutWhere: (e10) => c({ ...e10, where: void 0 }), cloneWithExplain: (e10, t10, r10) => c({ ...e10, explain: eV.create(t10, r10?.toOperationNode()) }), cloneWithTop: (e10, t10) => c({ ...e10, top: t10 }), cloneWithOutput: (e10, t10) => c({ ...e10, output: e10.output ? eH.cloneWithSelections(e10.output, t10) : eH.create(t10) }) }), ez = c({ is: (e10) => "ColumnUpdateNode" === e10.kind, create: (e10, t10) => c({ kind: "ColumnUpdateNode", column: e10, value: t10 }) });
      function eZ(e10) {
        return Object.entries(l(e10) ? e10(rr()) : e10).filter(([e11, t10]) => void 0 !== t10).map(([e11, t10]) => ez.create(D.create(e11), ed(t10)));
      }
      let eY = c({ is: (e10) => "OnDuplicateKeyNode" === e10.kind, create: (e10) => c({ kind: "OnDuplicateKeyNode", updates: e10 }) });
      class eX {
        insertId;
        numInsertedOrUpdatedRows;
        constructor(e10, t10) {
          this.insertId = e10, this.numInsertedOrUpdatedRows = t10;
        }
      }
      class e0 extends Error {
        node;
        constructor(e10) {
          super("no result"), this.node = e10;
        }
      }
      function e1(e10) {
        return Object.prototype.hasOwnProperty.call(e10, "prototype");
      }
      let e2 = c({ is: (e10) => "OnConflictNode" === e10.kind, create: () => c({ kind: "OnConflictNode" }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }), cloneWithIndexWhere: (e10, t10) => c({ ...e10, indexWhere: e10.indexWhere ? e$.cloneWithOperation(e10.indexWhere, "And", t10) : e$.create(t10) }), cloneWithIndexOrWhere: (e10, t10) => c({ ...e10, indexWhere: e10.indexWhere ? e$.cloneWithOperation(e10.indexWhere, "Or", t10) : e$.create(t10) }), cloneWithUpdateWhere: (e10, t10) => c({ ...e10, updateWhere: e10.updateWhere ? e$.cloneWithOperation(e10.updateWhere, "And", t10) : e$.create(t10) }), cloneWithUpdateOrWhere: (e10, t10) => c({ ...e10, updateWhere: e10.updateWhere ? e$.cloneWithOperation(e10.updateWhere, "Or", t10) : e$.create(t10) }), cloneWithoutIndexWhere: (e10) => c({ ...e10, indexWhere: void 0 }), cloneWithoutUpdateWhere: (e10) => c({ ...e10, updateWhere: void 0 }) });
      class e4 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        column(e10) {
          let t10 = D.create(e10);
          return new e4({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { columns: this.#t.onConflictNode.columns ? c([...this.#t.onConflictNode.columns, t10]) : c([t10]) }) });
        }
        columns(e10) {
          let t10 = e10.map(D.create);
          return new e4({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { columns: this.#t.onConflictNode.columns ? c([...this.#t.onConflictNode.columns, ...t10]) : c(t10) }) });
        }
        constraint(e10) {
          return new e4({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { constraint: y.create(e10) }) });
        }
        expression(e10) {
          return new e4({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { indexExpression: e10.toOperationNode() }) });
        }
        where(...e10) {
          return new e4({ ...this.#t, onConflictNode: e2.cloneWithIndexWhere(this.#t.onConflictNode, eh(e10)) });
        }
        whereRef(e10, t10, r10) {
          return new e4({ ...this.#t, onConflictNode: e2.cloneWithIndexWhere(this.#t.onConflictNode, ef(e10, t10, r10)) });
        }
        clearWhere() {
          return new e4({ ...this.#t, onConflictNode: e2.cloneWithoutIndexWhere(this.#t.onConflictNode) });
        }
        doNothing() {
          return new e6({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { doNothing: true }) });
        }
        doUpdateSet(e10) {
          return new e3({ ...this.#t, onConflictNode: e2.cloneWith(this.#t.onConflictNode, { updates: eZ(e10) }) });
        }
        $call(e10) {
          return e10(this);
        }
      }
      ex(e4, "don't await OnConflictBuilder instances.");
      class e6 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        toOperationNode() {
          return this.#t.onConflictNode;
        }
      }
      ex(e6, "don't await OnConflictDoNothingBuilder instances.");
      class e3 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        where(...e10) {
          return new e3({ ...this.#t, onConflictNode: e2.cloneWithUpdateWhere(this.#t.onConflictNode, eh(e10)) });
        }
        whereRef(e10, t10, r10) {
          return new e3({ ...this.#t, onConflictNode: e2.cloneWithUpdateWhere(this.#t.onConflictNode, ef(e10, t10, r10)) });
        }
        clearWhere() {
          return new e3({ ...this.#t, onConflictNode: e2.cloneWithoutUpdateWhere(this.#t.onConflictNode) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.onConflictNode;
        }
      }
      ex(e3, "don't await OnConflictUpdateBuilder instances.");
      let e5 = c({ is: (e10) => "TopNode" === e10.kind, create: (e10, t10) => c({ kind: "TopNode", expression: e10, modifiers: t10 }) });
      function e9(e10, t10) {
        if (!o(e10) && !d(e10)) throw Error(`Invalid top expression: ${e10}`);
        if (!n(t10) && !("percent" === t10 || "with ties" === t10 || "percent with ties" === t10)) throw Error(`Invalid top modifiers: ${t10}`);
        return e5.create(e10, t10);
      }
      class e8 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        values(e10) {
          let [t10, r10] = eM(e10);
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { columns: t10, values: r10 }) });
        }
        columns(e10) {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { columns: c(e10.map(D.create)) }) });
        }
        expression(e10) {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { values: ri(e10) }) });
        }
        defaultValues() {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { defaultValues: true }) });
        }
        modifyEnd(e10) {
          return new e8({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, e10.toOperationNode()) });
        }
        ignore() {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { ignore: true }) });
        }
        top(e10, t10) {
          return new e8({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        onConflict(e10) {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { onConflict: e10(new e4({ onConflictNode: e2.create() })).toOperationNode() }) });
        }
        onDuplicateKeyUpdate(e10) {
          return new e8({ ...this.#t, queryNode: eq.cloneWith(this.#t.queryNode, { onDuplicateKey: eY.create(eZ(e10)) }) });
        }
        returning(e10) {
          return new e8({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eO(e10)) });
        }
        returningAll() {
          return new e8({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eA()) });
        }
        output(e10) {
          return new e8({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eO(e10)) });
        }
        outputAll(e10) {
          return new e8({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eA(e10)) });
        }
        clearReturning() {
          return new e8({ ...this.#t, queryNode: eG.cloneWithoutReturning(this.#t.queryNode) });
        }
        $call(e10) {
          return e10(this);
        }
        $if(e10, t10) {
          return e10 ? t10(this) : new e8({ ...this.#t });
        }
        $castTo() {
          return new e8(this.#t);
        }
        $narrowType() {
          return new e8(this.#t);
        }
        $assertType() {
          return new e8(this.#t);
        }
        withPlugin(e10) {
          return new e8({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.queryNode, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          let e10 = this.compile(), t10 = await this.#t.executor.executeQuery(e10, this.#t.queryId), { adapter: r10 } = this.#t.executor, i2 = e10.query;
          return i2.returning && r10.supportsReturning || i2.output && r10.supportsOutput ? t10.rows : [new eX(t10.insertId, t10.numAffectedRows ?? t10.numUpdatedOrDeletedRows)];
        }
        async executeTakeFirst() {
          let [e10] = await this.execute();
          return e10;
        }
        async executeTakeFirstOrThrow(e10 = e0) {
          let t10 = await this.executeTakeFirst();
          if (void 0 === t10) throw e1(e10) ? new e10(this.toOperationNode()) : e10(this.toOperationNode());
          return t10;
        }
        async *stream(e10 = 100) {
          let t10 = this.compile();
          for await (let r10 of this.#t.executor.stream(t10, e10, this.#t.queryId)) yield* r10.rows;
        }
        async explain(e10, t10) {
          let r10 = new e8({ ...this.#t, queryNode: eG.cloneWithExplain(this.#t.queryNode, e10, t10) });
          return await r10.execute();
        }
      }
      ex(e8, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
      class e7 {
        numDeletedRows;
        constructor(e10) {
          this.numDeletedRows = e10;
        }
      }
      let te = c({ is: (e10) => "LimitNode" === e10.kind, create: (e10) => c({ kind: "LimitNode", limit: e10 }) });
      class tt {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        where(...e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, eh(e10)) });
        }
        whereRef(e10, t10, r10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, ef(e10, t10, r10)) });
        }
        clearWhere() {
          return new tt({ ...this.#t, queryNode: eG.cloneWithoutWhere(this.#t.queryNode) });
        }
        top(e10, t10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        using(e10) {
          return new tt({ ...this.#t, queryNode: eU.cloneWithUsing(this.#t.queryNode, ro(e10)) });
        }
        innerJoin(...e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("InnerJoin", e10)) });
        }
        leftJoin(...e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("LeftJoin", e10)) });
        }
        rightJoin(...e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("RightJoin", e10)) });
        }
        fullJoin(...e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("FullJoin", e10)) });
        }
        returning(e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eO(e10)) });
        }
        returningAll(e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eA(e10)) });
        }
        output(e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eO(e10)) });
        }
        outputAll(e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eA(e10)) });
        }
        clearReturning() {
          return new tt({ ...this.#t, queryNode: eG.cloneWithoutReturning(this.#t.queryNode) });
        }
        clearLimit() {
          return new tt({ ...this.#t, queryNode: eU.cloneWithoutLimit(this.#t.queryNode) });
        }
        clearOrderBy() {
          return new tt({ ...this.#t, queryNode: eU.cloneWithoutOrderBy(this.#t.queryNode) });
        }
        orderBy(e10, t10) {
          return new tt({ ...this.#t, queryNode: eU.cloneWithOrderByItems(this.#t.queryNode, K([e10, t10])) });
        }
        limit(e10) {
          return new tt({ ...this.#t, queryNode: eU.cloneWithLimit(this.#t.queryNode, te.create(ed(e10))) });
        }
        modifyEnd(e10) {
          return new tt({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, e10.toOperationNode()) });
        }
        $call(e10) {
          return e10(this);
        }
        $if(e10, t10) {
          return e10 ? t10(this) : new tt({ ...this.#t });
        }
        $castTo() {
          return new tt(this.#t);
        }
        $narrowType() {
          return new tt(this.#t);
        }
        $assertType() {
          return new tt(this.#t);
        }
        withPlugin(e10) {
          return new tt({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.queryNode, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          let e10 = this.compile(), t10 = await this.#t.executor.executeQuery(e10, this.#t.queryId), { adapter: r10 } = this.#t.executor, i2 = e10.query;
          return i2.returning && r10.supportsReturning || i2.output && r10.supportsOutput ? t10.rows : [new e7(t10.numAffectedRows ?? t10.numUpdatedOrDeletedRows ?? BigInt(0))];
        }
        async executeTakeFirst() {
          let [e10] = await this.execute();
          return e10;
        }
        async executeTakeFirstOrThrow(e10 = e0) {
          let t10 = await this.executeTakeFirst();
          if (void 0 === t10) throw e1(e10) ? new e10(this.toOperationNode()) : e10(this.toOperationNode());
          return t10;
        }
        async *stream(e10 = 100) {
          let t10 = this.compile();
          for await (let r10 of this.#t.executor.stream(t10, e10, this.#t.queryId)) yield* r10.rows;
        }
        async explain(e10, t10) {
          let r10 = new tt({ ...this.#t, queryNode: eG.cloneWithExplain(this.#t.queryNode, e10, t10) });
          return await r10.execute();
        }
      }
      ex(tt, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
      class tr {
        numUpdatedRows;
        numChangedRows;
        constructor(e10, t10) {
          this.numUpdatedRows = e10, this.numChangedRows = t10;
        }
      }
      class ti {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        where(...e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, eh(e10)) });
        }
        whereRef(e10, t10, r10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, ef(e10, t10, r10)) });
        }
        clearWhere() {
          return new ti({ ...this.#t, queryNode: eG.cloneWithoutWhere(this.#t.queryNode) });
        }
        top(e10, t10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        from(e10) {
          return new ti({ ...this.#t, queryNode: eB.cloneWithFromItems(this.#t.queryNode, ro(e10)) });
        }
        innerJoin(...e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("InnerJoin", e10)) });
        }
        leftJoin(...e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("LeftJoin", e10)) });
        }
        rightJoin(...e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("RightJoin", e10)) });
        }
        fullJoin(...e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("FullJoin", e10)) });
        }
        limit(e10) {
          return new ti({ ...this.#t, queryNode: eB.cloneWithLimit(this.#t.queryNode, te.create(ed(e10))) });
        }
        set(...e10) {
          return new ti({ ...this.#t, queryNode: eB.cloneWithUpdates(this.#t.queryNode, function(...e11) {
            return 2 === e11.length ? [ez.create(ee(e11[0]), ed(e11[1]))] : eZ(e11[0]);
          }(...e10)) });
        }
        returning(e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eO(e10)) });
        }
        returningAll(e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithReturning(this.#t.queryNode, eA(e10)) });
        }
        output(e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eO(e10)) });
        }
        outputAll(e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eA(e10)) });
        }
        modifyEnd(e10) {
          return new ti({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, e10.toOperationNode()) });
        }
        clearReturning() {
          return new ti({ ...this.#t, queryNode: eG.cloneWithoutReturning(this.#t.queryNode) });
        }
        $call(e10) {
          return e10(this);
        }
        $if(e10, t10) {
          return e10 ? t10(this) : new ti({ ...this.#t });
        }
        $castTo() {
          return new ti(this.#t);
        }
        $narrowType() {
          return new ti(this.#t);
        }
        $assertType() {
          return new ti(this.#t);
        }
        withPlugin(e10) {
          return new ti({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.queryNode, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          let e10 = this.compile(), t10 = await this.#t.executor.executeQuery(e10, this.#t.queryId), { adapter: r10 } = this.#t.executor, i2 = e10.query;
          return i2.returning && r10.supportsReturning || i2.output && r10.supportsOutput ? t10.rows : [new tr(t10.numAffectedRows ?? t10.numUpdatedOrDeletedRows ?? BigInt(0), t10.numChangedRows)];
        }
        async executeTakeFirst() {
          let [e10] = await this.execute();
          return e10;
        }
        async executeTakeFirstOrThrow(e10 = e0) {
          let t10 = await this.executeTakeFirst();
          if (void 0 === t10) throw e1(e10) ? new e10(this.toOperationNode()) : e10(this.toOperationNode());
          return t10;
        }
        async *stream(e10 = 100) {
          let t10 = this.compile();
          for await (let r10 of this.#t.executor.stream(t10, e10, this.#t.queryId)) yield* r10.rows;
        }
        async explain(e10, t10) {
          let r10 = new ti({ ...this.#t, queryNode: eG.cloneWithExplain(this.#t.queryNode, e10, t10) });
          return await r10.execute();
        }
      }
      ex(ti, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
      let tn = c({ is: (e10) => "CommonTableExpressionNameNode" === e10.kind, create: (e10, t10) => c({ kind: "CommonTableExpressionNameNode", table: k.create(e10), columns: t10 ? c(t10.map(D.create)) : void 0 }) }), ts = c({ is: (e10) => "CommonTableExpressionNode" === e10.kind, create: (e10, t10) => c({ kind: "CommonTableExpressionNode", name: e10, expression: t10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class to {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        materialized() {
          return new to({ ...this.#t, node: ts.cloneWith(this.#t.node, { materialized: true }) });
        }
        notMaterialized() {
          return new to({ ...this.#t, node: ts.cloneWith(this.#t.node, { materialized: false }) });
        }
        toOperationNode() {
          return this.#t.node;
        }
      }
      function ta(e10, t10) {
        let r10 = t10(new tP({ executor: tk })).toOperationNode();
        return l(e10) ? e10((e11) => new to({ node: ts.create(td(e11), r10) })).toOperationNode() : ts.create(td(e10), r10);
      }
      function td(e10) {
        if (!e10.includes("(")) return tn.create(e10);
        {
          let t10 = e10.split(/[\(\)]/), r10 = t10[0], i2 = t10[1].split(",").map((e11) => e11.trim());
          return tn.create(r10, i2);
        }
      }
      ex(to, "don't await CTEBuilder instances. They are never executed directly and are always just a part of a query.");
      let tl = c({ is: (e10) => "WithNode" === e10.kind, create: (e10, t10) => c({ kind: "WithNode", expressions: c([e10]), ...t10 }), cloneWithExpression: (e10, t10) => c({ ...e10, expressions: c([...e10.expressions, t10]) }) }), tu = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      function tc() {
        return new th();
      }
      class th {
        #r;
        get queryId() {
          return void 0 === this.#r && (this.#r = function(e10) {
            let t10 = "";
            for (let e11 = 0; e11 < 8; ++e11) t10 += tu[~~(Math.random() * tu.length)];
            return t10;
          }(0)), this.#r;
        }
      }
      class tp {
        nodeStack = [];
        #i = c({ AliasNode: this.transformAlias.bind(this), ColumnNode: this.transformColumn.bind(this), IdentifierNode: this.transformIdentifier.bind(this), SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this), RawNode: this.transformRaw.bind(this), ReferenceNode: this.transformReference.bind(this), SelectQueryNode: this.transformSelectQuery.bind(this), SelectionNode: this.transformSelection.bind(this), TableNode: this.transformTable.bind(this), FromNode: this.transformFrom.bind(this), SelectAllNode: this.transformSelectAll.bind(this), AndNode: this.transformAnd.bind(this), OrNode: this.transformOr.bind(this), ValueNode: this.transformValue.bind(this), ValueListNode: this.transformValueList.bind(this), PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this), ParensNode: this.transformParens.bind(this), JoinNode: this.transformJoin.bind(this), OperatorNode: this.transformOperator.bind(this), WhereNode: this.transformWhere.bind(this), InsertQueryNode: this.transformInsertQuery.bind(this), DeleteQueryNode: this.transformDeleteQuery.bind(this), ReturningNode: this.transformReturning.bind(this), CreateTableNode: this.transformCreateTable.bind(this), AddColumnNode: this.transformAddColumn.bind(this), ColumnDefinitionNode: this.transformColumnDefinition.bind(this), DropTableNode: this.transformDropTable.bind(this), DataTypeNode: this.transformDataType.bind(this), OrderByNode: this.transformOrderBy.bind(this), OrderByItemNode: this.transformOrderByItem.bind(this), GroupByNode: this.transformGroupBy.bind(this), GroupByItemNode: this.transformGroupByItem.bind(this), UpdateQueryNode: this.transformUpdateQuery.bind(this), ColumnUpdateNode: this.transformColumnUpdate.bind(this), LimitNode: this.transformLimit.bind(this), OffsetNode: this.transformOffset.bind(this), OnConflictNode: this.transformOnConflict.bind(this), OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this), CreateIndexNode: this.transformCreateIndex.bind(this), DropIndexNode: this.transformDropIndex.bind(this), ListNode: this.transformList.bind(this), PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this), UniqueConstraintNode: this.transformUniqueConstraint.bind(this), ReferencesNode: this.transformReferences.bind(this), CheckConstraintNode: this.transformCheckConstraint.bind(this), WithNode: this.transformWith.bind(this), CommonTableExpressionNode: this.transformCommonTableExpression.bind(this), CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this), HavingNode: this.transformHaving.bind(this), CreateSchemaNode: this.transformCreateSchema.bind(this), DropSchemaNode: this.transformDropSchema.bind(this), AlterTableNode: this.transformAlterTable.bind(this), DropColumnNode: this.transformDropColumn.bind(this), RenameColumnNode: this.transformRenameColumn.bind(this), AlterColumnNode: this.transformAlterColumn.bind(this), ModifyColumnNode: this.transformModifyColumn.bind(this), AddConstraintNode: this.transformAddConstraint.bind(this), DropConstraintNode: this.transformDropConstraint.bind(this), ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this), CreateViewNode: this.transformCreateView.bind(this), DropViewNode: this.transformDropView.bind(this), GeneratedNode: this.transformGenerated.bind(this), DefaultValueNode: this.transformDefaultValue.bind(this), OnNode: this.transformOn.bind(this), ValuesNode: this.transformValues.bind(this), SelectModifierNode: this.transformSelectModifier.bind(this), CreateTypeNode: this.transformCreateType.bind(this), DropTypeNode: this.transformDropType.bind(this), ExplainNode: this.transformExplain.bind(this), DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this), AggregateFunctionNode: this.transformAggregateFunction.bind(this), OverNode: this.transformOver.bind(this), PartitionByNode: this.transformPartitionBy.bind(this), PartitionByItemNode: this.transformPartitionByItem.bind(this), SetOperationNode: this.transformSetOperation.bind(this), BinaryOperationNode: this.transformBinaryOperation.bind(this), UnaryOperationNode: this.transformUnaryOperation.bind(this), UsingNode: this.transformUsing.bind(this), FunctionNode: this.transformFunction.bind(this), CaseNode: this.transformCase.bind(this), WhenNode: this.transformWhen.bind(this), JSONReferenceNode: this.transformJSONReference.bind(this), JSONPathNode: this.transformJSONPath.bind(this), JSONPathLegNode: this.transformJSONPathLeg.bind(this), JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this), TupleNode: this.transformTuple.bind(this), MergeQueryNode: this.transformMergeQuery.bind(this), MatchedNode: this.transformMatched.bind(this), AddIndexNode: this.transformAddIndex.bind(this), CastNode: this.transformCast.bind(this), FetchNode: this.transformFetch.bind(this), TopNode: this.transformTop.bind(this), OutputNode: this.transformOutput.bind(this) });
        transformNode(e10) {
          if (!e10) return e10;
          this.nodeStack.push(e10);
          let t10 = this.transformNodeImpl(e10);
          return this.nodeStack.pop(), c(t10);
        }
        transformNodeImpl(e10) {
          return this.#i[e10.kind](e10);
        }
        transformNodeList(e10) {
          return e10 ? c(e10.map((e11) => this.transformNode(e11))) : e10;
        }
        transformSelectQuery(e10) {
          return { kind: "SelectQueryNode", from: this.transformNode(e10.from), selections: this.transformNodeList(e10.selections), distinctOn: this.transformNodeList(e10.distinctOn), joins: this.transformNodeList(e10.joins), groupBy: this.transformNode(e10.groupBy), orderBy: this.transformNode(e10.orderBy), where: this.transformNode(e10.where), frontModifiers: this.transformNodeList(e10.frontModifiers), endModifiers: this.transformNodeList(e10.endModifiers), limit: this.transformNode(e10.limit), offset: this.transformNode(e10.offset), with: this.transformNode(e10.with), having: this.transformNode(e10.having), explain: this.transformNode(e10.explain), setOperations: this.transformNodeList(e10.setOperations), fetch: this.transformNode(e10.fetch), top: this.transformNode(e10.top) };
        }
        transformSelection(e10) {
          return { kind: "SelectionNode", selection: this.transformNode(e10.selection) };
        }
        transformColumn(e10) {
          return { kind: "ColumnNode", column: this.transformNode(e10.column) };
        }
        transformAlias(e10) {
          return { kind: "AliasNode", node: this.transformNode(e10.node), alias: this.transformNode(e10.alias) };
        }
        transformTable(e10) {
          return { kind: "TableNode", table: this.transformNode(e10.table) };
        }
        transformFrom(e10) {
          return { kind: "FromNode", froms: this.transformNodeList(e10.froms) };
        }
        transformReference(e10) {
          return { kind: "ReferenceNode", column: this.transformNode(e10.column), table: this.transformNode(e10.table) };
        }
        transformAnd(e10) {
          return { kind: "AndNode", left: this.transformNode(e10.left), right: this.transformNode(e10.right) };
        }
        transformOr(e10) {
          return { kind: "OrNode", left: this.transformNode(e10.left), right: this.transformNode(e10.right) };
        }
        transformValueList(e10) {
          return { kind: "ValueListNode", values: this.transformNodeList(e10.values) };
        }
        transformParens(e10) {
          return { kind: "ParensNode", node: this.transformNode(e10.node) };
        }
        transformJoin(e10) {
          return { kind: "JoinNode", joinType: e10.joinType, table: this.transformNode(e10.table), on: this.transformNode(e10.on) };
        }
        transformRaw(e10) {
          return { kind: "RawNode", sqlFragments: c([...e10.sqlFragments]), parameters: this.transformNodeList(e10.parameters) };
        }
        transformWhere(e10) {
          return { kind: "WhereNode", where: this.transformNode(e10.where) };
        }
        transformInsertQuery(e10) {
          return { kind: "InsertQueryNode", into: this.transformNode(e10.into), columns: this.transformNodeList(e10.columns), values: this.transformNode(e10.values), returning: this.transformNode(e10.returning), onConflict: this.transformNode(e10.onConflict), onDuplicateKey: this.transformNode(e10.onDuplicateKey), endModifiers: this.transformNodeList(e10.endModifiers), with: this.transformNode(e10.with), ignore: e10.ignore, replace: e10.replace, explain: this.transformNode(e10.explain), defaultValues: e10.defaultValues, top: this.transformNode(e10.top), output: this.transformNode(e10.output) };
        }
        transformValues(e10) {
          return { kind: "ValuesNode", values: this.transformNodeList(e10.values) };
        }
        transformDeleteQuery(e10) {
          return { kind: "DeleteQueryNode", from: this.transformNode(e10.from), using: this.transformNode(e10.using), joins: this.transformNodeList(e10.joins), where: this.transformNode(e10.where), returning: this.transformNode(e10.returning), endModifiers: this.transformNodeList(e10.endModifiers), with: this.transformNode(e10.with), orderBy: this.transformNode(e10.orderBy), limit: this.transformNode(e10.limit), explain: this.transformNode(e10.explain), top: this.transformNode(e10.top), output: this.transformNode(e10.output) };
        }
        transformReturning(e10) {
          return { kind: "ReturningNode", selections: this.transformNodeList(e10.selections) };
        }
        transformCreateTable(e10) {
          return { kind: "CreateTableNode", table: this.transformNode(e10.table), columns: this.transformNodeList(e10.columns), constraints: this.transformNodeList(e10.constraints), temporary: e10.temporary, ifNotExists: e10.ifNotExists, onCommit: e10.onCommit, frontModifiers: this.transformNodeList(e10.frontModifiers), endModifiers: this.transformNodeList(e10.endModifiers), selectQuery: this.transformNode(e10.selectQuery) };
        }
        transformColumnDefinition(e10) {
          return { kind: "ColumnDefinitionNode", column: this.transformNode(e10.column), dataType: this.transformNode(e10.dataType), references: this.transformNode(e10.references), primaryKey: e10.primaryKey, autoIncrement: e10.autoIncrement, unique: e10.unique, notNull: e10.notNull, unsigned: e10.unsigned, defaultTo: this.transformNode(e10.defaultTo), check: this.transformNode(e10.check), generated: this.transformNode(e10.generated), frontModifiers: this.transformNodeList(e10.frontModifiers), endModifiers: this.transformNodeList(e10.endModifiers), nullsNotDistinct: e10.nullsNotDistinct, identity: e10.identity, ifNotExists: e10.ifNotExists };
        }
        transformAddColumn(e10) {
          return { kind: "AddColumnNode", column: this.transformNode(e10.column) };
        }
        transformDropTable(e10) {
          return { kind: "DropTableNode", table: this.transformNode(e10.table), ifExists: e10.ifExists, cascade: e10.cascade };
        }
        transformOrderBy(e10) {
          return { kind: "OrderByNode", items: this.transformNodeList(e10.items) };
        }
        transformOrderByItem(e10) {
          return { kind: "OrderByItemNode", orderBy: this.transformNode(e10.orderBy), direction: this.transformNode(e10.direction) };
        }
        transformGroupBy(e10) {
          return { kind: "GroupByNode", items: this.transformNodeList(e10.items) };
        }
        transformGroupByItem(e10) {
          return { kind: "GroupByItemNode", groupBy: this.transformNode(e10.groupBy) };
        }
        transformUpdateQuery(e10) {
          return { kind: "UpdateQueryNode", table: this.transformNode(e10.table), from: this.transformNode(e10.from), joins: this.transformNodeList(e10.joins), where: this.transformNode(e10.where), updates: this.transformNodeList(e10.updates), returning: this.transformNode(e10.returning), endModifiers: this.transformNodeList(e10.endModifiers), with: this.transformNode(e10.with), explain: this.transformNode(e10.explain), limit: this.transformNode(e10.limit), top: this.transformNode(e10.top), output: this.transformNode(e10.output) };
        }
        transformColumnUpdate(e10) {
          return { kind: "ColumnUpdateNode", column: this.transformNode(e10.column), value: this.transformNode(e10.value) };
        }
        transformLimit(e10) {
          return { kind: "LimitNode", limit: this.transformNode(e10.limit) };
        }
        transformOffset(e10) {
          return { kind: "OffsetNode", offset: this.transformNode(e10.offset) };
        }
        transformOnConflict(e10) {
          return { kind: "OnConflictNode", columns: this.transformNodeList(e10.columns), constraint: this.transformNode(e10.constraint), indexExpression: this.transformNode(e10.indexExpression), indexWhere: this.transformNode(e10.indexWhere), updates: this.transformNodeList(e10.updates), updateWhere: this.transformNode(e10.updateWhere), doNothing: e10.doNothing };
        }
        transformOnDuplicateKey(e10) {
          return { kind: "OnDuplicateKeyNode", updates: this.transformNodeList(e10.updates) };
        }
        transformCreateIndex(e10) {
          return { kind: "CreateIndexNode", name: this.transformNode(e10.name), table: this.transformNode(e10.table), columns: this.transformNodeList(e10.columns), unique: e10.unique, using: this.transformNode(e10.using), ifNotExists: e10.ifNotExists, where: this.transformNode(e10.where), nullsNotDistinct: e10.nullsNotDistinct };
        }
        transformList(e10) {
          return { kind: "ListNode", items: this.transformNodeList(e10.items) };
        }
        transformDropIndex(e10) {
          return { kind: "DropIndexNode", name: this.transformNode(e10.name), table: this.transformNode(e10.table), ifExists: e10.ifExists, cascade: e10.cascade };
        }
        transformPrimaryKeyConstraint(e10) {
          return { kind: "PrimaryKeyConstraintNode", columns: this.transformNodeList(e10.columns), name: this.transformNode(e10.name) };
        }
        transformUniqueConstraint(e10) {
          return { kind: "UniqueConstraintNode", columns: this.transformNodeList(e10.columns), name: this.transformNode(e10.name), nullsNotDistinct: e10.nullsNotDistinct };
        }
        transformForeignKeyConstraint(e10) {
          return { kind: "ForeignKeyConstraintNode", columns: this.transformNodeList(e10.columns), references: this.transformNode(e10.references), name: this.transformNode(e10.name), onDelete: e10.onDelete, onUpdate: e10.onUpdate };
        }
        transformSetOperation(e10) {
          return { kind: "SetOperationNode", operator: e10.operator, expression: this.transformNode(e10.expression), all: e10.all };
        }
        transformReferences(e10) {
          return { kind: "ReferencesNode", table: this.transformNode(e10.table), columns: this.transformNodeList(e10.columns), onDelete: e10.onDelete, onUpdate: e10.onUpdate };
        }
        transformCheckConstraint(e10) {
          return { kind: "CheckConstraintNode", expression: this.transformNode(e10.expression), name: this.transformNode(e10.name) };
        }
        transformWith(e10) {
          return { kind: "WithNode", expressions: this.transformNodeList(e10.expressions), recursive: e10.recursive };
        }
        transformCommonTableExpression(e10) {
          return { kind: "CommonTableExpressionNode", name: this.transformNode(e10.name), materialized: e10.materialized, expression: this.transformNode(e10.expression) };
        }
        transformCommonTableExpressionName(e10) {
          return { kind: "CommonTableExpressionNameNode", table: this.transformNode(e10.table), columns: this.transformNodeList(e10.columns) };
        }
        transformHaving(e10) {
          return { kind: "HavingNode", having: this.transformNode(e10.having) };
        }
        transformCreateSchema(e10) {
          return { kind: "CreateSchemaNode", schema: this.transformNode(e10.schema), ifNotExists: e10.ifNotExists };
        }
        transformDropSchema(e10) {
          return { kind: "DropSchemaNode", schema: this.transformNode(e10.schema), ifExists: e10.ifExists, cascade: e10.cascade };
        }
        transformAlterTable(e10) {
          return { kind: "AlterTableNode", table: this.transformNode(e10.table), renameTo: this.transformNode(e10.renameTo), setSchema: this.transformNode(e10.setSchema), columnAlterations: this.transformNodeList(e10.columnAlterations), addConstraint: this.transformNode(e10.addConstraint), dropConstraint: this.transformNode(e10.dropConstraint), addIndex: this.transformNode(e10.addIndex), dropIndex: this.transformNode(e10.dropIndex) };
        }
        transformDropColumn(e10) {
          return { kind: "DropColumnNode", column: this.transformNode(e10.column) };
        }
        transformRenameColumn(e10) {
          return { kind: "RenameColumnNode", column: this.transformNode(e10.column), renameTo: this.transformNode(e10.renameTo) };
        }
        transformAlterColumn(e10) {
          return { kind: "AlterColumnNode", column: this.transformNode(e10.column), dataType: this.transformNode(e10.dataType), dataTypeExpression: this.transformNode(e10.dataTypeExpression), setDefault: this.transformNode(e10.setDefault), dropDefault: e10.dropDefault, setNotNull: e10.setNotNull, dropNotNull: e10.dropNotNull };
        }
        transformModifyColumn(e10) {
          return { kind: "ModifyColumnNode", column: this.transformNode(e10.column) };
        }
        transformAddConstraint(e10) {
          return { kind: "AddConstraintNode", constraint: this.transformNode(e10.constraint) };
        }
        transformDropConstraint(e10) {
          return { kind: "DropConstraintNode", constraintName: this.transformNode(e10.constraintName), ifExists: e10.ifExists, modifier: e10.modifier };
        }
        transformCreateView(e10) {
          return { kind: "CreateViewNode", name: this.transformNode(e10.name), temporary: e10.temporary, orReplace: e10.orReplace, ifNotExists: e10.ifNotExists, materialized: e10.materialized, columns: this.transformNodeList(e10.columns), as: this.transformNode(e10.as) };
        }
        transformDropView(e10) {
          return { kind: "DropViewNode", name: this.transformNode(e10.name), ifExists: e10.ifExists, materialized: e10.materialized, cascade: e10.cascade };
        }
        transformGenerated(e10) {
          return { kind: "GeneratedNode", byDefault: e10.byDefault, always: e10.always, identity: e10.identity, stored: e10.stored, expression: this.transformNode(e10.expression) };
        }
        transformDefaultValue(e10) {
          return { kind: "DefaultValueNode", defaultValue: this.transformNode(e10.defaultValue) };
        }
        transformOn(e10) {
          return { kind: "OnNode", on: this.transformNode(e10.on) };
        }
        transformSelectModifier(e10) {
          return { kind: "SelectModifierNode", modifier: e10.modifier, rawModifier: this.transformNode(e10.rawModifier), of: this.transformNodeList(e10.of) };
        }
        transformCreateType(e10) {
          return { kind: "CreateTypeNode", name: this.transformNode(e10.name), enum: this.transformNode(e10.enum) };
        }
        transformDropType(e10) {
          return { kind: "DropTypeNode", name: this.transformNode(e10.name), ifExists: e10.ifExists };
        }
        transformExplain(e10) {
          return { kind: "ExplainNode", format: e10.format, options: this.transformNode(e10.options) };
        }
        transformSchemableIdentifier(e10) {
          return { kind: "SchemableIdentifierNode", schema: this.transformNode(e10.schema), identifier: this.transformNode(e10.identifier) };
        }
        transformAggregateFunction(e10) {
          return { kind: "AggregateFunctionNode", aggregated: this.transformNodeList(e10.aggregated), distinct: e10.distinct, orderBy: this.transformNode(e10.orderBy), filter: this.transformNode(e10.filter), func: e10.func, over: this.transformNode(e10.over) };
        }
        transformOver(e10) {
          return { kind: "OverNode", orderBy: this.transformNode(e10.orderBy), partitionBy: this.transformNode(e10.partitionBy) };
        }
        transformPartitionBy(e10) {
          return { kind: "PartitionByNode", items: this.transformNodeList(e10.items) };
        }
        transformPartitionByItem(e10) {
          return { kind: "PartitionByItemNode", partitionBy: this.transformNode(e10.partitionBy) };
        }
        transformBinaryOperation(e10) {
          return { kind: "BinaryOperationNode", leftOperand: this.transformNode(e10.leftOperand), operator: this.transformNode(e10.operator), rightOperand: this.transformNode(e10.rightOperand) };
        }
        transformUnaryOperation(e10) {
          return { kind: "UnaryOperationNode", operator: this.transformNode(e10.operator), operand: this.transformNode(e10.operand) };
        }
        transformUsing(e10) {
          return { kind: "UsingNode", tables: this.transformNodeList(e10.tables) };
        }
        transformFunction(e10) {
          return { kind: "FunctionNode", func: e10.func, arguments: this.transformNodeList(e10.arguments) };
        }
        transformCase(e10) {
          return { kind: "CaseNode", value: this.transformNode(e10.value), when: this.transformNodeList(e10.when), else: this.transformNode(e10.else), isStatement: e10.isStatement };
        }
        transformWhen(e10) {
          return { kind: "WhenNode", condition: this.transformNode(e10.condition), result: this.transformNode(e10.result) };
        }
        transformJSONReference(e10) {
          return { kind: "JSONReferenceNode", reference: this.transformNode(e10.reference), traversal: this.transformNode(e10.traversal) };
        }
        transformJSONPath(e10) {
          return { kind: "JSONPathNode", inOperator: this.transformNode(e10.inOperator), pathLegs: this.transformNodeList(e10.pathLegs) };
        }
        transformJSONPathLeg(e10) {
          return { kind: "JSONPathLegNode", type: e10.type, value: e10.value };
        }
        transformJSONOperatorChain(e10) {
          return { kind: "JSONOperatorChainNode", operator: this.transformNode(e10.operator), values: this.transformNodeList(e10.values) };
        }
        transformTuple(e10) {
          return { kind: "TupleNode", values: this.transformNodeList(e10.values) };
        }
        transformMergeQuery(e10) {
          return { kind: "MergeQueryNode", into: this.transformNode(e10.into), using: this.transformNode(e10.using), whens: this.transformNodeList(e10.whens), with: this.transformNode(e10.with), top: this.transformNode(e10.top), endModifiers: this.transformNodeList(e10.endModifiers), output: this.transformNode(e10.output) };
        }
        transformMatched(e10) {
          return { kind: "MatchedNode", not: e10.not, bySource: e10.bySource };
        }
        transformAddIndex(e10) {
          return { kind: "AddIndexNode", name: this.transformNode(e10.name), columns: this.transformNodeList(e10.columns), unique: e10.unique, using: this.transformNode(e10.using), ifNotExists: e10.ifNotExists };
        }
        transformCast(e10) {
          return { kind: "CastNode", expression: this.transformNode(e10.expression), dataType: this.transformNode(e10.dataType) };
        }
        transformFetch(e10) {
          return { kind: "FetchNode", rowCount: this.transformNode(e10.rowCount), modifier: e10.modifier };
        }
        transformTop(e10) {
          return { kind: "TopNode", expression: e10.expression, modifiers: e10.modifiers };
        }
        transformOutput(e10) {
          return { kind: "OutputNode", selections: this.transformNodeList(e10.selections) };
        }
        transformDataType(e10) {
          return e10;
        }
        transformSelectAll(e10) {
          return e10;
        }
        transformIdentifier(e10) {
          return e10;
        }
        transformValue(e10) {
          return e10;
        }
        transformPrimitiveValueList(e10) {
          return e10;
        }
        transformOperator(e10) {
          return e10;
        }
        transformDefaultInsertValue(e10) {
          return e10;
        }
      }
      let tf = c({ AlterTableNode: true, CreateIndexNode: true, CreateSchemaNode: true, CreateTableNode: true, CreateTypeNode: true, CreateViewNode: true, DeleteQueryNode: true, DropIndexNode: true, DropSchemaNode: true, DropTableNode: true, DropTypeNode: true, DropViewNode: true, InsertQueryNode: true, RawNode: true, SelectQueryNode: true, UpdateQueryNode: true, MergeQueryNode: true }), tm = { json_agg: true, to_json: true };
      class ty extends tp {
        #n;
        #s = /* @__PURE__ */ new Set();
        #o = /* @__PURE__ */ new Set();
        constructor(e10) {
          super(), this.#n = e10;
        }
        transformNodeImpl(e10) {
          if (!this.#a(e10)) return super.transformNodeImpl(e10);
          let t10 = this.#d(e10);
          for (let e11 of t10) this.#o.add(e11);
          let r10 = this.#l(e10);
          for (let e11 of r10) this.#s.add(e11);
          let i2 = super.transformNodeImpl(e10);
          for (let e11 of r10) this.#s.delete(e11);
          for (let e11 of t10) this.#o.delete(e11);
          return i2;
        }
        transformSchemableIdentifier(e10) {
          let t10 = super.transformSchemableIdentifier(e10);
          return t10.schema || !this.#s.has(e10.identifier.name) ? t10 : { ...t10, schema: y.create(this.#n) };
        }
        transformReferences(e10) {
          let t10 = super.transformReferences(e10);
          return t10.table.table.schema ? t10 : { ...t10, table: k.createWithSchema(this.#n, t10.table.table.identifier.name) };
        }
        transformAggregateFunction(e10) {
          return { ...super.transformAggregateFunction({ ...e10, aggregated: [] }), aggregated: this.#u(e10, "aggregated") };
        }
        transformFunction(e10) {
          return { ...super.transformFunction({ ...e10, arguments: [] }), arguments: this.#u(e10, "arguments") };
        }
        #u(e10, t10) {
          return tm[e10.func] ? e10[t10].map((e11) => !k.is(e11) || e11.table.schema ? this.transformNode(e11) : { ...e11, table: this.transformIdentifier(e11.table.identifier) }) : this.transformNodeList(e10[t10]);
        }
        #a(e10) {
          return e10.kind in tf;
        }
        #l(e10) {
          let t10 = /* @__PURE__ */ new Set();
          if ("name" in e10 && e10.name && N.is(e10.name) && this.#c(e10.name, t10), "from" in e10 && e10.from) for (let r10 of e10.from.froms) this.#h(r10, t10);
          if ("into" in e10 && e10.into && this.#h(e10.into, t10), "table" in e10 && e10.table && this.#h(e10.table, t10), "joins" in e10 && e10.joins) for (let r10 of e10.joins) this.#h(r10.table, t10);
          return "using" in e10 && e10.using && this.#h(e10.using, t10), t10;
        }
        #d(e10) {
          let t10 = /* @__PURE__ */ new Set();
          return "with" in e10 && e10.with && this.#p(e10.with, t10), t10;
        }
        #h(e10, t10) {
          let r10 = k.is(e10) ? e10 : C.is(e10) && k.is(e10.node) ? e10.node : null;
          r10 && this.#c(r10.table, t10);
        }
        #c(e10, t10) {
          let r10 = e10.identifier.name;
          this.#s.has(r10) || this.#o.has(r10) || t10.add(r10);
        }
        #p(e10, t10) {
          for (let r10 of e10.expressions) {
            let e11 = r10.name.table.table.identifier.name;
            this.#o.has(e11) || t10.add(e11);
          }
        }
      }
      class tg {
        #f;
        constructor(e10) {
          this.#f = new ty(e10);
        }
        transformQuery(e10) {
          return this.#f.transformNode(e10.node);
        }
        async transformResult(e10) {
          return e10.result;
        }
      }
      let tw = c({ is: (e10) => "MatchedNode" === e10.kind, create: (e10, t10 = false) => c({ kind: "MatchedNode", not: e10, bySource: t10 }) });
      function tv(e10, t10, r10) {
        return eK.create(ey([tw.create(!e10.isMatched, e10.bySource), ...t10 && t10.length > 0 ? [3 === t10.length && r10 ? ef(t10[0], t10[1], t10[2]) : eh(t10)] : []], "and", false));
      }
      function tb(e10) {
        return s(e10) ? Q.create([e10], []) : E(e10) ? e10.toOperationNode() : e10;
      }
      class tN {
        #m;
        #y;
        #g;
        constructor() {
          this.#m = new Promise((e10, t10) => {
            this.#g = t10, this.#y = e10;
          });
        }
        get promise() {
          return this.#m;
        }
        resolve = (e10) => {
          this.#y && this.#y(e10);
        };
        reject = (e10) => {
          this.#g && this.#g(e10);
        };
      }
      let t_ = /* @__PURE__ */ new Set(), tx = c([]);
      class tS {
        #w;
        constructor(e10 = tx) {
          this.#w = e10;
        }
        get plugins() {
          return this.#w;
        }
        transformQuery(e10, t10) {
          for (let r10 of this.#w) {
            let i2 = r10.transformQuery({ node: e10, queryId: t10 });
            if (i2.kind === e10.kind) e10 = i2;
            else throw Error(`KyselyPlugin.transformQuery must return a node of the same kind that was given to it. The plugin was given a ${e10.kind} but it returned a ${i2.kind}`);
          }
          return e10;
        }
        async executeQuery(e10, t10) {
          return await this.provideConnection(async (r10) => {
            let i2 = await r10.executeQuery(e10), n2 = await this.#v(i2, t10);
            return function(e11, t11) {
              let { numAffectedRows: r11 } = e11;
              if ((void 0 !== r11 || void 0 !== e11.numUpdatedOrDeletedRows) && (void 0 === r11 || void 0 === t11.numAffectedRows)) {
                var i3;
                i3 = "kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.", t_.has(i3) || (t_.add(i3), console.log(i3));
              }
            }(i2, n2), n2;
          });
        }
        async *stream(e10, t10, r10) {
          let i2 = new tN(), n2 = new tN();
          this.provideConnection(async (e11) => (i2.resolve(e11), await n2.promise)).catch((e11) => i2.reject(e11));
          let s2 = await i2.promise;
          try {
            for await (let i3 of s2.streamQuery(e10, t10)) yield await this.#v(i3, r10);
          } finally {
            n2.resolve();
          }
        }
        async #v(e10, t10) {
          for (let r10 of this.#w) e10 = await r10.transformResult({ result: e10, queryId: t10 });
          return e10;
        }
      }
      class tC extends tS {
        get adapter() {
          throw Error("this query cannot be compiled to SQL");
        }
        compileQuery() {
          throw Error("this query cannot be compiled to SQL");
        }
        provideConnection() {
          throw Error("this query cannot be executed");
        }
        withConnectionProvider() {
          throw Error("this query cannot have a connection provider");
        }
        withPlugin(e10) {
          return new tC([...this.plugins, e10]);
        }
        withPlugins(e10) {
          return new tC([...this.plugins, ...e10]);
        }
        withPluginAtFront(e10) {
          return new tC([e10, ...this.plugins]);
        }
        withoutPlugins() {
          return new tC([]);
        }
      }
      let tk = new tC();
      class tE {
        numChangedRows;
        constructor(e10) {
          this.numChangedRows = e10;
        }
      }
      class tO {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        modifyEnd(e10) {
          return new tO({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, e10.toOperationNode()) });
        }
        top(e10, t10) {
          return new tO({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        using(...e10) {
          return new tT({ ...this.#t, queryNode: eJ.cloneWithUsing(this.#t.queryNode, tR("Using", e10)) });
        }
        output(e10) {
          return new tO({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eO(e10)) });
        }
        outputAll(e10) {
          return new tO({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eA(e10)) });
        }
      }
      ex(tO, "don't await MergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
      class tT {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        modifyEnd(e10) {
          return new tT({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, e10.toOperationNode()) });
        }
        top(e10, t10) {
          return new tT({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        whenMatched() {
          return this.#b([]);
        }
        whenMatchedAnd(...e10) {
          return this.#b(e10);
        }
        whenMatchedAndRef(e10, t10, r10) {
          return this.#b([e10, t10, r10], true);
        }
        #b(e10, t10) {
          return new tA({ ...this.#t, queryNode: eJ.cloneWithWhen(this.#t.queryNode, tv({ isMatched: true }, e10, t10)) });
        }
        whenNotMatched() {
          return this.#N([]);
        }
        whenNotMatchedAnd(...e10) {
          return this.#N(e10);
        }
        whenNotMatchedAndRef(e10, t10, r10) {
          return this.#N([e10, t10, r10], true);
        }
        whenNotMatchedBySource() {
          return this.#N([], false, true);
        }
        whenNotMatchedBySourceAnd(...e10) {
          return this.#N(e10, false, true);
        }
        whenNotMatchedBySourceAndRef(e10, t10, r10) {
          return this.#N([e10, t10, r10], true, true);
        }
        output(e10) {
          return new tT({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eO(e10)) });
        }
        outputAll(e10) {
          return new tT({ ...this.#t, queryNode: eG.cloneWithOutput(this.#t.queryNode, eA(e10)) });
        }
        #N(e10, t10 = false, r10 = false) {
          let i2 = { ...this.#t, queryNode: eJ.cloneWithWhen(this.#t.queryNode, tv({ isMatched: false, bySource: r10 }, e10, t10)) };
          return new (r10 ? tA : tI)(i2);
        }
        $call(e10) {
          return e10(this);
        }
        $if(e10, t10) {
          return e10 ? t10(this) : new tT({ ...this.#t });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.queryNode, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          let e10 = this.compile(), t10 = await this.#t.executor.executeQuery(e10, this.#t.queryId);
          return e10.query.output && this.#t.executor.adapter.supportsOutput ? t10.rows : [new tE(t10.numAffectedRows)];
        }
        async executeTakeFirst() {
          let [e10] = await this.execute();
          return e10;
        }
        async executeTakeFirstOrThrow(e10 = e0) {
          let t10 = await this.executeTakeFirst();
          if (void 0 === t10) throw e1(e10) ? new e10(this.toOperationNode()) : e10(this.toOperationNode());
          return t10;
        }
      }
      ex(tT, "don't await WheneableMergeQueryBuilder instances directly. To execute the query you need to call `execute`.");
      class tA {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        thenDelete() {
          return new tT({ ...this.#t, queryNode: eJ.cloneWithThen(this.#t.queryNode, tb("delete")) });
        }
        thenDoNothing() {
          return new tT({ ...this.#t, queryNode: eJ.cloneWithThen(this.#t.queryNode, tb("do nothing")) });
        }
        thenUpdate(e10) {
          return new tT({ ...this.#t, queryNode: eJ.cloneWithThen(this.#t.queryNode, tb(e10(new ti({ queryId: this.#t.queryId, executor: tk, queryNode: eB.createWithoutTable() })))) });
        }
        thenUpdateSet(...e10) {
          return this.thenUpdate((t10) => t10.set(...e10));
        }
      }
      ex(tA, "don't await MatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
      class tI {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        thenDoNothing() {
          return new tT({ ...this.#t, queryNode: eJ.cloneWithThen(this.#t.queryNode, tb("do nothing")) });
        }
        thenInsertValues(e10) {
          let [t10, r10] = eM(e10);
          return new tT({ ...this.#t, queryNode: eJ.cloneWithThen(this.#t.queryNode, tb(eq.cloneWith(eq.createWithoutInto(), { columns: t10, values: r10 }))) });
        }
      }
      ex(tI, "don't await NotMatchedThenableMergeQueryBuilder instances directly. To execute the query you need to call `execute` when available.");
      class tP {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        selectFrom(e10) {
          return new t$({ queryId: tc(), executor: this.#t.executor, queryNode: ej.createFrom(ro(e10), this.#t.withNode) });
        }
        selectNoFrom(e10) {
          return new t$({ queryId: tc(), executor: this.#t.executor, queryNode: ej.cloneWithSelections(ej.create(this.#t.withNode), eO(e10)) });
        }
        insertInto(e10) {
          return new e8({ queryId: tc(), executor: this.#t.executor, queryNode: eq.create(rl(e10), this.#t.withNode) });
        }
        replaceInto(e10) {
          return new e8({ queryId: tc(), executor: this.#t.executor, queryNode: eq.create(rl(e10), this.#t.withNode, true) });
        }
        deleteFrom(e10) {
          return new tt({ queryId: tc(), executor: this.#t.executor, queryNode: eU.create(ro(e10), this.#t.withNode) });
        }
        updateTable(e10) {
          return new ti({ queryId: tc(), executor: this.#t.executor, queryNode: eB.create(ra(e10), this.#t.withNode) });
        }
        mergeInto(e10) {
          return new tO({ queryId: tc(), executor: this.#t.executor, queryNode: eJ.create(rd(e10), this.#t.withNode) });
        }
        with(e10, t10) {
          let r10 = ta(e10, t10);
          return new tP({ ...this.#t, withNode: this.#t.withNode ? tl.cloneWithExpression(this.#t.withNode, r10) : tl.create(r10) });
        }
        withRecursive(e10, t10) {
          let r10 = ta(e10, t10);
          return new tP({ ...this.#t, withNode: this.#t.withNode ? tl.cloneWithExpression(this.#t.withNode, r10) : tl.create(r10, { recursive: true }) });
        }
        withPlugin(e10) {
          return new tP({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        withoutPlugins() {
          return new tP({ ...this.#t, executor: this.#t.executor.withoutPlugins() });
        }
        withSchema(e10) {
          return new tP({ ...this.#t, executor: this.#t.executor.withPluginAtFront(new tg(e10)) });
        }
      }
      function tR(e10, t10) {
        var r10, i2, n2, s2, o2;
        if (3 === t10.length) {
          return r10 = t10[0], i2 = t10[1], n2 = t10[2], P.createWithOn(e10, ra(r10), ef(i2, "=", n2));
        }
        if (2 === t10.length) {
          return s2 = e10, o2 = t10[0], (0, t10[1])(new eS({ joinNode: P.create(s2, ra(o2)) })).toOperationNode();
        }
        throw Error("not implemented");
      }
      let tM = c({ is: (e10) => "OffsetNode" === e10.kind, create: (e10) => c({ kind: "OffsetNode", offset: e10 }) }), tq = c({ is: (e10) => "GroupByItemNode" === e10.kind, create: (e10) => c({ kind: "GroupByItemNode", groupBy: e10 }) }), tW = c({ is: (e10) => "SetOperationNode" === e10.kind, create: (e10, t10, r10) => c({ kind: "SetOperationNode", operator: e10, expression: t10, all: r10 }) });
      function tL(e10, t10, r10) {
        return l(t10) && (t10 = t10(rr())), p(t10) || (t10 = [t10]), t10.map((t11) => tW.create(e10, ri(t11), r10));
      }
      class tD {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        get expressionType() {
        }
        as(e10) {
          return new tj(this, e10);
        }
        or(...e10) {
          return new tB(A.create(this.#_, eh(e10)));
        }
        and(...e10) {
          return new tF(T.create(this.#_, eh(e10)));
        }
        $castTo() {
          return new tD(this.#_);
        }
        $notNull() {
          return new tD(this.#_);
        }
        toOperationNode() {
          return this.#_;
        }
      }
      class tj {
        #x;
        #S;
        constructor(e10, t10) {
          this.#x = e10, this.#S = t10;
        }
        get expression() {
          return this.#x;
        }
        get alias() {
          return this.#S;
        }
        toOperationNode() {
          return C.create(this.#x.toOperationNode(), E(this.#S) ? this.#S.toOperationNode() : y.create(this.#S));
        }
      }
      class tB {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        get expressionType() {
        }
        as(e10) {
          return new tj(this, e10);
        }
        or(...e10) {
          return new tB(A.create(this.#_, eh(e10)));
        }
        $castTo() {
          return new tB(this.#_);
        }
        toOperationNode() {
          return ec.create(this.#_);
        }
      }
      class tF {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        get expressionType() {
        }
        as(e10) {
          return new tj(this, e10);
        }
        and(...e10) {
          return new tF(T.create(this.#_, eh(e10)));
        }
        $castTo() {
          return new tF(this.#_);
        }
        toOperationNode() {
          return ec.create(this.#_);
        }
      }
      let tU = { create: (e10, t10) => ({ kind: "FetchNode", rowCount: ea.create(e10), modifier: t10 }) };
      class t$ {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        get expressionType() {
        }
        get isSelectQueryBuilder() {
          return true;
        }
        where(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, eh(e10)) });
        }
        whereRef(e10, t10, r10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithWhere(this.#t.queryNode, ef(e10, t10, r10)) });
        }
        having(...e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithHaving(this.#t.queryNode, eh(e10)) });
        }
        havingRef(e10, t10, r10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithHaving(this.#t.queryNode, ef(e10, t10, r10)) });
        }
        select(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSelections(this.#t.queryNode, eO(e10)) });
        }
        distinctOn(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithDistinctOn(this.#t.queryNode, X(e10)) });
        }
        modifyFront(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithFrontModifier(this.#t.queryNode, O.createWithExpression(e10.toOperationNode())) });
        }
        modifyEnd(e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.createWithExpression(e10.toOperationNode())) });
        }
        distinct() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithFrontModifier(this.#t.queryNode, O.create("Distinct")) });
        }
        forUpdate(e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("ForUpdate", e10 ? h(e10).map(rl) : void 0)) });
        }
        forShare(e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("ForShare", e10 ? h(e10).map(rl) : void 0)) });
        }
        forKeyShare(e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("ForKeyShare", e10 ? h(e10).map(rl) : void 0)) });
        }
        forNoKeyUpdate(e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("ForNoKeyUpdate", e10 ? h(e10).map(rl) : void 0)) });
        }
        skipLocked() {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("SkipLocked")) });
        }
        noWait() {
          return new t$({ ...this.#t, queryNode: eG.cloneWithEndModifier(this.#t.queryNode, O.create("NoWait")) });
        }
        selectAll(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSelections(this.#t.queryNode, eA(e10)) });
        }
        innerJoin(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("InnerJoin", e10)) });
        }
        leftJoin(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("LeftJoin", e10)) });
        }
        rightJoin(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("RightJoin", e10)) });
        }
        fullJoin(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("FullJoin", e10)) });
        }
        innerJoinLateral(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("LateralInnerJoin", e10)) });
        }
        leftJoinLateral(...e10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithJoin(this.#t.queryNode, tR("LateralLeftJoin", e10)) });
        }
        orderBy(...e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithOrderByItems(this.#t.queryNode, K(e10)) });
        }
        groupBy(e10) {
          var t10;
          return new t$({ ...this.#t, queryNode: ej.cloneWithGroupByItems(this.#t.queryNode, X(t10 = l(t10 = e10) ? t10(rr()) : t10).map(tq.create)) });
        }
        limit(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithLimit(this.#t.queryNode, te.create(ed(e10))) });
        }
        offset(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithOffset(this.#t.queryNode, tM.create(ed(e10))) });
        }
        fetch(e10, t10 = "only") {
          return new t$({ ...this.#t, queryNode: ej.cloneWithFetch(this.#t.queryNode, function(e11, t11) {
            if (!o(e11) && !d(e11)) throw Error(`Invalid fetch row count: ${e11}`);
            if (!("only" === t11 || "with ties" === t11)) throw Error(`Invalid fetch modifier: ${t11}`);
            return tU.create(e11, t11);
          }(e10, t10)) });
        }
        top(e10, t10) {
          return new t$({ ...this.#t, queryNode: eG.cloneWithTop(this.#t.queryNode, e9(e10, t10)) });
        }
        union(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("union", e10, false)) });
        }
        unionAll(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("union", e10, true)) });
        }
        intersect(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("intersect", e10, false)) });
        }
        intersectAll(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("intersect", e10, true)) });
        }
        except(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("except", e10, false)) });
        }
        exceptAll(e10) {
          return new t$({ ...this.#t, queryNode: ej.cloneWithSetOperations(this.#t.queryNode, tL("except", e10, true)) });
        }
        as(e10) {
          return new tQ(this, e10);
        }
        clearSelect() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithoutSelections(this.#t.queryNode) });
        }
        clearWhere() {
          return new t$({ ...this.#t, queryNode: eG.cloneWithoutWhere(this.#t.queryNode) });
        }
        clearLimit() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithoutLimit(this.#t.queryNode) });
        }
        clearOffset() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithoutOffset(this.#t.queryNode) });
        }
        clearOrderBy() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithoutOrderBy(this.#t.queryNode) });
        }
        clearGroupBy() {
          return new t$({ ...this.#t, queryNode: ej.cloneWithoutGroupBy(this.#t.queryNode) });
        }
        $call(e10) {
          return e10(this);
        }
        $if(e10, t10) {
          return e10 ? t10(this) : new t$({ ...this.#t });
        }
        $castTo() {
          return new t$(this.#t);
        }
        $narrowType() {
          return new t$(this.#t);
        }
        $assertType() {
          return new t$(this.#t);
        }
        $asTuple() {
          return new tD(this.toOperationNode());
        }
        withPlugin(e10) {
          return new t$({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.queryNode, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          let e10 = this.compile();
          return (await this.#t.executor.executeQuery(e10, this.#t.queryId)).rows;
        }
        async executeTakeFirst() {
          let [e10] = await this.execute();
          return e10;
        }
        async executeTakeFirstOrThrow(e10 = e0) {
          let t10 = await this.executeTakeFirst();
          if (void 0 === t10) throw e1(e10) ? new e10(this.toOperationNode()) : e10(this.toOperationNode());
          return t10;
        }
        async *stream(e10 = 100) {
          let t10 = this.compile();
          for await (let r10 of this.#t.executor.stream(t10, e10, this.#t.queryId)) yield* r10.rows;
        }
        async explain(e10, t10) {
          let r10 = new t$({ ...this.#t, queryNode: eG.cloneWithExplain(this.#t.queryNode, e10, t10) });
          return await r10.execute();
        }
      }
      ex(t$, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
      class tQ {
        #C;
        #S;
        constructor(e10, t10) {
          this.#C = e10, this.#S = t10;
        }
        get expression() {
          return this.#C;
        }
        get alias() {
          return this.#S;
        }
        get isAliasedSelectQueryBuilder() {
          return true;
        }
        toOperationNode() {
          return C.create(this.#C.toOperationNode(), y.create(this.#S));
        }
      }
      ex(tQ, "don't await AliasedSelectQueryBuilder instances directly. AliasedSelectQueryBuilder should never be executed directly since it's always a part of another query.");
      let tV = c({ is: (e10) => "AggregateFunctionNode" === e10.kind, create: (e10, t10 = []) => c({ kind: "AggregateFunctionNode", func: e10, aggregated: t10 }), cloneWithDistinct: (e10) => c({ ...e10, distinct: true }), cloneWithOrderBy: (e10, t10) => c({ ...e10, orderBy: e10.orderBy ? eb.cloneWithItems(e10.orderBy, t10) : eb.create(t10) }), cloneWithFilter: (e10, t10) => c({ ...e10, filter: e10.filter ? e$.cloneWithOperation(e10.filter, "And", t10) : e$.create(t10) }), cloneWithOrFilter: (e10, t10) => c({ ...e10, filter: e10.filter ? e$.cloneWithOperation(e10.filter, "Or", t10) : e$.create(t10) }), cloneWithOver: (e10, t10) => c({ ...e10, over: t10 }) }), tK = c({ is: (e10) => "FunctionNode" === e10.kind, create: (e10, t10) => c({ kind: "FunctionNode", func: e10, arguments: t10 }) });
      class tJ {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        get expressionType() {
        }
        as(e10) {
          return new tH(this, e10);
        }
        distinct() {
          return new tJ({ ...this.#t, aggregateFunctionNode: tV.cloneWithDistinct(this.#t.aggregateFunctionNode) });
        }
        orderBy(e10, t10) {
          return new tJ({ ...this.#t, aggregateFunctionNode: tV.cloneWithOrderBy(this.#t.aggregateFunctionNode, K([e10, t10])) });
        }
        filterWhere(...e10) {
          return new tJ({ ...this.#t, aggregateFunctionNode: tV.cloneWithFilter(this.#t.aggregateFunctionNode, eh(e10)) });
        }
        filterWhereRef(e10, t10, r10) {
          return new tJ({ ...this.#t, aggregateFunctionNode: tV.cloneWithFilter(this.#t.aggregateFunctionNode, ef(e10, t10, r10)) });
        }
        over(e10) {
          let t10 = new ek({ overNode: e_.create() });
          return new tJ({ ...this.#t, aggregateFunctionNode: tV.cloneWithOver(this.#t.aggregateFunctionNode, (e10 ? e10(t10) : t10).toOperationNode()) });
        }
        $call(e10) {
          return e10(this);
        }
        $castTo() {
          return new tJ(this.#t);
        }
        $notNull() {
          return new tJ(this.#t);
        }
        toOperationNode() {
          return this.#t.aggregateFunctionNode;
        }
      }
      ex(tJ, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
      class tH {
        #k;
        #S;
        constructor(e10, t10) {
          this.#k = e10, this.#S = t10;
        }
        get expression() {
          return this.#k;
        }
        get alias() {
          return this.#S;
        }
        toOperationNode() {
          return C.create(this.#k.toOperationNode(), y.create(this.#S));
        }
      }
      function tG() {
        let e10 = (e11, t11) => new tD(tK.create(e11, X(t11 ?? []))), t10 = (e11, t11) => new tJ({ aggregateFunctionNode: tV.create(e11, t11 ? X(t11) : void 0) });
        return Object.assign(e10, { agg: t10, avg: (e11) => t10("avg", [e11]), coalesce: (...t11) => e10("coalesce", t11), count: (e11) => t10("count", [e11]), countAll: (e11) => new tJ({ aggregateFunctionNode: tV.create("count", eA(e11)) }), max: (e11) => t10("max", [e11]), min: (e11) => t10("min", [e11]), sum: (e11) => t10("sum", [e11]), any: (t11) => e10("any", [t11]), jsonAgg: (e11) => new tJ({ aggregateFunctionNode: tV.create("json_agg", [s(e11) ? rl(e11) : e11.toOperationNode()]) }), toJson: (e11) => new tD(tK.create("to_json", [s(e11) ? rl(e11) : e11.toOperationNode()])) });
      }
      let tz = c({ is: (e10) => "UnaryOperationNode" === e10.kind, create: (e10, t10) => c({ kind: "UnaryOperationNode", operator: e10, operand: t10 }) }), tZ = c({ is: (e10) => "CaseNode" === e10.kind, create: (e10) => c({ kind: "CaseNode", value: e10 }), cloneWithWhen: (e10, t10) => c({ ...e10, when: c(e10.when ? [...e10.when, t10] : [t10]) }), cloneWithThen: (e10, t10) => c({ ...e10, when: e10.when ? c([...e10.when.slice(0, -1), eK.cloneWithResult(e10.when[e10.when.length - 1], t10)]) : void 0 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class tY {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        when(...e10) {
          return new tX({ ...this.#t, node: tZ.cloneWithWhen(this.#t.node, eK.create(eh(e10))) });
        }
      }
      class tX {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        then(e10) {
          return new t0({ ...this.#t, node: tZ.cloneWithThen(this.#t.node, el(e10) ? eu(e10) : ed(e10)) });
        }
      }
      class t0 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        when(...e10) {
          return new tX({ ...this.#t, node: tZ.cloneWithWhen(this.#t.node, eK.create(eh(e10))) });
        }
        else(e10) {
          return new t1({ ...this.#t, node: tZ.cloneWith(this.#t.node, { else: el(e10) ? eu(e10) : ed(e10) }) });
        }
        end() {
          return new tD(tZ.cloneWith(this.#t.node, { isStatement: false }));
        }
        endCase() {
          return new tD(tZ.cloneWith(this.#t.node, { isStatement: true }));
        }
      }
      class t1 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        end() {
          return new tD(tZ.cloneWith(this.#t.node, { isStatement: false }));
        }
        endCase() {
          return new tD(tZ.cloneWith(this.#t.node, { isStatement: true }));
        }
      }
      let t2 = c({ is: (e10) => "JSONPathLegNode" === e10.kind, create: (e10, t10) => c({ kind: "JSONPathLegNode", type: e10, value: t10 }) });
      class t4 {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        at(e10) {
          return this.#E("ArrayLocation", e10);
        }
        key(e10) {
          return this.#E("Member", e10);
        }
        #E(e10, t10) {
          return new t6(G.is(this.#_) ? G.cloneWithTraversal(this.#_, Z.is(this.#_.traversal) ? Z.cloneWithLeg(this.#_.traversal, t2.create(e10, t10)) : z.cloneWithValue(this.#_.traversal, ea.createImmediate(t10))) : Z.cloneWithLeg(this.#_, t2.create(e10, t10)));
        }
      }
      class t6 extends t4 {
        #_;
        constructor(e10) {
          super(e10), this.#_ = e10;
        }
        get expressionType() {
        }
        as(e10) {
          return new t3(this, e10);
        }
        $castTo() {
          return new t6(this.#_);
        }
        $notNull() {
          return new t6(this.#_);
        }
        toOperationNode() {
          return this.#_;
        }
      }
      class t3 {
        #O;
        #S;
        constructor(e10, t10) {
          this.#O = e10, this.#S = t10;
        }
        get expression() {
          return this.#O;
        }
        get alias() {
          return this.#S;
        }
        toOperationNode() {
          return C.create(this.#O.toOperationNode(), E(this.#S) ? this.#S.toOperationNode() : y.create(this.#S));
        }
      }
      let t5 = c({ is: (e10) => "TupleNode" === e10.kind, create: (e10) => c({ kind: "TupleNode", values: c(e10) }) }), t9 = ["varchar", "char", "text", "integer", "int2", "int4", "int8", "smallint", "bigint", "boolean", "real", "double precision", "float4", "float8", "decimal", "numeric", "binary", "bytea", "date", "datetime", "time", "timetz", "timestamp", "timestamptz", "serial", "bigserial", "uuid", "json", "jsonb", "blob", "varbinary", "int4range", "int4multirange", "int8range", "int8multirange", "numrange", "nummultirange", "tsrange", "tsmultirange", "tstzrange", "tstzmultirange", "daterange", "datemultirange"], t8 = [/^varchar\(\d+\)$/, /^char\(\d+\)$/, /^decimal\(\d+, \d+\)$/, /^numeric\(\d+, \d+\)$/, /^binary\(\d+\)$/, /^datetime\(\d+\)$/, /^time\(\d+\)$/, /^timetz\(\d+\)$/, /^timestamp\(\d+\)$/, /^timestamptz\(\d+\)$/, /^varbinary\(\d+\)$/], t7 = c({ is: (e10) => "DataTypeNode" === e10.kind, create: (e10) => c({ kind: "DataTypeNode", dataType: e10 }) });
      function re(e10) {
        if (E(e10)) return e10.toOperationNode();
        if (t9.includes(e10) || t8.some((t10) => t10.test(e10))) return t7.create(e10);
        throw Error(`invalid column data type ${JSON.stringify(e10)}`);
      }
      let rt = c({ is: (e10) => "CastNode" === e10.kind, create: (e10, t10) => c({ kind: "CastNode", expression: e10, dataType: t10 }) });
      function rr(e10 = tk) {
        function t10(e11, t11) {
          return new tD(tz.create(W.create(e11), ee(t11)));
        }
        let r10 = Object.assign(function(e11, t11, r11) {
          return new tD(ep(e11, t11, r11));
        }, { fn: void 0, eb: void 0, selectFrom: (t11) => new t$({ queryId: tc(), executor: e10, queryNode: ej.createFrom(ro(t11)) }), case: (e11) => new tY({ node: tZ.create(n(e11) ? void 0 : ee(e11)) }), ref: (e11, t11) => n(t11) ? new tD(et(e11)) : new t4(function(e12, t12) {
          let r11 = et(e12);
          if (L(t12)) return G.create(r11, z.create(W.create(t12)));
          let i2 = t12.slice(0, -1);
          if (L(i2)) return G.create(r11, Z.create(W.create(i2)));
          throw Error(`Invalid JSON operator: ${t12}`);
        }(e11, t11)), jsonPath: () => new t4(Z.create()), table: (e11) => new tD(rl(e11)), val: (e11) => new tD(ed(e11)), refTuple: (...e11) => new tD(t5.create(e11.map(ee))), tuple: (...e11) => new tD(t5.create(e11.map(ed))), lit: (e11) => new tD(eu(e11)), unary: t10, not: (e11) => t10("not", e11), exists: (e11) => t10("exists", e11), neg: (e11) => t10("-", e11), between: (e11, t11, r11) => new tD(R.create(ee(e11), W.create("between"), T.create(ed(t11), ed(r11)))), betweenSymmetric: (e11, t11, r11) => new tD(R.create(ee(e11), W.create("between symmetric"), T.create(ed(t11), ed(r11)))), and: (e11) => new tD(p(e11) ? ey(e11, "and") : em(e11, "and")), or: (e11) => new tD(p(e11) ? ey(e11, "or") : em(e11, "or")), parens(...e11) {
          let t11 = eh(e11);
          return new tD(ec.is(t11) ? t11 : ec.create(t11));
        }, cast: (e11, t11) => new tD(rt.create(ee(e11), re(t11))), withSchema: (t11) => rr(e10.withPluginAtFront(new tg(t11))) });
        return r10.fn = tG(), r10.eb = r10, r10;
      }
      function ri(e10) {
        if (E(e10)) return e10.toOperationNode();
        if (l(e10)) return e10(rr()).toOperationNode();
        throw Error(`invalid expression: ${JSON.stringify(e10)}`);
      }
      function rn(e10) {
        if (E(e10)) return e10.toOperationNode();
        if (l(e10)) return e10(rr()).toOperationNode();
        throw Error(`invalid aliased expression: ${JSON.stringify(e10)}`);
      }
      function rs(e10) {
        return u(e10) && "expressionType" in e10 && E(e10) || u(e10) && "expression" in e10 && s(e10.alias) && E(e10) || l(e10);
      }
      function ro(e10) {
        return p(e10) ? e10.map((e11) => ra(e11)) : [ra(e10)];
      }
      function ra(e10) {
        return s(e10) ? rd(e10) : rn(e10);
      }
      function rd(e10) {
        let t10 = " as ";
        if (!e10.includes(t10)) return rl(e10);
        {
          let [r10, i2] = e10.split(t10).map(ru);
          return C.create(rl(r10), y.create(i2));
        }
      }
      function rl(e10) {
        if (!e10.includes(".")) return k.create(e10);
        {
          let [t10, r10] = e10.split(".").map(ru);
          return k.createWithSchema(t10, r10);
        }
      }
      function ru(e10) {
        return e10.trim();
      }
      let rc = c({ is: (e10) => "AddColumnNode" === e10.kind, create: (e10) => c({ kind: "AddColumnNode", column: e10 }) }), rh = c({ is: (e10) => "ColumnDefinitionNode" === e10.kind, create: (e10, t10) => c({ kind: "ColumnDefinitionNode", column: D.create(e10), dataType: t10 }), cloneWithFrontModifier: (e10, t10) => c({ ...e10, frontModifiers: e10.frontModifiers ? c([...e10.frontModifiers, t10]) : [t10] }), cloneWithEndModifier: (e10, t10) => c({ ...e10, endModifiers: e10.endModifiers ? c([...e10.endModifiers, t10]) : [t10] }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), rp = c({ is: (e10) => "DropColumnNode" === e10.kind, create: (e10) => c({ kind: "DropColumnNode", column: D.create(e10) }) }), rf = c({ is: (e10) => "RenameColumnNode" === e10.kind, create: (e10, t10) => c({ kind: "RenameColumnNode", column: D.create(e10), renameTo: D.create(t10) }) }), rm = c({ is: (e10) => "CheckConstraintNode" === e10.kind, create: (e10, t10) => c({ kind: "CheckConstraintNode", expression: e10, name: t10 ? y.create(t10) : void 0 }) }), ry = ["no action", "restrict", "cascade", "set null", "set default"], rg = c({ is: (e10) => "ReferencesNode" === e10.kind, create: (e10, t10) => c({ kind: "ReferencesNode", table: e10, columns: c([...t10]) }), cloneWithOnDelete: (e10, t10) => c({ ...e10, onDelete: t10 }), cloneWithOnUpdate: (e10, t10) => c({ ...e10, onUpdate: t10 }) });
      function rw(e10) {
        return E(e10) ? e10.toOperationNode() : ea.createImmediate(e10);
      }
      let rv = c({ is: (e10) => "GeneratedNode" === e10.kind, create: (e10) => c({ kind: "GeneratedNode", ...e10 }), createWithExpression: (e10) => c({ kind: "GeneratedNode", always: true, expression: e10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), rb = c({ is: (e10) => "DefaultValueNode" === e10.kind, create: (e10) => c({ kind: "DefaultValueNode", defaultValue: e10 }) });
      function rN(e10) {
        if (ry.includes(e10)) return e10;
        throw Error(`invalid OnModifyForeignAction ${e10}`);
      }
      class r_ {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        autoIncrement() {
          return new r_(rh.cloneWith(this.#_, { autoIncrement: true }));
        }
        identity() {
          return new r_(rh.cloneWith(this.#_, { identity: true }));
        }
        primaryKey() {
          return new r_(rh.cloneWith(this.#_, { primaryKey: true }));
        }
        references(e10) {
          let t10 = et(e10);
          if (!t10.table || j.is(t10.column)) throw Error(`invalid call references('${e10}'). The reference must have format table.column or schema.table.column`);
          return new r_(rh.cloneWith(this.#_, { references: rg.create(t10.table, [t10.column]) }));
        }
        onDelete(e10) {
          if (!this.#_.references) throw Error("on delete constraint can only be added for foreign keys");
          return new r_(rh.cloneWith(this.#_, { references: rg.cloneWithOnDelete(this.#_.references, rN(e10)) }));
        }
        onUpdate(e10) {
          if (!this.#_.references) throw Error("on update constraint can only be added for foreign keys");
          return new r_(rh.cloneWith(this.#_, { references: rg.cloneWithOnUpdate(this.#_.references, rN(e10)) }));
        }
        unique() {
          return new r_(rh.cloneWith(this.#_, { unique: true }));
        }
        notNull() {
          return new r_(rh.cloneWith(this.#_, { notNull: true }));
        }
        unsigned() {
          return new r_(rh.cloneWith(this.#_, { unsigned: true }));
        }
        defaultTo(e10) {
          return new r_(rh.cloneWith(this.#_, { defaultTo: rb.create(rw(e10)) }));
        }
        check(e10) {
          return new r_(rh.cloneWith(this.#_, { check: rm.create(e10.toOperationNode()) }));
        }
        generatedAlwaysAs(e10) {
          return new r_(rh.cloneWith(this.#_, { generated: rv.createWithExpression(e10.toOperationNode()) }));
        }
        generatedAlwaysAsIdentity() {
          return new r_(rh.cloneWith(this.#_, { generated: rv.create({ identity: true, always: true }) }));
        }
        generatedByDefaultAsIdentity() {
          return new r_(rh.cloneWith(this.#_, { generated: rv.create({ identity: true, byDefault: true }) }));
        }
        stored() {
          if (!this.#_.generated) throw Error("stored() can only be called after generatedAlwaysAs");
          return new r_(rh.cloneWith(this.#_, { generated: rv.cloneWith(this.#_.generated, { stored: true }) }));
        }
        modifyFront(e10) {
          return new r_(rh.cloneWithFrontModifier(this.#_, e10.toOperationNode()));
        }
        nullsNotDistinct() {
          return new r_(rh.cloneWith(this.#_, { nullsNotDistinct: true }));
        }
        ifNotExists() {
          return new r_(rh.cloneWith(this.#_, { ifNotExists: true }));
        }
        modifyEnd(e10) {
          return new r_(rh.cloneWithEndModifier(this.#_, e10.toOperationNode()));
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#_;
        }
      }
      ex(r_, "don't await ColumnDefinitionBuilder instances directly.");
      let rx = c({ is: (e10) => "ModifyColumnNode" === e10.kind, create: (e10) => c({ kind: "ModifyColumnNode", column: e10 }) }), rS = c({ is: (e10) => "ForeignKeyConstraintNode" === e10.kind, create: (e10, t10, r10, i2) => c({ kind: "ForeignKeyConstraintNode", columns: e10, references: rg.create(t10, r10), name: i2 ? y.create(i2) : void 0 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class rC {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        onDelete(e10) {
          return new rC(rS.cloneWith(this.#_, { onDelete: rN(e10) }));
        }
        onUpdate(e10) {
          return new rC(rS.cloneWith(this.#_, { onUpdate: rN(e10) }));
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#_;
        }
      }
      ex(rC, "don't await ForeignKeyConstraintBuilder instances directly.");
      let rk = c({ is: (e10) => "AddConstraintNode" === e10.kind, create: (e10) => c({ kind: "AddConstraintNode", constraint: e10 }) }), rE = c({ is: (e10) => "UniqueConstraintNode" === e10.kind, create: (e10, t10, r10) => c({ kind: "UniqueConstraintNode", columns: c(e10.map(D.create)), name: t10 ? y.create(t10) : void 0, nullsNotDistinct: r10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), rO = c({ is: (e10) => "DropConstraintNode" === e10.kind, create: (e10) => c({ kind: "DropConstraintNode", constraintName: y.create(e10) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) }), rT = c({ is: (e10) => "AlterColumnNode" === e10.kind, create: (e10, t10, r10) => c({ kind: "AlterColumnNode", column: D.create(e10), [t10]: r10 }) });
      class rA {
        #T;
        constructor(e10) {
          this.#T = e10;
        }
        setDataType(e10) {
          return new rI(rT.create(this.#T, "dataType", re(e10)));
        }
        setDefault(e10) {
          return new rI(rT.create(this.#T, "setDefault", rw(e10)));
        }
        dropDefault() {
          return new rI(rT.create(this.#T, "dropDefault", true));
        }
        setNotNull() {
          return new rI(rT.create(this.#T, "setNotNull", true));
        }
        dropNotNull() {
          return new rI(rT.create(this.#T, "dropNotNull", true));
        }
        $call(e10) {
          return e10(this);
        }
      }
      ex(rA, "don't await AlterColumnBuilder instances");
      class rI {
        #A;
        constructor(e10) {
          this.#A = e10;
        }
        toOperationNode() {
          return this.#A;
        }
      }
      ex(rI, "don't await AlteredColumnBuilder instances");
      class rP {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rP, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
      class rR {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        onDelete(e10) {
          return new rR({ ...this.#t, constraintBuilder: this.#t.constraintBuilder.onDelete(e10) });
        }
        onUpdate(e10) {
          return new rR({ ...this.#t, constraintBuilder: this.#t.constraintBuilder.onUpdate(e10) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(m.cloneWithTableProps(this.#t.node, { addConstraint: rk.create(this.#t.constraintBuilder.toOperationNode()) }), this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rR, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
      class rM {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifExists() {
          return new rM({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { dropConstraint: rO.cloneWith(this.#t.node.dropConstraint, { ifExists: true }) }) });
        }
        cascade() {
          return new rM({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { dropConstraint: rO.cloneWith(this.#t.node.dropConstraint, { modifier: "cascade" }) }) });
        }
        restrict() {
          return new rM({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { dropConstraint: rO.cloneWith(this.#t.node.dropConstraint, { modifier: "restrict" }) }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rM, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");
      let rq = c({ is: (e10) => "PrimaryKeyConstraintNode" === e10.kind, create: (e10, t10) => c({ kind: "PrimaryKeyConstraintNode", columns: c(e10.map(D.create)), name: t10 ? y.create(t10) : void 0 }) }), rW = c({ is: (e10) => "AddIndexNode" === e10.kind, create: (e10) => c({ kind: "AddIndexNode", name: y.create(e10) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }), cloneWithColumns: (e10, t10) => c({ ...e10, columns: [...e10.columns || [], ...t10] }) });
      class rL {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        unique() {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.cloneWith(this.#t.node.addIndex, { unique: true }) }) });
        }
        column(e10) {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.cloneWithColumns(this.#t.node.addIndex, [ei(e10)]) }) });
        }
        columns(e10) {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.cloneWithColumns(this.#t.node.addIndex, e10.map(ei)) }) });
        }
        expression(e10) {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.cloneWithColumns(this.#t.node.addIndex, [e10.toOperationNode()]) }) });
        }
        using(e10) {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.cloneWith(this.#t.node.addIndex, { using: Q.createWithSql(e10) }) }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rL, "don't await AlterTableAddIndexBuilder instances directly. To execute the query you need to call `execute`");
      class rD {
        #_;
        constructor(e10) {
          this.#_ = e10;
        }
        toOperationNode() {
          return this.#_;
        }
        nullsNotDistinct() {
          return new rD(rE.cloneWith(this.#_, { nullsNotDistinct: true }));
        }
      }
      ex(rD, "don't await UniqueConstraintNodeBuilder instances directly.");
      class rj {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        renameTo(e10) {
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { renameTo: rl(e10) }) });
        }
        setSchema(e10) {
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { setSchema: y.create(e10) }) });
        }
        alterColumn(e10, t10) {
          let r10 = t10(new rA(e10));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, r10.toOperationNode()) });
        }
        dropColumn(e10) {
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rp.create(e10)) });
        }
        renameColumn(e10, t10) {
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rf.create(e10, t10)) });
        }
        addColumn(e10, t10, r10 = f) {
          let i2 = r10(new r_(rh.create(e10, re(t10))));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rc.create(i2.toOperationNode())) });
        }
        modifyColumn(e10, t10, r10 = f) {
          let i2 = r10(new r_(rh.create(e10, re(t10))));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rx.create(i2.toOperationNode())) });
        }
        addUniqueConstraint(e10, t10, r10 = f) {
          let i2 = r10(new rD(rE.create(t10, e10)));
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addConstraint: rk.create(i2.toOperationNode()) }) });
        }
        addCheckConstraint(e10, t10) {
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addConstraint: rk.create(rm.create(t10.toOperationNode(), e10)) }) });
        }
        addForeignKeyConstraint(e10, t10, r10, i2) {
          return new rR({ ...this.#t, constraintBuilder: new rC(rS.create(t10.map(D.create), rl(r10), i2.map(D.create), e10)) });
        }
        addPrimaryKeyConstraint(e10, t10) {
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addConstraint: rk.create(rq.create(t10, e10)) }) });
        }
        dropConstraint(e10) {
          return new rM({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { dropConstraint: rO.create(e10) }) });
        }
        addIndex(e10) {
          return new rL({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { addIndex: rW.create(e10) }) });
        }
        dropIndex(e10) {
          return new rP({ ...this.#t, node: m.cloneWithTableProps(this.#t.node, { dropIndex: _.create(e10) }) });
        }
        $call(e10) {
          return e10(this);
        }
      }
      ex(rj, "don't await AlterTableBuilder instances");
      class rB {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        alterColumn(e10, t10) {
          let r10 = t10(new rA(e10));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, r10.toOperationNode()) });
        }
        dropColumn(e10) {
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rp.create(e10)) });
        }
        renameColumn(e10, t10) {
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rf.create(e10, t10)) });
        }
        addColumn(e10, t10, r10 = f) {
          let i2 = r10(new r_(rh.create(e10, re(t10))));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rc.create(i2.toOperationNode())) });
        }
        modifyColumn(e10, t10, r10 = f) {
          let i2 = r10(new r_(rh.create(e10, re(t10))));
          return new rB({ ...this.#t, node: m.cloneWithColumnAlteration(this.#t.node, rx.create(i2.toOperationNode())) });
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rB, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");
      class rF extends tp {
        transformValue(e10) {
          return { ...super.transformValue(e10), immediate: true };
        }
      }
      class rU {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifNotExists() {
          return new rU({ ...this.#t, node: g.cloneWith(this.#t.node, { ifNotExists: true }) });
        }
        unique() {
          return new rU({ ...this.#t, node: g.cloneWith(this.#t.node, { unique: true }) });
        }
        nullsNotDistinct() {
          return new rU({ ...this.#t, node: g.cloneWith(this.#t.node, { nullsNotDistinct: true }) });
        }
        on(e10) {
          return new rU({ ...this.#t, node: g.cloneWith(this.#t.node, { table: rl(e10) }) });
        }
        column(e10) {
          return new rU({ ...this.#t, node: g.cloneWithColumns(this.#t.node, [ei(e10)]) });
        }
        columns(e10) {
          return new rU({ ...this.#t, node: g.cloneWithColumns(this.#t.node, e10.map(ei)) });
        }
        expression(e10) {
          return new rU({ ...this.#t, node: g.cloneWithColumns(this.#t.node, [e10.toOperationNode()]) });
        }
        using(e10) {
          return new rU({ ...this.#t, node: g.cloneWith(this.#t.node, { using: Q.createWithSql(e10) }) });
        }
        where(...e10) {
          let t10 = new rF();
          return new rU({ ...this.#t, node: eG.cloneWithWhere(this.#t.node, t10.transformNode(eh(e10))) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rU, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
      class r$ {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifNotExists() {
          return new r$({ ...this.#t, node: w.cloneWith(this.#t.node, { ifNotExists: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(r$, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");
      class rQ {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        temporary() {
          return new rQ({ ...this.#t, node: b.cloneWith(this.#t.node, { temporary: true }) });
        }
        onCommit(e10) {
          return new rQ({ ...this.#t, node: b.cloneWith(this.#t.node, { onCommit: function(e11) {
            if (v.includes(e11)) return e11;
            throw Error(`invalid OnCommitAction ${e11}`);
          }(e10) }) });
        }
        ifNotExists() {
          return new rQ({ ...this.#t, node: b.cloneWith(this.#t.node, { ifNotExists: true }) });
        }
        addColumn(e10, t10, r10 = f) {
          let i2 = r10(new r_(rh.create(e10, re(t10))));
          return new rQ({ ...this.#t, node: b.cloneWithColumn(this.#t.node, i2.toOperationNode()) });
        }
        addPrimaryKeyConstraint(e10, t10) {
          return new rQ({ ...this.#t, node: b.cloneWithConstraint(this.#t.node, rq.create(t10, e10)) });
        }
        addUniqueConstraint(e10, t10, r10 = f) {
          let i2 = r10(new rD(rE.create(t10, e10)));
          return new rQ({ ...this.#t, node: b.cloneWithConstraint(this.#t.node, i2.toOperationNode()) });
        }
        addCheckConstraint(e10, t10) {
          return new rQ({ ...this.#t, node: b.cloneWithConstraint(this.#t.node, rm.create(t10.toOperationNode(), e10)) });
        }
        addForeignKeyConstraint(e10, t10, r10, i2, n2 = f) {
          let s2 = n2(new rC(rS.create(t10.map(D.create), rl(r10), i2.map(D.create), e10)));
          return new rQ({ ...this.#t, node: b.cloneWithConstraint(this.#t.node, s2.toOperationNode()) });
        }
        modifyFront(e10) {
          return new rQ({ ...this.#t, node: b.cloneWithFrontModifier(this.#t.node, e10.toOperationNode()) });
        }
        modifyEnd(e10) {
          return new rQ({ ...this.#t, node: b.cloneWithEndModifier(this.#t.node, e10.toOperationNode()) });
        }
        as(e10) {
          return new rQ({ ...this.#t, node: b.cloneWith(this.#t.node, { selectQuery: ri(e10) }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rQ, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
      class rV {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        on(e10) {
          return new rV({ ...this.#t, node: _.cloneWith(this.#t.node, { table: rl(e10) }) });
        }
        ifExists() {
          return new rV({ ...this.#t, node: _.cloneWith(this.#t.node, { ifExists: true }) });
        }
        cascade() {
          return new rV({ ...this.#t, node: _.cloneWith(this.#t.node, { cascade: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rV, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
      class rK {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifExists() {
          return new rK({ ...this.#t, node: x.cloneWith(this.#t.node, { ifExists: true }) });
        }
        cascade() {
          return new rK({ ...this.#t, node: x.cloneWith(this.#t.node, { cascade: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rK, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
      class rJ {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifExists() {
          return new rJ({ ...this.#t, node: S.cloneWith(this.#t.node, { ifExists: true }) });
        }
        cascade() {
          return new rJ({ ...this.#t, node: S.cloneWith(this.#t.node, { cascade: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rJ, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");
      let rH = c({ is: (e10) => "CreateViewNode" === e10.kind, create: (e10) => c({ kind: "CreateViewNode", name: N.create(e10) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class rG {
        #f = new rF();
        transformQuery(e10) {
          return this.#f.transformNode(e10.node);
        }
        transformResult(e10) {
          return Promise.resolve(e10.result);
        }
      }
      class rz {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        temporary() {
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { temporary: true }) });
        }
        materialized() {
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { materialized: true }) });
        }
        ifNotExists() {
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { ifNotExists: true }) });
        }
        orReplace() {
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { orReplace: true }) });
        }
        columns(e10) {
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { columns: e10.map(er) }) });
        }
        as(e10) {
          let t10 = e10.withPlugin(new rG()).toOperationNode();
          return new rz({ ...this.#t, node: rH.cloneWith(this.#t.node, { as: t10 }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rz, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");
      let rZ = c({ is: (e10) => "DropViewNode" === e10.kind, create: (e10) => c({ kind: "DropViewNode", name: N.create(e10) }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class rY {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        materialized() {
          return new rY({ ...this.#t, node: rZ.cloneWith(this.#t.node, { materialized: true }) });
        }
        ifExists() {
          return new rY({ ...this.#t, node: rZ.cloneWith(this.#t.node, { ifExists: true }) });
        }
        cascade() {
          return new rY({ ...this.#t, node: rZ.cloneWith(this.#t.node, { cascade: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(rY, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");
      let rX = c({ is: (e10) => "CreateTypeNode" === e10.kind, create: (e10) => c({ kind: "CreateTypeNode", name: e10 }), cloneWithEnum: (e10, t10) => c({ ...e10, enum: eo.create(t10.map((e11) => ea.createImmediate(e11))) }) });
      class r0 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        asEnum(e10) {
          return new r0({ ...this.#t, node: rX.cloneWithEnum(this.#t.node, e10) });
        }
        $call(e10) {
          return e10(this);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      ex(r0, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");
      let r1 = c({ is: (e10) => "DropTypeNode" === e10.kind, create: (e10) => c({ kind: "DropTypeNode", name: e10 }), cloneWith: (e10, t10) => c({ ...e10, ...t10 }) });
      class r2 {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        ifExists() {
          return new r2({ ...this.#t, node: r1.cloneWith(this.#t.node, { ifExists: true }) });
        }
        $call(e10) {
          return e10(this);
        }
        toOperationNode() {
          return this.#t.executor.transformQuery(this.#t.node, this.#t.queryId);
        }
        compile() {
          return this.#t.executor.compileQuery(this.toOperationNode(), this.#t.queryId);
        }
        async execute() {
          await this.#t.executor.executeQuery(this.compile(), this.#t.queryId);
        }
      }
      function r4(e10) {
        if (!e10.includes(".")) return N.create(e10);
        {
          let t10 = e10.split(".").map(r6);
          if (2 === t10.length) return N.createWithSchema(t10[0], t10[1]);
          throw Error(`invalid schemable identifier ${e10}`);
        }
      }
      function r6(e10) {
        return e10.trim();
      }
      ex(r2, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");
      class r3 {
        #I;
        constructor(e10) {
          this.#I = e10;
        }
        createTable(e10) {
          return new rQ({ queryId: tc(), executor: this.#I, node: b.create(rl(e10)) });
        }
        dropTable(e10) {
          return new rJ({ queryId: tc(), executor: this.#I, node: S.create(rl(e10)) });
        }
        createIndex(e10) {
          return new rU({ queryId: tc(), executor: this.#I, node: g.create(e10) });
        }
        dropIndex(e10) {
          return new rV({ queryId: tc(), executor: this.#I, node: _.create(e10) });
        }
        createSchema(e10) {
          return new r$({ queryId: tc(), executor: this.#I, node: w.create(e10) });
        }
        dropSchema(e10) {
          return new rK({ queryId: tc(), executor: this.#I, node: x.create(e10) });
        }
        alterTable(e10) {
          return new rj({ queryId: tc(), executor: this.#I, node: m.create(rl(e10)) });
        }
        createView(e10) {
          return new rz({ queryId: tc(), executor: this.#I, node: rH.create(e10) });
        }
        dropView(e10) {
          return new rY({ queryId: tc(), executor: this.#I, node: rZ.create(e10) });
        }
        createType(e10) {
          return new r0({ queryId: tc(), executor: this.#I, node: rX.create(r4(e10)) });
        }
        dropType(e10) {
          return new r2({ queryId: tc(), executor: this.#I, node: r1.create(r4(e10)) });
        }
        withPlugin(e10) {
          return new r3(this.#I.withPlugin(e10));
        }
        withoutPlugins() {
          return new r3(this.#I.withoutPlugins());
        }
        withSchema(e10) {
          return new r3(this.#I.withPluginAtFront(new tg(e10)));
        }
      }
      class r5 {
        ref(e10) {
          return new F(e10);
        }
      }
      class r9 {
        #P;
        constructor(e10) {
          this.#P = e10;
        }
        async provideConnection(e10) {
          let t10 = await this.#P.acquireConnection();
          try {
            return await e10(t10);
          } finally {
            await this.#P.releaseConnection(t10);
          }
        }
      }
      class r8 extends tS {
        #R;
        #M;
        #q;
        constructor(e10, t10, r10, i2 = []) {
          super(i2), this.#R = e10, this.#M = t10, this.#q = r10;
        }
        get adapter() {
          return this.#M;
        }
        compileQuery(e10) {
          return this.#R.compileQuery(e10);
        }
        provideConnection(e10) {
          return this.#q.provideConnection(e10);
        }
        withPlugins(e10) {
          return new r8(this.#R, this.#M, this.#q, [...this.plugins, ...e10]);
        }
        withPlugin(e10) {
          return new r8(this.#R, this.#M, this.#q, [...this.plugins, e10]);
        }
        withPluginAtFront(e10) {
          return new r8(this.#R, this.#M, this.#q, [e10, ...this.plugins]);
        }
        withConnectionProvider(e10) {
          return new r8(this.#R, this.#M, e10, [...this.plugins]);
        }
        withoutPlugins() {
          return new r8(this.#R, this.#M, this.#q, []);
        }
      }
      function r7() {
        return "undefined" != typeof performance && l(performance.now) ? performance.now() : Date.now();
      }
      class ie {
        #P;
        #W;
        #L;
        #D;
        #j;
        #B = /* @__PURE__ */ new WeakSet();
        constructor(e10, t10) {
          this.#D = false, this.#P = e10, this.#W = t10;
        }
        async init() {
          if (this.#j) throw Error("driver has already been destroyed");
          this.#L || (this.#L = this.#P.init().then(() => {
            this.#D = true;
          }).catch((e10) => (this.#L = void 0, Promise.reject(e10)))), await this.#L;
        }
        async acquireConnection() {
          if (this.#j) throw Error("driver has already been destroyed");
          this.#D || await this.init();
          let e10 = await this.#P.acquireConnection();
          return this.#B.has(e10) || (this.#F() && this.#U(e10), this.#B.add(e10)), e10;
        }
        async releaseConnection(e10) {
          await this.#P.releaseConnection(e10);
        }
        beginTransaction(e10, t10) {
          return this.#P.beginTransaction(e10, t10);
        }
        commitTransaction(e10) {
          return this.#P.commitTransaction(e10);
        }
        rollbackTransaction(e10) {
          return this.#P.rollbackTransaction(e10);
        }
        async destroy() {
          this.#L && (await this.#L, this.#j || (this.#j = this.#P.destroy().catch((e10) => (this.#j = void 0, Promise.reject(e10)))), await this.#j);
        }
        #F() {
          return this.#W.isLevelEnabled("query") || this.#W.isLevelEnabled("error");
        }
        #U(e10) {
          let t10 = e10.executeQuery;
          e10.executeQuery = async (r10) => {
            let i2;
            let n2 = r7();
            try {
              return await t10.call(e10, r10);
            } catch (e11) {
              throw i2 = e11, await this.#$(e11, r10, n2), e11;
            } finally {
              i2 || await this.#Q(r10, n2);
            }
          };
        }
        async #$(e10, t10, r10) {
          await this.#W.error(() => ({ level: "error", error: e10, query: t10, queryDurationMillis: this.#V(r10) }));
        }
        async #Q(e10, t10) {
          await this.#W.query(() => ({ level: "query", query: e10, queryDurationMillis: this.#V(t10) }));
        }
        #V(e10) {
          return r7() - e10;
        }
      }
      let it = () => {
      };
      class ir {
        #K;
        #J;
        constructor(e10) {
          this.#K = e10;
        }
        async provideConnection(e10) {
          for (; this.#J; ) await this.#J.catch(it);
          return this.#J = this.#H(e10).finally(() => {
            this.#J = void 0;
          }), this.#J;
        }
        async #H(e10) {
          return await e10(this.#K);
        }
      }
      let ii = ["read uncommitted", "read committed", "repeatable read", "serializable", "snapshot"];
      c(["query", "error"]);
      class is {
        #G;
        #z;
        constructor(e10) {
          l(e10) ? (this.#z = e10, this.#G = c({ query: true, error: true })) : (this.#z = io, this.#G = c({ query: e10.includes("query"), error: e10.includes("error") }));
        }
        isLevelEnabled(e10) {
          return this.#G[e10];
        }
        async query(e10) {
          this.#G.query && await this.#z(e10());
        }
        async error(e10) {
          this.#G.error && await this.#z(e10());
        }
      }
      function io(e10) {
        "query" === e10.level ? (console.log(`kysely:query: ${e10.query.sql}`), console.log(`kysely:query: duration: ${e10.queryDurationMillis.toFixed(1)}ms`)) : "error" === e10.level && (e10.error instanceof Error ? console.error(`kysely:error: ${e10.error.stack ?? e10.error.message}`) : console.error(`kysely:error: ${JSON.stringify({ error: e10.error, query: e10.query.sql, queryDurationMillis: e10.queryDurationMillis })}`));
      }
      class ia extends tP {
        #t;
        constructor(e10) {
          let t10, r10;
          if (function(e11) {
            return u(e11) && u(e11.config) && u(e11.driver) && u(e11.executor) && u(e11.dialect);
          }(e10)) t10 = { executor: e10.executor }, r10 = { ...e10 };
          else {
            let i2 = e10.dialect, n2 = i2.createDriver(), s2 = i2.createQueryCompiler(), o2 = i2.createAdapter(), a2 = new ie(n2, new is(e10.log ?? [])), d2 = new r8(s2, o2, new r9(a2), e10.plugins ?? []);
            t10 = { executor: d2 }, r10 = { config: e10, executor: d2, dialect: i2, driver: a2 };
          }
          super(t10), this.#t = c(r10);
        }
        get schema() {
          return new r3(this.#t.executor);
        }
        get dynamic() {
          return new r5();
        }
        get introspection() {
          return this.#t.dialect.createIntrospector(this.withoutPlugins());
        }
        case(e10) {
          return new tY({ node: tZ.create(n(e10) ? void 0 : ri(e10)) });
        }
        get fn() {
          return tG();
        }
        transaction() {
          return new iu({ ...this.#t });
        }
        connection() {
          return new il({ ...this.#t });
        }
        withPlugin(e10) {
          return new ia({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        withoutPlugins() {
          return new ia({ ...this.#t, executor: this.#t.executor.withoutPlugins() });
        }
        withSchema(e10) {
          return new ia({ ...this.#t, executor: this.#t.executor.withPluginAtFront(new tg(e10)) });
        }
        withTables() {
          return new ia({ ...this.#t });
        }
        async destroy() {
          await this.#t.driver.destroy();
        }
        get isTransaction() {
          return false;
        }
        getExecutor() {
          return this.#t.executor;
        }
        executeQuery(e10, t10 = tc()) {
          let r10 = u(e10) && l(e10.compile) ? e10.compile() : e10;
          return this.getExecutor().executeQuery(r10, t10);
        }
      }
      class id extends ia {
        #t;
        constructor(e10) {
          super(e10), this.#t = e10;
        }
        get isTransaction() {
          return true;
        }
        transaction() {
          throw Error("calling the transaction method for a Transaction is not supported");
        }
        connection() {
          throw Error("calling the connection method for a Transaction is not supported");
        }
        async destroy() {
          throw Error("calling the destroy method for a Transaction is not supported");
        }
        withPlugin(e10) {
          return new id({ ...this.#t, executor: this.#t.executor.withPlugin(e10) });
        }
        withoutPlugins() {
          return new id({ ...this.#t, executor: this.#t.executor.withoutPlugins() });
        }
        withSchema(e10) {
          return new id({ ...this.#t, executor: this.#t.executor.withPluginAtFront(new tg(e10)) });
        }
        withTables() {
          return new id({ ...this.#t });
        }
      }
      class il {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        async execute(e10) {
          return this.#t.executor.provideConnection(async (t10) => {
            let r10 = this.#t.executor.withConnectionProvider(new ir(t10)), i2 = new ia({ ...this.#t, executor: r10 });
            return await e10(i2);
          });
        }
      }
      ex(il, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
      class iu {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        setIsolationLevel(e10) {
          return new iu({ ...this.#t, isolationLevel: e10 });
        }
        async execute(e10) {
          let { isolationLevel: t10, ...r10 } = this.#t, i2 = { isolationLevel: t10 };
          return function(e11) {
            if (e11.isolationLevel && !ii.includes(e11.isolationLevel)) throw Error(`invalid transaction isolation level ${e11.isolationLevel}`);
          }(i2), this.#t.executor.provideConnection(async (t11) => {
            let n2 = this.#t.executor.withConnectionProvider(new ir(t11)), s2 = new id({ ...r10, executor: n2 });
            try {
              await this.#t.driver.beginTransaction(t11, i2);
              let r11 = await e10(s2);
              return await this.#t.driver.commitTransaction(t11), r11;
            } catch (e11) {
              throw await this.#t.driver.rollbackTransaction(t11), e11;
            }
          });
        }
      }
      ex(iu, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
      let ic = c({ raw: (e10, t10 = []) => c({ sql: e10, query: Q.createWithSql(e10), parameters: c(t10) }) }), ih = Symbol();
      class ip {
        #Z;
        #B = /* @__PURE__ */ new WeakMap();
        #Y;
        constructor(e10) {
          this.#Z = c({ ...e10 });
        }
        async init() {
          this.#Y = l(this.#Z.pool) ? await this.#Z.pool() : this.#Z.pool;
        }
        async acquireConnection() {
          let e10 = await this.#Y.connect(), t10 = this.#B.get(e10);
          return !t10 && (t10 = new im(e10, { cursor: this.#Z.cursor ?? null }), this.#B.set(e10, t10), this.#Z.onCreateConnection && await this.#Z.onCreateConnection(t10)), this.#Z.onReserveConnection && await this.#Z.onReserveConnection(t10), t10;
        }
        async beginTransaction(e10, t10) {
          t10.isolationLevel ? await e10.executeQuery(ic.raw(`start transaction isolation level ${t10.isolationLevel}`)) : await e10.executeQuery(ic.raw("begin"));
        }
        async commitTransaction(e10) {
          await e10.executeQuery(ic.raw("commit"));
        }
        async rollbackTransaction(e10) {
          await e10.executeQuery(ic.raw("rollback"));
        }
        async releaseConnection(e10) {
          e10[ih]();
        }
        async destroy() {
          if (this.#Y) {
            let e10 = this.#Y;
            this.#Y = void 0, await e10.end();
          }
        }
      }
      class im {
        #X;
        #ee;
        constructor(e10, t10) {
          this.#X = e10, this.#ee = t10;
        }
        async executeQuery(e10) {
          try {
            let t10 = await this.#X.query(e10.sql, [...e10.parameters]);
            if ("INSERT" === t10.command || "UPDATE" === t10.command || "DELETE" === t10.command || "MERGE" === t10.command) {
              let e11 = BigInt(t10.rowCount);
              return { numUpdatedOrDeletedRows: e11, numAffectedRows: e11, rows: t10.rows ?? [] };
            }
            return { rows: t10.rows ?? [] };
          } catch (e11) {
            throw function(e12, t10) {
              if (u(e12) && s(e12.stack) && t10.stack) {
                let r10 = t10.stack.split("\n").slice(1).join("\n");
                e12.stack += `
${r10}`;
              }
              return e12;
            }(e11, Error());
          }
        }
        async *streamQuery(e10, t10) {
          if (!this.#ee.cursor) throw Error("'cursor' is not present in your postgres dialect config. It's required to make streaming work in postgres.");
          if (!Number.isInteger(t10) || t10 <= 0) throw Error("chunkSize must be a positive integer");
          let r10 = this.#X.query(new this.#ee.cursor(e10.sql, e10.parameters.slice()));
          try {
            for (; ; ) {
              let e11 = await r10.read(t10);
              if (0 === e11.length) break;
              yield { rows: e11 };
            }
          } finally {
            await r10.close();
          }
        }
        [ih]() {
          this.#X.release();
        }
      }
      c({ __noMigrations__: true });
      class iy {
        #t;
        constructor(e10) {
          this.#t = c(e10);
        }
        get expressionType() {
        }
        get isRawBuilder() {
          return true;
        }
        as(e10) {
          return new iw(this, e10);
        }
        $castTo() {
          return new iy({ ...this.#t });
        }
        $notNull() {
          return new iy(this.#t);
        }
        withPlugin(e10) {
          return new iy({ ...this.#t, plugins: void 0 !== this.#t.plugins ? c([...this.#t.plugins, e10]) : c([e10]) });
        }
        toOperationNode() {
          return this.#et(this.#er());
        }
        compile(e10) {
          return this.#ei(this.#er(e10));
        }
        async execute(e10) {
          let t10 = this.#er(e10);
          return t10.executeQuery(this.#ei(t10), this.#t.queryId);
        }
        #er(e10) {
          let t10 = void 0 !== e10 ? e10.getExecutor() : tk;
          return void 0 !== this.#t.plugins ? t10.withPlugins(this.#t.plugins) : t10;
        }
        #et(e10) {
          return e10.transformQuery(this.#t.rawNode, this.#t.queryId);
        }
        #ei(e10) {
          return e10.compileQuery(this.#et(e10), this.#t.queryId);
        }
      }
      function ig(e10) {
        return new iy(e10);
      }
      ex(iy, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
      class iw {
        #en;
        #S;
        constructor(e10, t10) {
          this.#en = e10, this.#S = t10;
        }
        get expression() {
          return this.#en;
        }
        get alias() {
          return this.#S;
        }
        get rawBuilder() {
          return this.#en;
        }
        toOperationNode() {
          return C.create(this.#en.toOperationNode(), E(this.#S) ? this.#S.toOperationNode() : y.create(this.#S));
        }
      }
      ex(iw, "don't await AliasedRawBuilder instances directly. AliasedRawBuilder should never be executed directly since it's always a part of another query.");
      let iv = Object.assign((e10, ...t10) => ig({ queryId: tc(), rawNode: Q.create(e10, t10?.map(ib) ?? []) }), { ref: (e10) => ig({ queryId: tc(), rawNode: Q.createWithChild(et(e10)) }), val: (e10) => ig({ queryId: tc(), rawNode: Q.createWithChild(ed(e10)) }), value(e10) {
        return this.val(e10);
      }, table: (e10) => ig({ queryId: tc(), rawNode: Q.createWithChild(rl(e10)) }), id(...e10) {
        let t10 = Array(e10.length + 1).fill(".");
        return t10[0] = "", t10[t10.length - 1] = "", ig({ queryId: tc(), rawNode: Q.create(t10, e10.map(y.create)) });
      }, lit: (e10) => ig({ queryId: tc(), rawNode: Q.createWithChild(ea.createImmediate(e10)) }), literal(e10) {
        return this.lit(e10);
      }, raw: (e10) => ig({ queryId: tc(), rawNode: Q.createWithSql(e10) }), join(e10, t10 = iv`, `) {
        let r10 = Array(2 * e10.length - 1), i2 = t10.toOperationNode();
        for (let t11 = 0; t11 < e10.length; ++t11) r10[2 * t11] = ib(e10[t11]), t11 !== e10.length - 1 && (r10[2 * t11 + 1] = i2);
        return ig({ queryId: tc(), rawNode: Q.createWithChildren(r10) });
      } });
      function ib(e10) {
        return E(e10) ? e10.toOperationNode() : ed(e10);
      }
      class iN {
        #es;
        constructor(e10) {
          this.#es = e10;
        }
        async getSchemas() {
          return (await this.#es.selectFrom("pg_catalog.pg_namespace").select("nspname").$castTo().execute()).map((e10) => ({ name: e10.nspname }));
        }
        async getTables(e10 = { withInternalKyselyTables: false }) {
          let t10 = this.#es.selectFrom("pg_catalog.pg_attribute as a").innerJoin("pg_catalog.pg_class as c", "a.attrelid", "c.oid").innerJoin("pg_catalog.pg_namespace as ns", "c.relnamespace", "ns.oid").innerJoin("pg_catalog.pg_type as typ", "a.atttypid", "typ.oid").innerJoin("pg_catalog.pg_namespace as dtns", "typ.typnamespace", "dtns.oid").select(["a.attname as column", "a.attnotnull as not_null", "a.atthasdef as has_default", "c.relname as table", "c.relkind as table_type", "ns.nspname as schema", "typ.typname as type", "dtns.nspname as type_schema", iv`col_description(a.attrelid, a.attnum)`.as("column_description"), this.#es.selectFrom("pg_class").select(iv`true`.as("auto_incrementing")).whereRef("relnamespace", "=", "c.relnamespace").where("relkind", "=", "S").where("relname", "=", iv`c.relname || '_' || a.attname || '_seq'`).as("auto_incrementing")]).where((e11) => e11.or([e11("c.relkind", "=", "r"), e11("c.relkind", "=", "v"), e11("c.relkind", "=", "p")])).where("ns.nspname", "!~", "^pg_").where("ns.nspname", "!=", "information_schema").where("a.attnum", ">=", 0).where("a.attisdropped", "!=", true).orderBy("ns.nspname").orderBy("c.relname").orderBy("a.attnum").$castTo();
          e10.withInternalKyselyTables || (t10 = t10.where("c.relname", "!=", "kysely_migration").where("c.relname", "!=", "kysely_migration_lock"));
          let r10 = await t10.execute();
          return this.#eo(r10);
        }
        async getMetadata(e10) {
          return { tables: await this.getTables(e10) };
        }
        #eo(e10) {
          return e10.reduce((e11, t10) => {
            let r10 = e11.find((e12) => e12.name === t10.table && e12.schema === t10.schema);
            return r10 || (r10 = c({ name: t10.table, isView: "v" === t10.table_type, schema: t10.schema, columns: [] }), e11.push(r10)), r10.columns.push(c({ name: t10.column, dataType: t10.type, dataTypeSchema: t10.type_schema, isNullable: !t10.not_null, isAutoIncrementing: !!t10.auto_incrementing, hasDefaultValue: t10.has_default, comment: t10.column_description ?? void 0 })), e11;
          }, []);
        }
      }
      class i_ {
        nodeStack = [];
        get parentNode() {
          return this.nodeStack[this.nodeStack.length - 2];
        }
        #ea = c({ AliasNode: this.visitAlias.bind(this), ColumnNode: this.visitColumn.bind(this), IdentifierNode: this.visitIdentifier.bind(this), SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this), RawNode: this.visitRaw.bind(this), ReferenceNode: this.visitReference.bind(this), SelectQueryNode: this.visitSelectQuery.bind(this), SelectionNode: this.visitSelection.bind(this), TableNode: this.visitTable.bind(this), FromNode: this.visitFrom.bind(this), SelectAllNode: this.visitSelectAll.bind(this), AndNode: this.visitAnd.bind(this), OrNode: this.visitOr.bind(this), ValueNode: this.visitValue.bind(this), ValueListNode: this.visitValueList.bind(this), PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this), ParensNode: this.visitParens.bind(this), JoinNode: this.visitJoin.bind(this), OperatorNode: this.visitOperator.bind(this), WhereNode: this.visitWhere.bind(this), InsertQueryNode: this.visitInsertQuery.bind(this), DeleteQueryNode: this.visitDeleteQuery.bind(this), ReturningNode: this.visitReturning.bind(this), CreateTableNode: this.visitCreateTable.bind(this), AddColumnNode: this.visitAddColumn.bind(this), ColumnDefinitionNode: this.visitColumnDefinition.bind(this), DropTableNode: this.visitDropTable.bind(this), DataTypeNode: this.visitDataType.bind(this), OrderByNode: this.visitOrderBy.bind(this), OrderByItemNode: this.visitOrderByItem.bind(this), GroupByNode: this.visitGroupBy.bind(this), GroupByItemNode: this.visitGroupByItem.bind(this), UpdateQueryNode: this.visitUpdateQuery.bind(this), ColumnUpdateNode: this.visitColumnUpdate.bind(this), LimitNode: this.visitLimit.bind(this), OffsetNode: this.visitOffset.bind(this), OnConflictNode: this.visitOnConflict.bind(this), OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this), CreateIndexNode: this.visitCreateIndex.bind(this), DropIndexNode: this.visitDropIndex.bind(this), ListNode: this.visitList.bind(this), PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this), UniqueConstraintNode: this.visitUniqueConstraint.bind(this), ReferencesNode: this.visitReferences.bind(this), CheckConstraintNode: this.visitCheckConstraint.bind(this), WithNode: this.visitWith.bind(this), CommonTableExpressionNode: this.visitCommonTableExpression.bind(this), CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this), HavingNode: this.visitHaving.bind(this), CreateSchemaNode: this.visitCreateSchema.bind(this), DropSchemaNode: this.visitDropSchema.bind(this), AlterTableNode: this.visitAlterTable.bind(this), DropColumnNode: this.visitDropColumn.bind(this), RenameColumnNode: this.visitRenameColumn.bind(this), AlterColumnNode: this.visitAlterColumn.bind(this), ModifyColumnNode: this.visitModifyColumn.bind(this), AddConstraintNode: this.visitAddConstraint.bind(this), DropConstraintNode: this.visitDropConstraint.bind(this), ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this), CreateViewNode: this.visitCreateView.bind(this), DropViewNode: this.visitDropView.bind(this), GeneratedNode: this.visitGenerated.bind(this), DefaultValueNode: this.visitDefaultValue.bind(this), OnNode: this.visitOn.bind(this), ValuesNode: this.visitValues.bind(this), SelectModifierNode: this.visitSelectModifier.bind(this), CreateTypeNode: this.visitCreateType.bind(this), DropTypeNode: this.visitDropType.bind(this), ExplainNode: this.visitExplain.bind(this), DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this), AggregateFunctionNode: this.visitAggregateFunction.bind(this), OverNode: this.visitOver.bind(this), PartitionByNode: this.visitPartitionBy.bind(this), PartitionByItemNode: this.visitPartitionByItem.bind(this), SetOperationNode: this.visitSetOperation.bind(this), BinaryOperationNode: this.visitBinaryOperation.bind(this), UnaryOperationNode: this.visitUnaryOperation.bind(this), UsingNode: this.visitUsing.bind(this), FunctionNode: this.visitFunction.bind(this), CaseNode: this.visitCase.bind(this), WhenNode: this.visitWhen.bind(this), JSONReferenceNode: this.visitJSONReference.bind(this), JSONPathNode: this.visitJSONPath.bind(this), JSONPathLegNode: this.visitJSONPathLeg.bind(this), JSONOperatorChainNode: this.visitJSONOperatorChain.bind(this), TupleNode: this.visitTuple.bind(this), MergeQueryNode: this.visitMergeQuery.bind(this), MatchedNode: this.visitMatched.bind(this), AddIndexNode: this.visitAddIndex.bind(this), CastNode: this.visitCast.bind(this), FetchNode: this.visitFetch.bind(this), TopNode: this.visitTop.bind(this), OutputNode: this.visitOutput.bind(this) });
        visitNode = (e10) => {
          this.nodeStack.push(e10), this.#ea[e10.kind](e10), this.nodeStack.pop();
        };
      }
      class ix extends i_ {
        #ed = "";
        #el = [];
        get numParameters() {
          return this.#el.length;
        }
        compileQuery(e10) {
          return this.#ed = "", this.#el = [], this.nodeStack.splice(0, this.nodeStack.length), this.visitNode(e10), c({ query: e10, sql: this.getSql(), parameters: [...this.#el] });
        }
        getSql() {
          return this.#ed;
        }
        visitSelectQuery(e10) {
          let t10 = void 0 !== this.parentNode && !ec.is(this.parentNode) && !eq.is(this.parentNode) && !b.is(this.parentNode) && !rH.is(this.parentNode) && !tW.is(this.parentNode);
          void 0 === this.parentNode && e10.explain && (this.visitNode(e10.explain), this.append(" ")), t10 && this.append("("), e10.with && (this.visitNode(e10.with), this.append(" ")), this.append("select"), e10.distinctOn && (this.append(" "), this.compileDistinctOn(e10.distinctOn)), e10.frontModifiers?.length && (this.append(" "), this.compileList(e10.frontModifiers, " ")), e10.top && (this.append(" "), this.visitNode(e10.top)), e10.selections && (this.append(" "), this.compileList(e10.selections)), e10.from && (this.append(" "), this.visitNode(e10.from)), e10.joins && (this.append(" "), this.compileList(e10.joins, " ")), e10.where && (this.append(" "), this.visitNode(e10.where)), e10.groupBy && (this.append(" "), this.visitNode(e10.groupBy)), e10.having && (this.append(" "), this.visitNode(e10.having)), e10.setOperations && (this.append(" "), this.compileList(e10.setOperations, " ")), e10.orderBy && (this.append(" "), this.visitNode(e10.orderBy)), e10.limit && (this.append(" "), this.visitNode(e10.limit)), e10.offset && (this.append(" "), this.visitNode(e10.offset)), e10.fetch && (this.append(" "), this.visitNode(e10.fetch)), e10.endModifiers?.length && (this.append(" "), this.compileList(this.sortSelectModifiers([...e10.endModifiers]), " ")), t10 && this.append(")");
        }
        visitFrom(e10) {
          this.append("from "), this.compileList(e10.froms);
        }
        visitSelection(e10) {
          this.visitNode(e10.selection);
        }
        visitColumn(e10) {
          this.visitNode(e10.column);
        }
        compileDistinctOn(e10) {
          this.append("distinct on ("), this.compileList(e10), this.append(")");
        }
        compileList(e10, t10 = ", ") {
          let r10 = e10.length - 1;
          for (let i2 = 0; i2 <= r10; i2++) this.visitNode(e10[i2]), i2 < r10 && this.append(t10);
        }
        visitWhere(e10) {
          this.append("where "), this.visitNode(e10.where);
        }
        visitHaving(e10) {
          this.append("having "), this.visitNode(e10.having);
        }
        visitInsertQuery(e10) {
          let t10 = this.nodeStack.find(eG.is), r10 = t10 !== e10;
          !r10 && e10.explain && (this.visitNode(e10.explain), this.append(" ")), r10 && !eJ.is(t10) && this.append("("), e10.with && (this.visitNode(e10.with), this.append(" ")), this.append(e10.replace ? "replace" : "insert"), e10.ignore && this.append(" ignore"), e10.top && (this.append(" "), this.visitNode(e10.top)), e10.into && (this.append(" into "), this.visitNode(e10.into)), e10.columns && (this.append(" ("), this.compileList(e10.columns), this.append(")")), e10.output && (this.append(" "), this.visitNode(e10.output)), e10.values && (this.append(" "), this.visitNode(e10.values)), e10.defaultValues && (this.append(" "), this.append("default values")), e10.onConflict && (this.append(" "), this.visitNode(e10.onConflict)), e10.onDuplicateKey && (this.append(" "), this.visitNode(e10.onDuplicateKey)), e10.returning && (this.append(" "), this.visitNode(e10.returning)), r10 && !eJ.is(t10) && this.append(")"), e10.endModifiers?.length && (this.append(" "), this.compileList(e10.endModifiers, " "));
        }
        visitValues(e10) {
          this.append("values "), this.compileList(e10.values);
        }
        visitDeleteQuery(e10) {
          let t10 = this.nodeStack.find(eG.is) !== e10;
          !t10 && e10.explain && (this.visitNode(e10.explain), this.append(" ")), t10 && this.append("("), e10.with && (this.visitNode(e10.with), this.append(" ")), this.append("delete "), e10.top && (this.visitNode(e10.top), this.append(" ")), this.visitNode(e10.from), e10.output && (this.append(" "), this.visitNode(e10.output)), e10.using && (this.append(" "), this.visitNode(e10.using)), e10.joins && (this.append(" "), this.compileList(e10.joins, " ")), e10.where && (this.append(" "), this.visitNode(e10.where)), e10.orderBy && (this.append(" "), this.visitNode(e10.orderBy)), e10.limit && (this.append(" "), this.visitNode(e10.limit)), e10.returning && (this.append(" "), this.visitNode(e10.returning)), t10 && this.append(")"), e10.endModifiers?.length && (this.append(" "), this.compileList(e10.endModifiers, " "));
        }
        visitReturning(e10) {
          this.append("returning "), this.compileList(e10.selections);
        }
        visitAlias(e10) {
          this.visitNode(e10.node), this.append(" as "), this.visitNode(e10.alias);
        }
        visitReference(e10) {
          e10.table && (this.visitNode(e10.table), this.append(".")), this.visitNode(e10.column);
        }
        visitSelectAll(e10) {
          this.append("*");
        }
        visitIdentifier(e10) {
          this.append(this.getLeftIdentifierWrapper()), this.compileUnwrappedIdentifier(e10), this.append(this.getRightIdentifierWrapper());
        }
        compileUnwrappedIdentifier(e10) {
          if (!s(e10.name)) throw Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
          this.append(this.sanitizeIdentifier(e10.name));
        }
        visitAnd(e10) {
          this.visitNode(e10.left), this.append(" and "), this.visitNode(e10.right);
        }
        visitOr(e10) {
          this.visitNode(e10.left), this.append(" or "), this.visitNode(e10.right);
        }
        visitValue(e10) {
          e10.immediate ? this.appendImmediateValue(e10.value) : this.appendValue(e10.value);
        }
        visitValueList(e10) {
          this.append("("), this.compileList(e10.values), this.append(")");
        }
        visitTuple(e10) {
          this.append("("), this.compileList(e10.values), this.append(")");
        }
        visitPrimitiveValueList(e10) {
          this.append("(");
          let { values: t10 } = e10;
          for (let e11 = 0; e11 < t10.length; ++e11) this.appendValue(t10[e11]), e11 !== t10.length - 1 && this.append(", ");
          this.append(")");
        }
        visitParens(e10) {
          this.append("("), this.visitNode(e10.node), this.append(")");
        }
        visitJoin(e10) {
          this.append(ik[e10.joinType]), this.append(" "), this.visitNode(e10.table), e10.on && (this.append(" "), this.visitNode(e10.on));
        }
        visitOn(e10) {
          this.append("on "), this.visitNode(e10.on);
        }
        visitRaw(e10) {
          let { sqlFragments: t10, parameters: r10 } = e10;
          for (let e11 = 0; e11 < t10.length; ++e11) this.append(t10[e11]), r10.length > e11 && this.visitNode(r10[e11]);
        }
        visitOperator(e10) {
          this.append(e10.operator);
        }
        visitTable(e10) {
          this.visitNode(e10.table);
        }
        visitSchemableIdentifier(e10) {
          e10.schema && (this.visitNode(e10.schema), this.append(".")), this.visitNode(e10.identifier);
        }
        visitCreateTable(e10) {
          this.append("create "), e10.frontModifiers && e10.frontModifiers.length > 0 && (this.compileList(e10.frontModifiers, " "), this.append(" ")), e10.temporary && this.append("temporary "), this.append("table "), e10.ifNotExists && this.append("if not exists "), this.visitNode(e10.table), e10.selectQuery ? (this.append(" as "), this.visitNode(e10.selectQuery)) : (this.append(" ("), this.compileList([...e10.columns, ...e10.constraints ?? []]), this.append(")"), e10.onCommit && (this.append(" on commit "), this.append(e10.onCommit)), e10.endModifiers && e10.endModifiers.length > 0 && (this.append(" "), this.compileList(e10.endModifiers, " ")));
        }
        visitColumnDefinition(e10) {
          e10.ifNotExists && this.append("if not exists "), this.visitNode(e10.column), this.append(" "), this.visitNode(e10.dataType), e10.unsigned && this.append(" unsigned"), e10.frontModifiers && e10.frontModifiers.length > 0 && (this.append(" "), this.compileList(e10.frontModifiers, " ")), e10.generated && (this.append(" "), this.visitNode(e10.generated)), e10.identity && this.append(" identity"), e10.defaultTo && (this.append(" "), this.visitNode(e10.defaultTo)), e10.notNull && this.append(" not null"), e10.unique && this.append(" unique"), e10.nullsNotDistinct && this.append(" nulls not distinct"), e10.primaryKey && this.append(" primary key"), e10.autoIncrement && (this.append(" "), this.append(this.getAutoIncrement())), e10.references && (this.append(" "), this.visitNode(e10.references)), e10.check && (this.append(" "), this.visitNode(e10.check)), e10.endModifiers && e10.endModifiers.length > 0 && (this.append(" "), this.compileList(e10.endModifiers, " "));
        }
        getAutoIncrement() {
          return "auto_increment";
        }
        visitReferences(e10) {
          this.append("references "), this.visitNode(e10.table), this.append(" ("), this.compileList(e10.columns), this.append(")"), e10.onDelete && (this.append(" on delete "), this.append(e10.onDelete)), e10.onUpdate && (this.append(" on update "), this.append(e10.onUpdate));
        }
        visitDropTable(e10) {
          this.append("drop table "), e10.ifExists && this.append("if exists "), this.visitNode(e10.table), e10.cascade && this.append(" cascade");
        }
        visitDataType(e10) {
          this.append(e10.dataType);
        }
        visitOrderBy(e10) {
          this.append("order by "), this.compileList(e10.items);
        }
        visitOrderByItem(e10) {
          this.visitNode(e10.orderBy), e10.direction && (this.append(" "), this.visitNode(e10.direction));
        }
        visitGroupBy(e10) {
          this.append("group by "), this.compileList(e10.items);
        }
        visitGroupByItem(e10) {
          this.visitNode(e10.groupBy);
        }
        visitUpdateQuery(e10) {
          let t10 = this.nodeStack.find(eG.is), r10 = t10 !== e10;
          !r10 && e10.explain && (this.visitNode(e10.explain), this.append(" ")), r10 && !eJ.is(t10) && this.append("("), e10.with && (this.visitNode(e10.with), this.append(" ")), this.append("update "), e10.top && (this.visitNode(e10.top), this.append(" ")), e10.table && (this.visitNode(e10.table), this.append(" ")), this.append("set "), e10.updates && this.compileList(e10.updates), e10.output && (this.append(" "), this.visitNode(e10.output)), e10.from && (this.append(" "), this.visitNode(e10.from)), e10.joins && (this.append(" "), this.compileList(e10.joins, " ")), e10.where && (this.append(" "), this.visitNode(e10.where)), e10.limit && (this.append(" "), this.visitNode(e10.limit)), e10.returning && (this.append(" "), this.visitNode(e10.returning)), r10 && !eJ.is(t10) && this.append(")"), e10.endModifiers?.length && (this.append(" "), this.compileList(e10.endModifiers, " "));
        }
        visitColumnUpdate(e10) {
          this.visitNode(e10.column), this.append(" = "), this.visitNode(e10.value);
        }
        visitLimit(e10) {
          this.append("limit "), this.visitNode(e10.limit);
        }
        visitOffset(e10) {
          this.append("offset "), this.visitNode(e10.offset);
        }
        visitOnConflict(e10) {
          this.append("on conflict"), e10.columns ? (this.append(" ("), this.compileList(e10.columns), this.append(")")) : e10.constraint ? (this.append(" on constraint "), this.visitNode(e10.constraint)) : e10.indexExpression && (this.append(" ("), this.visitNode(e10.indexExpression), this.append(")")), e10.indexWhere && (this.append(" "), this.visitNode(e10.indexWhere)), true === e10.doNothing ? this.append(" do nothing") : e10.updates && (this.append(" do update set "), this.compileList(e10.updates), e10.updateWhere && (this.append(" "), this.visitNode(e10.updateWhere)));
        }
        visitOnDuplicateKey(e10) {
          this.append("on duplicate key update "), this.compileList(e10.updates);
        }
        visitCreateIndex(e10) {
          this.append("create "), e10.unique && this.append("unique "), this.append("index "), e10.ifNotExists && this.append("if not exists "), this.visitNode(e10.name), e10.table && (this.append(" on "), this.visitNode(e10.table)), e10.using && (this.append(" using "), this.visitNode(e10.using)), e10.columns && (this.append(" ("), this.compileList(e10.columns), this.append(")")), e10.nullsNotDistinct && this.append(" nulls not distinct"), e10.where && (this.append(" "), this.visitNode(e10.where));
        }
        visitDropIndex(e10) {
          this.append("drop index "), e10.ifExists && this.append("if exists "), this.visitNode(e10.name), e10.table && (this.append(" on "), this.visitNode(e10.table)), e10.cascade && this.append(" cascade");
        }
        visitCreateSchema(e10) {
          this.append("create schema "), e10.ifNotExists && this.append("if not exists "), this.visitNode(e10.schema);
        }
        visitDropSchema(e10) {
          this.append("drop schema "), e10.ifExists && this.append("if exists "), this.visitNode(e10.schema), e10.cascade && this.append(" cascade");
        }
        visitPrimaryKeyConstraint(e10) {
          e10.name && (this.append("constraint "), this.visitNode(e10.name), this.append(" ")), this.append("primary key ("), this.compileList(e10.columns), this.append(")");
        }
        visitUniqueConstraint(e10) {
          e10.name && (this.append("constraint "), this.visitNode(e10.name), this.append(" ")), this.append("unique"), e10.nullsNotDistinct && this.append(" nulls not distinct"), this.append(" ("), this.compileList(e10.columns), this.append(")");
        }
        visitCheckConstraint(e10) {
          e10.name && (this.append("constraint "), this.visitNode(e10.name), this.append(" ")), this.append("check ("), this.visitNode(e10.expression), this.append(")");
        }
        visitForeignKeyConstraint(e10) {
          e10.name && (this.append("constraint "), this.visitNode(e10.name), this.append(" ")), this.append("foreign key ("), this.compileList(e10.columns), this.append(") "), this.visitNode(e10.references), e10.onDelete && (this.append(" on delete "), this.append(e10.onDelete)), e10.onUpdate && (this.append(" on update "), this.append(e10.onUpdate));
        }
        visitList(e10) {
          this.compileList(e10.items);
        }
        visitWith(e10) {
          this.append("with "), e10.recursive && this.append("recursive "), this.compileList(e10.expressions);
        }
        visitCommonTableExpression(e10) {
          this.visitNode(e10.name), this.append(" as "), a(e10.materialized) && (e10.materialized || this.append("not "), this.append("materialized ")), this.visitNode(e10.expression);
        }
        visitCommonTableExpressionName(e10) {
          this.visitNode(e10.table), e10.columns && (this.append("("), this.compileList(e10.columns), this.append(")"));
        }
        visitAlterTable(e10) {
          this.append("alter table "), this.visitNode(e10.table), this.append(" "), e10.renameTo && (this.append("rename to "), this.visitNode(e10.renameTo)), e10.setSchema && (this.append("set schema "), this.visitNode(e10.setSchema)), e10.addConstraint && this.visitNode(e10.addConstraint), e10.dropConstraint && this.visitNode(e10.dropConstraint), e10.columnAlterations && this.compileColumnAlterations(e10.columnAlterations), e10.addIndex && this.visitNode(e10.addIndex), e10.dropIndex && this.visitNode(e10.dropIndex);
        }
        visitAddColumn(e10) {
          this.append("add column "), this.visitNode(e10.column);
        }
        visitRenameColumn(e10) {
          this.append("rename column "), this.visitNode(e10.column), this.append(" to "), this.visitNode(e10.renameTo);
        }
        visitDropColumn(e10) {
          this.append("drop column "), this.visitNode(e10.column);
        }
        visitAlterColumn(e10) {
          this.append("alter column "), this.visitNode(e10.column), this.append(" "), e10.dataType && (this.announcesNewColumnDataType() && this.append("type "), this.visitNode(e10.dataType), e10.dataTypeExpression && (this.append("using "), this.visitNode(e10.dataTypeExpression))), e10.setDefault && (this.append("set default "), this.visitNode(e10.setDefault)), e10.dropDefault && this.append("drop default"), e10.setNotNull && this.append("set not null"), e10.dropNotNull && this.append("drop not null");
        }
        visitModifyColumn(e10) {
          this.append("modify column "), this.visitNode(e10.column);
        }
        visitAddConstraint(e10) {
          this.append("add "), this.visitNode(e10.constraint);
        }
        visitDropConstraint(e10) {
          this.append("drop constraint "), e10.ifExists && this.append("if exists "), this.visitNode(e10.constraintName), "cascade" === e10.modifier ? this.append(" cascade") : "restrict" === e10.modifier && this.append(" restrict");
        }
        visitSetOperation(e10) {
          this.append(e10.operator), this.append(" "), e10.all && this.append("all "), this.visitNode(e10.expression);
        }
        visitCreateView(e10) {
          this.append("create "), e10.orReplace && this.append("or replace "), e10.materialized && this.append("materialized "), e10.temporary && this.append("temporary "), this.append("view "), e10.ifNotExists && this.append("if not exists "), this.visitNode(e10.name), this.append(" "), e10.columns && (this.append("("), this.compileList(e10.columns), this.append(") ")), e10.as && (this.append("as "), this.visitNode(e10.as));
        }
        visitDropView(e10) {
          this.append("drop "), e10.materialized && this.append("materialized "), this.append("view "), e10.ifExists && this.append("if exists "), this.visitNode(e10.name), e10.cascade && this.append(" cascade");
        }
        visitGenerated(e10) {
          this.append("generated "), e10.always && this.append("always "), e10.byDefault && this.append("by default "), this.append("as "), e10.identity && this.append("identity"), e10.expression && (this.append("("), this.visitNode(e10.expression), this.append(")")), e10.stored && this.append(" stored");
        }
        visitDefaultValue(e10) {
          this.append("default "), this.visitNode(e10.defaultValue);
        }
        visitSelectModifier(e10) {
          e10.rawModifier ? this.visitNode(e10.rawModifier) : this.append(iS[e10.modifier]), e10.of && (this.append(" of "), this.compileList(e10.of, ", "));
        }
        visitCreateType(e10) {
          this.append("create type "), this.visitNode(e10.name), e10.enum && (this.append(" as enum "), this.visitNode(e10.enum));
        }
        visitDropType(e10) {
          this.append("drop type "), e10.ifExists && this.append("if exists "), this.visitNode(e10.name);
        }
        visitExplain(e10) {
          this.append("explain"), (e10.options || e10.format) && (this.append(" "), this.append(this.getLeftExplainOptionsWrapper()), e10.options && (this.visitNode(e10.options), e10.format && this.append(this.getExplainOptionsDelimiter())), e10.format && (this.append("format"), this.append(this.getExplainOptionAssignment()), this.append(e10.format)), this.append(this.getRightExplainOptionsWrapper()));
        }
        visitDefaultInsertValue(e10) {
          this.append("default");
        }
        visitAggregateFunction(e10) {
          this.append(e10.func), this.append("("), e10.distinct && this.append("distinct "), this.compileList(e10.aggregated), e10.orderBy && (this.append(" "), this.visitNode(e10.orderBy)), this.append(")"), e10.filter && (this.append(" filter("), this.visitNode(e10.filter), this.append(")")), e10.over && (this.append(" "), this.visitNode(e10.over));
        }
        visitOver(e10) {
          this.append("over("), e10.partitionBy && (this.visitNode(e10.partitionBy), e10.orderBy && this.append(" ")), e10.orderBy && this.visitNode(e10.orderBy), this.append(")");
        }
        visitPartitionBy(e10) {
          this.append("partition by "), this.compileList(e10.items);
        }
        visitPartitionByItem(e10) {
          this.visitNode(e10.partitionBy);
        }
        visitBinaryOperation(e10) {
          this.visitNode(e10.leftOperand), this.append(" "), this.visitNode(e10.operator), this.append(" "), this.visitNode(e10.rightOperand);
        }
        visitUnaryOperation(e10) {
          this.visitNode(e10.operator), this.isMinusOperator(e10.operator) || this.append(" "), this.visitNode(e10.operand);
        }
        isMinusOperator(e10) {
          return W.is(e10) && "-" === e10.operator;
        }
        visitUsing(e10) {
          this.append("using "), this.compileList(e10.tables);
        }
        visitFunction(e10) {
          this.append(e10.func), this.append("("), this.compileList(e10.arguments), this.append(")");
        }
        visitCase(e10) {
          this.append("case"), e10.value && (this.append(" "), this.visitNode(e10.value)), e10.when && (this.append(" "), this.compileList(e10.when, " ")), e10.else && (this.append(" else "), this.visitNode(e10.else)), this.append(" end"), e10.isStatement && this.append(" case");
        }
        visitWhen(e10) {
          this.append("when "), this.visitNode(e10.condition), e10.result && (this.append(" then "), this.visitNode(e10.result));
        }
        visitJSONReference(e10) {
          this.visitNode(e10.reference), this.visitNode(e10.traversal);
        }
        visitJSONPath(e10) {
          for (let t10 of (e10.inOperator && this.visitNode(e10.inOperator), this.append("'$"), e10.pathLegs)) this.visitNode(t10);
          this.append("'");
        }
        visitJSONPathLeg(e10) {
          let t10 = "ArrayLocation" === e10.type;
          this.append(t10 ? "[" : "."), this.append(String(e10.value)), t10 && this.append("]");
        }
        visitJSONOperatorChain(e10) {
          for (let t10 = 0, r10 = e10.values.length; t10 < r10; t10++) t10 === r10 - 1 ? this.visitNode(e10.operator) : this.append("->"), this.visitNode(e10.values[t10]);
        }
        visitMergeQuery(e10) {
          e10.with && (this.visitNode(e10.with), this.append(" ")), this.append("merge "), e10.top && (this.visitNode(e10.top), this.append(" ")), this.append("into "), this.visitNode(e10.into), e10.using && (this.append(" "), this.visitNode(e10.using)), e10.whens && (this.append(" "), this.compileList(e10.whens, " ")), e10.output && (this.append(" "), this.visitNode(e10.output)), e10.endModifiers?.length && (this.append(" "), this.compileList(e10.endModifiers, " "));
        }
        visitMatched(e10) {
          e10.not && this.append("not "), this.append("matched"), e10.bySource && this.append(" by source");
        }
        visitAddIndex(e10) {
          this.append("add "), e10.unique && this.append("unique "), this.append("index "), this.visitNode(e10.name), e10.columns && (this.append(" ("), this.compileList(e10.columns), this.append(")")), e10.using && (this.append(" using "), this.visitNode(e10.using));
        }
        visitCast(e10) {
          this.append("cast("), this.visitNode(e10.expression), this.append(" as "), this.visitNode(e10.dataType), this.append(")");
        }
        visitFetch(e10) {
          this.append("fetch next "), this.visitNode(e10.rowCount), this.append(` rows ${e10.modifier}`);
        }
        visitOutput(e10) {
          this.append("output "), this.compileList(e10.selections);
        }
        visitTop(e10) {
          this.append(`top(${e10.expression})`), e10.modifiers && this.append(` ${e10.modifiers}`);
        }
        append(e10) {
          this.#ed += e10;
        }
        appendValue(e10) {
          this.addParameter(e10), this.append(this.getCurrentParameterPlaceholder());
        }
        getLeftIdentifierWrapper() {
          return '"';
        }
        getRightIdentifierWrapper() {
          return '"';
        }
        getCurrentParameterPlaceholder() {
          return "$" + this.numParameters;
        }
        getLeftExplainOptionsWrapper() {
          return "(";
        }
        getExplainOptionAssignment() {
          return " ";
        }
        getExplainOptionsDelimiter() {
          return ", ";
        }
        getRightExplainOptionsWrapper() {
          return ")";
        }
        sanitizeIdentifier(e10) {
          let t10 = this.getLeftIdentifierWrapper(), r10 = this.getRightIdentifierWrapper(), i2 = "";
          for (let n2 of e10) i2 += n2, n2 === t10 ? i2 += t10 : n2 === r10 && (i2 += r10);
          return i2;
        }
        addParameter(e10) {
          this.#el.push(e10);
        }
        appendImmediateValue(e10) {
          if (s(e10)) this.append(`'${e10}'`);
          else if (o(e10) || a(e10)) this.append(e10.toString());
          else if (null === e10) this.append("null");
          else {
            if (e10 instanceof Date) this.appendImmediateValue(e10.toISOString());
            else if (d(e10)) this.appendImmediateValue(e10.toString());
            else throw Error(`invalid immediate value ${e10}`);
          }
        }
        sortSelectModifiers(e10) {
          return e10.sort((e11, t10) => e11.modifier && t10.modifier ? iC[e11.modifier] - iC[t10.modifier] : 1), c(e10);
        }
        compileColumnAlterations(e10) {
          this.compileList(e10);
        }
        announcesNewColumnDataType() {
          return true;
        }
      }
      let iS = c({ ForKeyShare: "for key share", ForNoKeyUpdate: "for no key update", ForUpdate: "for update", ForShare: "for share", NoWait: "nowait", SkipLocked: "skip locked", Distinct: "distinct" }), iC = c({ ForKeyShare: 1, ForNoKeyUpdate: 1, ForUpdate: 1, ForShare: 1, NoWait: 2, SkipLocked: 2, Distinct: 0 }), ik = c({ InnerJoin: "inner join", LeftJoin: "left join", RightJoin: "right join", FullJoin: "full join", LateralInnerJoin: "inner join lateral", LateralLeftJoin: "left join lateral", Using: "using" }), iE = /"/g;
      class iO extends ix {
        sanitizeIdentifier(e10) {
          return e10.replace(iE, '""');
        }
      }
      class iT {
        get supportsCreateIfNotExists() {
          return true;
        }
        get supportsTransactionalDdl() {
          return false;
        }
        get supportsReturning() {
          return false;
        }
        get supportsOutput() {
          return false;
        }
      }
      let iA = BigInt("3853314791062309107");
      class iI extends iT {
        get supportsTransactionalDdl() {
          return true;
        }
        get supportsReturning() {
          return true;
        }
        async acquireMigrationLock(e10, t10) {
          await iv`select pg_advisory_xact_lock(${iv.lit(iA)})`.execute(e10);
        }
        async releaseMigrationLock(e10, t10) {
        }
      }
      class iP {
        #Z;
        constructor(e10) {
          this.#Z = e10;
        }
        createDriver() {
          return new ip(this.#Z);
        }
        createQueryCompiler() {
          return new iO();
        }
        createAdapter() {
          return new iI();
        }
        createIntrospector(e10) {
          return new iN(e10);
        }
      }
      var iR = r(6679);
      iR.Client, iR.Pool, iR.Connection, iR.types, iR.Query, iR.DatabaseError, iR.escapeIdentifier, iR.escapeLiteral, iR.Result, iR.TypeOverrides, iR.defaults;
      let { Pool: iM } = iR, iq = null;
      function iW(e10) {
        return iq || (iq = new ia({ dialect: new iP({ pool: new iM({ connectionString: function(e11) {
          if (e11?.hyperdrive?.connectionString) return e11.hyperdrive.connectionString;
          if (e11?.connectionString) return e11.connectionString;
          let t10 = process.env.IAM_DATABASE_URL;
          if (t10) return t10;
          throw Error("IAM_DATABASE_URL is required to construct @ando/db client (or pass { connectionString } / { hyperdrive })");
        }(e10), max: e10?.max ?? 5 }) }) }));
      }
      async function iL() {
        iq && (await iq.destroy(), iq = null);
      }
      function iD() {
        iq = null;
      }
      let ij = { async upsertUserByEmail(e10) {
        var t10;
        let r10 = iW();
        return { id: (t10 = await r10.insertInto("iam.users").values({ email: e10 }).onConflict((e11) => e11.column("email").doUpdateSet({ email: (e12) => e12.ref("excluded.email") })).returning(["id", "email", "disabled_at"]).executeTakeFirstOrThrow()).id, email: t10.email, disabledAt: t10.disabled_at };
      }, async getAppAccess(e10, t10) {
        let r10 = iW(), i2 = await r10.selectFrom("iam.app_access").where("user_id", "=", e10).where("app_slug", "=", t10).select(["role"]).executeTakeFirst();
        return i2 ? { role: i2.role } : null;
      }, async grantAccess({ userId: e10, appSlug: t10, role: r10, grantedBy: i2 }) {
        let n2 = iW();
        await n2.transaction().execute(async (n3) => {
          await n3.insertInto("iam.app_access").values({ user_id: e10, app_slug: t10, role: r10, granted_by: i2 }).onConflict((e11) => e11.columns(["user_id", "app_slug"]).doUpdateSet({ role: r10, granted_by: i2 })).execute(), await n3.insertInto("iam.audit_log").values({ actor_id: i2, action: "app_access.grant", target: { userId: e10, appSlug: t10, role: r10 } }).execute();
        });
      }, async revokeAccess({ userId: e10, appSlug: t10 }) {
        let r10 = iW();
        await r10.transaction().execute(async (r11) => {
          await r11.deleteFrom("iam.app_access").where("user_id", "=", e10).where("app_slug", "=", t10).execute(), await r11.insertInto("iam.audit_log").values({ actor_id: null, action: "app_access.revoke", target: { userId: e10, appSlug: t10 } }).execute();
        });
      }, async disableUser(e10) {
        let t10 = iW();
        await t10.transaction().execute(async (t11) => {
          await t11.updateTable("iam.users").set({ disabled_at: /* @__PURE__ */ new Date() }).where("id", "=", e10).execute(), await t11.insertInto("iam.audit_log").values({ actor_id: null, action: "user.disable", target: { userId: e10 } }).execute();
        });
      }, async listAppAccess(e10) {
        let t10 = iW();
        return (await t10.selectFrom("iam.app_access").where("user_id", "=", e10).select(["app_slug", "role"]).execute()).map((e11) => ({ appSlug: e11.app_slug, role: e11.role }));
      }, async appendAuditLog({ actorId: e10, action: t10, target: r10 }) {
        let i2 = iW();
        await i2.insertInto("iam.audit_log").values({ actor_id: e10, action: t10, target: r10 }).execute();
      } };
    } }, (e) => {
      var t = e(e.s = 5300);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/|favicon|no-access|api\\/test\\/).*))(.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": false, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": true, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "experimental": { "multiZoneDraftMode": false, "prerenderEarlyExit": false, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 9, "memoryBasedWorkersCount": false, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "outputFileTracingRoot": "/Users/asifkhan/claude-ak/coding-projects/workspace-monorepo", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "bundlePagesExternals": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "missingSuspenseWithCSRBailout": true, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 30, "static": 300 }, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "configFileName": "next.config.js", "transpilePackages": ["@ando/auth", "@ando/config", "@ando/db", "@ando/ui"] };
var BuildId = "o5Rcx4d08tD5Q4hVHgUPy";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/no-access", "regex": "^/no\\-access(?:/)?$", "routeKeys": {}, "namedRegex": "^/no\\-access(?:/)?$" }], "dynamic": [], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/no-access": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/no-access", "dataRoute": "/no-access.rsc" } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "0a1621982f6ad4866554126339c883d0", "previewModeSigningKey": "9a6785f63b77beb43c55bcbfda8ab4ec07cc1e9bb495b6b5604e816f3e70e9d4", "previewModeEncryptionKey": "e709876969e3c599ef44eaa04c41532abbf7c344a6a4ddff22876653a3d9ca1a" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/|favicon|no-access|api\\/test\\/).*))(.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/|favicon|no-access|api/test/).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "o5Rcx4d08tD5Q4hVHgUPy", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ipoNBfDjbvLjpbyddNKuyKFi5NiOUxbwbjbJenB7lZc=", "__NEXT_PREVIEW_MODE_ID": "0a1621982f6ad4866554126339c883d0", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "e709876969e3c599ef44eaa04c41532abbf7c344a6a4ddff22876653a3d9ca1a", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "9a6785f63b77beb43c55bcbfda8ab4ec07cc1e9bb495b6b5604e816f3e70e9d4" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/api/test/grant/route": "/api/test/grant", "/page": "/", "/no-access/page": "/no-access" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/no-access": {} } };
var PagesManifest = { "/_error": "pages/_error.js", "/_app": "pages/_app.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream2 } from "node:stream/web";

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream2({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// ../../node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// ../../node_modules/.pnpm/@opennextjs+aws@3.10.1_next@14.2.15_@playwright+test@1.59.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
