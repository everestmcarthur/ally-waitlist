var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../../../../../claw/.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// src/admin-html.ts
var _a;
function adminDashboardHtml() {
  return String.raw(_a || (_a = __template([`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ally Waitlist Admin</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#e4e4e7;min-height:100vh}
nav{background:#12121a;border-bottom:1px solid rgba(255,255,255,.08);padding:0 24px;display:flex;align-items:center;gap:16px;height:52px}
.logo{font-weight:700;font-size:16px;color:#818cf8}
.logo span{color:#71717a;font-weight:400;font-size:13px;margin-left:8px}
.stats{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
.stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:4px 12px;font-size:13px;cursor:pointer}
.stat:hover{border-color:rgba(99,102,241,.3)}
.stat b{color:#f9fafb}
main{padding:24px;max-width:1200px;margin:0 auto}
.toolbar{display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap}
select,input[type=text]{background:#1a1a2e;border:1px solid rgba(255,255,255,.1);color:#e4e4e7;border-radius:6px;padding:6px 10px;font-size:13px;outline:none}
select:focus,input:focus{border-color:#6366f1}
.btn{padding:7px 14px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .15s}
.btn-p{background:#6366f1;color:#fff}.btn-p:hover{background:#4f46e5}
.btn-g{background:rgba(34,197,94,.12);color:#22c55e;border:1px solid rgba(34,197,94,.2)}.btn-g:hover{background:rgba(34,197,94,.22)}
.btn-r{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)}.btn-r:hover{background:rgba(239,68,68,.2)}
.btn-q{background:rgba(255,255,255,.04);color:#a1a1aa;border:1px solid rgba(255,255,255,.08)}.btn-q:hover{background:rgba(255,255,255,.09)}
.btn:disabled{opacity:.35;cursor:default}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{border-bottom:1px solid rgba(255,255,255,.07)}
th{text-align:left;padding:8px 10px;color:#71717a;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background .1s}
tbody tr:hover{background:rgba(255,255,255,.02)}
td{padding:10px;vertical-align:middle}
.badge{display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600}
.b-pending{background:rgba(245,158,11,.12);color:#fbbf24}
.b-approved{background:rgba(99,102,241,.12);color:#818cf8}
.b-registered{background:rgba(34,197,94,.12);color:#4ade80}
.b-rejected{background:rgba(239,68,68,.1);color:#f87171}
.cb{width:15px;height:15px;cursor:pointer;accent-color:#6366f1}
.em{font-weight:500;color:#f9fafb}
.dim{color:#71717a;font-size:12px}
.nc{max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#52525b;font-size:12px}
.pag{display:flex;gap:8px;align-items:center;margin-top:16px;font-size:13px;color:#71717a}
#login{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px}
#login h2{font-size:20px;font-weight:700;color:#f9fafb}
#login input{width:280px;padding:10px 14px;font-size:14px}
.toast{position:fixed;bottom:24px;right:24px;background:#1a1a2e;border:1px solid rgba(99,102,241,.3);color:#e4e4e7;padding:12px 20px;border-radius:10px;font-size:14px;z-index:999;opacity:0;transition:opacity .25s;pointer-events:none}
.toast.on{opacity:1}
.acts{display:flex;gap:4px}
</style>
</head>
<body>

<div id="login">
  <h2>Ally Waitlist Admin</h2>
  <input id="si" type="password" placeholder="Admin secret" onkeydown="if(event.key==='Enter')doLogin()">
  <button class="btn btn-p" onclick="doLogin()">Sign in</button>
</div>

<div id="app" style="display:none">
<nav><span class="logo">Ally <span>Waitlist</span></span><div class="stats" id="sb"></div></nav>
<main>
  <div class="toolbar">
    <select id="fs" onchange="currentOffset=0;load()">
      <option value="all">All statuses</option>
      <option value="pending" selected>Pending</option>
      <option value="approved">Approved</option>
      <option value="registered">Registered</option>
      <option value="rejected">Rejected</option>
    </select>
    <input type="text" id="sq" placeholder="Search email / name" oninput="filterRows()" style="width:200px">
    <button class="btn btn-g" onclick="approveSelected()">Approve selected</button>
    <button class="btn btn-r" onclick="rejectSelected()">Reject selected</button>
    <button class="btn btn-q" onclick="resendSelected()">Resend invite</button>
    <button class="btn btn-q" style="margin-left:auto" onclick="load()">Refresh</button>
  </div>
  <table>
    <thead><tr>
      <th><input type="checkbox" class="cb" onchange="toggleAll(this)"></th>
      <th>ID</th><th>Email</th><th>Name</th><th>Status</th><th>Referrer</th><th>Joined</th><th>Note</th><th>Actions</th>
    </tr></thead>
    <tbody id="tb"><tr><td colspan="9" style="text-align:center;padding:32px;color:#52525b">Loading...</td></tr></tbody>
  </table>
  <div class="pag">
    <button class="btn btn-q" id="pp" onclick="prevPage()">Prev</button>
    <span id="pi"></span>
    <button class="btn btn-q" id="np" onclick="nextPage()">Next</button>
  </div>
</main>
</div>
<div class="toast" id="toast"></div>
<script>
var SEC='',rows=[],currentOffset=0,PAGE=100,toastT=null;
(function(){var s=sessionStorage.getItem('wl_sec');if(s){SEC=s;document.getElementById('login').style.display='none';document.getElementById('app').style.display='';load();loadStats();}})();
function doLogin(){var v=document.getElementById('si').value.trim();if(!v)return;SEC=v;sessionStorage.setItem('wl_sec',SEC);document.getElementById('login').style.display='none';document.getElementById('app').style.display='';load();loadStats();}
async function api(path,opts){opts=opts||{};var r=await fetch(path,Object.assign({},opts,{headers:Object.assign({'authorization':'Bearer '+SEC,'content-type':'application/json'},opts.headers||{})}));if(r.status===401){toast('Unauthorized');return null;}return r.json();}
async function loadStats(){var ss=['pending','approved','registered','rejected'];var cc=await Promise.all(ss.map(function(s){return api('/admin/entries?status='+s+'&limit=1').then(function(d){return d?d.total:0;});}));var col={pending:'#fbbf24',approved:'#818cf8',registered:'#4ade80',rejected:'#f87171'};document.getElementById('sb').innerHTML=ss.map(function(s,i){return '<div class="stat" onclick="filterBy(''+s+'')"><b style="color:'+col[s]+'">'+cc[i]+'</b> '+s+'</div>';}).join('');}
function filterBy(s){document.getElementById('fs').value=s;currentOffset=0;load();}
async function load(){var s=document.getElementById('fs').value;var d=await api('/admin/entries?status='+s+'&limit='+PAGE+'&offset='+currentOffset);if(!d)return;rows=d.entries;renderRows(rows);document.getElementById('pi').textContent=(currentOffset+1)+'-'+Math.min(currentOffset+PAGE,d.total)+' of '+d.total;document.getElementById('pp').disabled=currentOffset===0;document.getElementById('np').disabled=currentOffset+PAGE>=d.total;loadStats();}
function prevPage(){currentOffset=Math.max(0,currentOffset-PAGE);load();}
function nextPage(){currentOffset+=PAGE;load();}
function filterRows(){var q=document.getElementById('sq').value.toLowerCase();renderRows(q?rows.filter(function(e){return e.email.includes(q)||(e.name||'').toLowerCase().includes(q);}):rows);}
function fmt(ts){return ts?new Date(ts*1000).toLocaleDateString():'\u2014';}
function renderRows(es){var tb=document.getElementById('tb');if(!es.length){tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:32px;color:#52525b">No entries</td></tr>';return;}tb.innerHTML=es.map(function(e){var acts=[];if(e.status==='pending'){acts.push('<button class="btn btn-g" style="padding:3px 8px;font-size:11px" onclick="approveOne('+e.id+')">Approve</button>');acts.push('<button class="btn btn-r" style="padding:3px 8px;font-size:11px" onclick="rejectOne('+e.id+')">Reject</button>');}if(e.status==='approved')acts.push('<button class="btn btn-q" style="padding:3px 8px;font-size:11px" onclick="resendOne('+e.id+')">Resend</button>');acts.push('<button class="btn btn-q" style="padding:3px 8px;font-size:11px" onclick="editNote('+e.id+')">Note</button>');return '<tr data-id="'+e.id+'"><td><input type="checkbox" class="cb rc" value="'+e.id+'"></td><td class="dim">'+e.id+'</td><td class="em">'+e.email+'</td><td class="dim">'+(e.name||'\u2014')+'</td><td><span class="badge b-'+e.status+'">'+e.status+'</span></td><td class="dim">'+(e.referrer||'\u2014')+'</td><td class="dim">'+fmt(e.created_at)+'</td><td class="nc" title="'+(e.notes||'')+'">'+(e.notes||'\u2014')+'</td><td><div class="acts">'+acts.join('')+'</div></td></tr>';}).join('');}
function selected(){return Array.from(document.querySelectorAll('.rc:checked')).map(function(c){return +c.value;});}
function toggleAll(cb){document.querySelectorAll('.rc').forEach(function(c){c.checked=cb.checked;});}
async function approveSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/approve',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Approved '+d.approved.length+', invite emails sent');load();}
async function rejectSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/reject',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Rejected '+d.rejected.length);load();}
async function resendSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/resend',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Resent to '+d.sent.length);load();}
async function approveOne(id){var d=await api('/admin/approve',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Approved \u2014 invite email sent');load();}
async function rejectOne(id){var d=await api('/admin/reject',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Rejected');load();}
async function resendOne(id){var d=await api('/admin/resend',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Invite resent');load();}
async function editNote(id){var cur='';var rows2=document.querySelectorAll('[data-id="'+id+'"] .nc');if(rows2.length)cur=rows2[0].title||'';var note=prompt('Note for entry #'+id+':',cur);if(note===null)return;await api('/admin/note',{method:'POST',body:JSON.stringify({id:id,note:note})});toast('Note saved');load();}
function toast(msg){var el=document.getElementById('toast');el.textContent=msg;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on');},2500);}
<\/script>
</body>
</html>`], [`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ally Waitlist Admin</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0f;color:#e4e4e7;min-height:100vh}
nav{background:#12121a;border-bottom:1px solid rgba(255,255,255,.08);padding:0 24px;display:flex;align-items:center;gap:16px;height:52px}
.logo{font-weight:700;font-size:16px;color:#818cf8}
.logo span{color:#71717a;font-weight:400;font-size:13px;margin-left:8px}
.stats{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
.stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:4px 12px;font-size:13px;cursor:pointer}
.stat:hover{border-color:rgba(99,102,241,.3)}
.stat b{color:#f9fafb}
main{padding:24px;max-width:1200px;margin:0 auto}
.toolbar{display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap}
select,input[type=text]{background:#1a1a2e;border:1px solid rgba(255,255,255,.1);color:#e4e4e7;border-radius:6px;padding:6px 10px;font-size:13px;outline:none}
select:focus,input:focus{border-color:#6366f1}
.btn{padding:7px 14px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:all .15s}
.btn-p{background:#6366f1;color:#fff}.btn-p:hover{background:#4f46e5}
.btn-g{background:rgba(34,197,94,.12);color:#22c55e;border:1px solid rgba(34,197,94,.2)}.btn-g:hover{background:rgba(34,197,94,.22)}
.btn-r{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)}.btn-r:hover{background:rgba(239,68,68,.2)}
.btn-q{background:rgba(255,255,255,.04);color:#a1a1aa;border:1px solid rgba(255,255,255,.08)}.btn-q:hover{background:rgba(255,255,255,.09)}
.btn:disabled{opacity:.35;cursor:default}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{border-bottom:1px solid rgba(255,255,255,.07)}
th{text-align:left;padding:8px 10px;color:#71717a;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background .1s}
tbody tr:hover{background:rgba(255,255,255,.02)}
td{padding:10px;vertical-align:middle}
.badge{display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600}
.b-pending{background:rgba(245,158,11,.12);color:#fbbf24}
.b-approved{background:rgba(99,102,241,.12);color:#818cf8}
.b-registered{background:rgba(34,197,94,.12);color:#4ade80}
.b-rejected{background:rgba(239,68,68,.1);color:#f87171}
.cb{width:15px;height:15px;cursor:pointer;accent-color:#6366f1}
.em{font-weight:500;color:#f9fafb}
.dim{color:#71717a;font-size:12px}
.nc{max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#52525b;font-size:12px}
.pag{display:flex;gap:8px;align-items:center;margin-top:16px;font-size:13px;color:#71717a}
#login{display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px}
#login h2{font-size:20px;font-weight:700;color:#f9fafb}
#login input{width:280px;padding:10px 14px;font-size:14px}
.toast{position:fixed;bottom:24px;right:24px;background:#1a1a2e;border:1px solid rgba(99,102,241,.3);color:#e4e4e7;padding:12px 20px;border-radius:10px;font-size:14px;z-index:999;opacity:0;transition:opacity .25s;pointer-events:none}
.toast.on{opacity:1}
.acts{display:flex;gap:4px}
</style>
</head>
<body>

<div id="login">
  <h2>Ally Waitlist Admin</h2>
  <input id="si" type="password" placeholder="Admin secret" onkeydown="if(event.key==='Enter')doLogin()">
  <button class="btn btn-p" onclick="doLogin()">Sign in</button>
</div>

<div id="app" style="display:none">
<nav><span class="logo">Ally <span>Waitlist</span></span><div class="stats" id="sb"></div></nav>
<main>
  <div class="toolbar">
    <select id="fs" onchange="currentOffset=0;load()">
      <option value="all">All statuses</option>
      <option value="pending" selected>Pending</option>
      <option value="approved">Approved</option>
      <option value="registered">Registered</option>
      <option value="rejected">Rejected</option>
    </select>
    <input type="text" id="sq" placeholder="Search email / name" oninput="filterRows()" style="width:200px">
    <button class="btn btn-g" onclick="approveSelected()">Approve selected</button>
    <button class="btn btn-r" onclick="rejectSelected()">Reject selected</button>
    <button class="btn btn-q" onclick="resendSelected()">Resend invite</button>
    <button class="btn btn-q" style="margin-left:auto" onclick="load()">Refresh</button>
  </div>
  <table>
    <thead><tr>
      <th><input type="checkbox" class="cb" onchange="toggleAll(this)"></th>
      <th>ID</th><th>Email</th><th>Name</th><th>Status</th><th>Referrer</th><th>Joined</th><th>Note</th><th>Actions</th>
    </tr></thead>
    <tbody id="tb"><tr><td colspan="9" style="text-align:center;padding:32px;color:#52525b">Loading...</td></tr></tbody>
  </table>
  <div class="pag">
    <button class="btn btn-q" id="pp" onclick="prevPage()">Prev</button>
    <span id="pi"></span>
    <button class="btn btn-q" id="np" onclick="nextPage()">Next</button>
  </div>
</main>
</div>
<div class="toast" id="toast"></div>
<script>
var SEC='',rows=[],currentOffset=0,PAGE=100,toastT=null;
(function(){var s=sessionStorage.getItem('wl_sec');if(s){SEC=s;document.getElementById('login').style.display='none';document.getElementById('app').style.display='';load();loadStats();}})();
function doLogin(){var v=document.getElementById('si').value.trim();if(!v)return;SEC=v;sessionStorage.setItem('wl_sec',SEC);document.getElementById('login').style.display='none';document.getElementById('app').style.display='';load();loadStats();}
async function api(path,opts){opts=opts||{};var r=await fetch(path,Object.assign({},opts,{headers:Object.assign({'authorization':'Bearer '+SEC,'content-type':'application/json'},opts.headers||{})}));if(r.status===401){toast('Unauthorized');return null;}return r.json();}
async function loadStats(){var ss=['pending','approved','registered','rejected'];var cc=await Promise.all(ss.map(function(s){return api('/admin/entries?status='+s+'&limit=1').then(function(d){return d?d.total:0;});}));var col={pending:'#fbbf24',approved:'#818cf8',registered:'#4ade80',rejected:'#f87171'};document.getElementById('sb').innerHTML=ss.map(function(s,i){return '<div class="stat" onclick="filterBy(\\''+s+'\\')"><b style="color:'+col[s]+'">'+cc[i]+'</b> '+s+'</div>';}).join('');}
function filterBy(s){document.getElementById('fs').value=s;currentOffset=0;load();}
async function load(){var s=document.getElementById('fs').value;var d=await api('/admin/entries?status='+s+'&limit='+PAGE+'&offset='+currentOffset);if(!d)return;rows=d.entries;renderRows(rows);document.getElementById('pi').textContent=(currentOffset+1)+'-'+Math.min(currentOffset+PAGE,d.total)+' of '+d.total;document.getElementById('pp').disabled=currentOffset===0;document.getElementById('np').disabled=currentOffset+PAGE>=d.total;loadStats();}
function prevPage(){currentOffset=Math.max(0,currentOffset-PAGE);load();}
function nextPage(){currentOffset+=PAGE;load();}
function filterRows(){var q=document.getElementById('sq').value.toLowerCase();renderRows(q?rows.filter(function(e){return e.email.includes(q)||(e.name||'').toLowerCase().includes(q);}):rows);}
function fmt(ts){return ts?new Date(ts*1000).toLocaleDateString():'\u2014';}
function renderRows(es){var tb=document.getElementById('tb');if(!es.length){tb.innerHTML='<tr><td colspan="9" style="text-align:center;padding:32px;color:#52525b">No entries</td></tr>';return;}tb.innerHTML=es.map(function(e){var acts=[];if(e.status==='pending'){acts.push('<button class="btn btn-g" style="padding:3px 8px;font-size:11px" onclick="approveOne('+e.id+')">Approve</button>');acts.push('<button class="btn btn-r" style="padding:3px 8px;font-size:11px" onclick="rejectOne('+e.id+')">Reject</button>');}if(e.status==='approved')acts.push('<button class="btn btn-q" style="padding:3px 8px;font-size:11px" onclick="resendOne('+e.id+')">Resend</button>');acts.push('<button class="btn btn-q" style="padding:3px 8px;font-size:11px" onclick="editNote('+e.id+')">Note</button>');return '<tr data-id="'+e.id+'"><td><input type="checkbox" class="cb rc" value="'+e.id+'"></td><td class="dim">'+e.id+'</td><td class="em">'+e.email+'</td><td class="dim">'+(e.name||'\u2014')+'</td><td><span class="badge b-'+e.status+'">'+e.status+'</span></td><td class="dim">'+(e.referrer||'\u2014')+'</td><td class="dim">'+fmt(e.created_at)+'</td><td class="nc" title="'+(e.notes||'')+'">'+(e.notes||'\u2014')+'</td><td><div class="acts">'+acts.join('')+'</div></td></tr>';}).join('');}
function selected(){return Array.from(document.querySelectorAll('.rc:checked')).map(function(c){return +c.value;});}
function toggleAll(cb){document.querySelectorAll('.rc').forEach(function(c){c.checked=cb.checked;});}
async function approveSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/approve',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Approved '+d.approved.length+', invite emails sent');load();}
async function rejectSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/reject',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Rejected '+d.rejected.length);load();}
async function resendSelected(){var ids=selected();if(!ids.length)return toast('Select entries first');var d=await api('/admin/resend',{method:'POST',body:JSON.stringify({ids:ids})});if(d)toast('Resent to '+d.sent.length);load();}
async function approveOne(id){var d=await api('/admin/approve',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Approved \u2014 invite email sent');load();}
async function rejectOne(id){var d=await api('/admin/reject',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Rejected');load();}
async function resendOne(id){var d=await api('/admin/resend',{method:'POST',body:JSON.stringify({ids:[id]})});if(d)toast('Invite resent');load();}
async function editNote(id){var cur='';var rows2=document.querySelectorAll('[data-id="'+id+'"] .nc');if(rows2.length)cur=rows2[0].title||'';var note=prompt('Note for entry #'+id+':',cur);if(note===null)return;await api('/admin/note',{method:'POST',body:JSON.stringify({id:id,note:note})});toast('Note saved');load();}
function toast(msg){var el=document.getElementById('toast');el.textContent=msg;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on');},2500);}
<\/script>
</body>
</html>`])));
}
__name(adminDashboardHtml, "adminDashboardHtml");

// src/index.ts
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "access-control-allow-origin": "*" }
  });
}
__name(json, "json");
function err(msg, status = 400) {
  return json({ error: msg }, status);
}
__name(err, "err");
function htmlResp(body, status = 200) {
  return new Response(body, { status, headers: { "content-type": "text/html;charset=utf-8" } });
}
__name(htmlResp, "htmlResp");
function isAdmin(req, env2) {
  const url = new URL(req.url);
  if (url.searchParams.get("secret") === env2.ADMIN_SECRET) return true;
  return (req.headers.get("authorization") ?? "") === `Bearer ${env2.ADMIN_SECRET}`;
}
__name(isAdmin, "isAdmin");
function generateCode() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const arr = new Uint8Array(24);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => chars[b % chars.length]).join("");
}
__name(generateCode, "generateCode");
async function getZohoToken(env2) {
  const cached = await env2.KV.get("zoho:wl_token");
  if (cached) return cached;
  const base = env2.ZOHO_ACCOUNTS_BASE ?? "https://accounts.zoho.com";
  const res = await fetch(`${base}/oauth/v2/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: env2.ZOHO_REFRESH_TOKEN,
      client_id: env2.ZOHO_CLIENT_ID,
      client_secret: env2.ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token"
    }).toString()
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`zoho_token: ${data.error}`);
  const ttl = Math.max(60, (data.expires_in ?? 3600) - 300);
  await env2.KV.put("zoho:wl_token", data.access_token, { expirationTtl: ttl });
  return data.access_token;
}
__name(getZohoToken, "getZohoToken");
async function sendEmail(env2, to, subject, html) {
  if (!env2.ZOHO_CLIENT_ID) {
    console.error("sendEmail: no ZOHO_CLIENT_ID");
    return;
  }
  try {
    const token = await getZohoToken(env2);
    const base = env2.ZOHO_MAIL_BASE ?? "https://mail.zoho.com";
    const res = await fetch(`${base}/api/accounts/${env2.ZOHO_ACCOUNT_ID}/messages`, {
      method: "POST",
      headers: { authorization: `Zoho-oauthtoken ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ fromAddress: env2.EMAIL_FROM, toAddress: to, subject, content: html, mailFormat: "html" })
    });
    const data = await res.json();
    if (data?.status?.code !== 200) console.error("sendEmail error:", JSON.stringify(data));
    else console.log("sendEmail ok to:", to);
  } catch (e) {
    console.error("sendEmail exception:", e);
  }
}
__name(sendEmail, "sendEmail");
function emailLayout(title2, body) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f4f7;font-family:Inter,-apple-system,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
<tr><td style="background:#6366f1;padding:20px 32px;"><span style="color:#fff;font-size:20px;font-weight:700;">Ally</span></td></tr>
<tr><td style="padding:32px;"><h1 style="margin:0 0 16px;font-size:20px;color:#111827;">${title2}</h1>${body}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e5e7eb;"><p style="margin:0;font-size:12px;color:#9ca3af;">Ally &middot; <a href="https://allyapp.cc" style="color:#6366f1;text-decoration:none;">allyapp.cc</a></p></td></tr>
</table></td></tr></table></body></html>`;
}
__name(emailLayout, "emailLayout");
function inviteEmail(name, url) {
  const hi = name || "there";
  return {
    subject: "You're in \u2014 create your Ally account",
    html: emailLayout(
      "You're off the waitlist \u{1F389}",
      `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">Hi <strong>${hi}</strong>,</p>
       <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">We've approved your Ally waitlist spot. Click below to create your account \u2014 this invite link is personal to you and expires in 7 days.</p>
       <p style="margin:24px 0;"><a href="${url}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 24px;border-radius:8px;">Create my account &rarr;</a></p>
       <p style="font-size:13px;color:#6b7280;">Or copy: <a href="${url}" style="color:#6366f1;word-break:break-all;">${url}</a></p>`
    )
  };
}
__name(inviteEmail, "inviteEmail");
function confirmEmail(name, position) {
  const hi = name || "there";
  return {
    subject: "You're on the Ally waitlist",
    html: emailLayout(
      "You're on the list \u2713",
      `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">Hi <strong>${hi}</strong>,</p>
       <p style="font-size:15px;color:#374151;line-height:1.6;">You're <strong>#${position}</strong> on the Ally waitlist. We'll email you the moment your spot opens up.<br><br>Follow our progress on <a href="https://github.com/AllyAppDev" style="color:#6366f1;">GitHub</a>.</p>`
    )
  };
}
__name(confirmEmail, "confirmEmail");
async function routeJoin(req, env2, ctx) {
  let body;
  try {
    body = await req.json();
  } catch {
    return err("invalid_json");
  }
  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("invalid_email");
  const name = (body.name ?? "").trim().slice(0, 100);
  const referrer = (body.referrer ?? "landing").slice(0, 100);
  const existing = await env2.DB.prepare("SELECT status FROM waitlist WHERE email=?").bind(email).first();
  if (existing) return json({ success: true, already: true, status: existing.status });
  await env2.DB.prepare("INSERT INTO waitlist (email,name,referrer) VALUES (?,?,?)").bind(email, name, referrer).run();
  const total = await env2.DB.prepare("SELECT COUNT(*) as n FROM waitlist WHERE status IN ('pending','approved')").first();
  const position = total?.n ?? 1;
  const { subject, html } = confirmEmail(name, position);
  ctx.waitUntil(sendEmail(env2, email, subject, html));
  return json({ success: true, status: "pending", position, message: "You're on the list! We'll email you when your spot opens." });
}
__name(routeJoin, "routeJoin");
async function routeStatus(req, env2) {
  const email = new URL(req.url).searchParams.get("email")?.trim().toLowerCase() ?? "";
  if (!email) return err("email_required");
  const row = await env2.DB.prepare("SELECT status, created_at, approved_at FROM waitlist WHERE email=?").bind(email).first();
  return row ? json({ found: true, ...row }) : json({ found: false });
}
__name(routeStatus, "routeStatus");
async function routeInvite(code, env2) {
  const row = await env2.DB.prepare("SELECT id,email,status FROM waitlist WHERE invite_code=?").bind(code).first();
  if (!row) {
    return htmlResp('<html><body style="font-family:sans-serif;padding:40px;background:#0a0a0f;color:#e4e4e7"><h2>Invalid or expired invite link.</h2><p style="color:#71717a;margin-top:12px">This link may have already been used or has expired. <a href="https://allyapp.cc" style="color:#818cf8">Return to Ally</a>.</p></body></html>', 404);
  }
  if (row.status === "registered") {
    return Response.redirect(`${env2.APP_URL}/login?reason=already_registered`, 302);
  }
  await env2.DB.prepare("UPDATE waitlist SET status='registered',registered_at=unixepoch() WHERE id=?").bind(row.id).run();
  return Response.redirect(
    `${env2.APP_URL}/register?invite=${encodeURIComponent(code)}&email=${encodeURIComponent(row.email)}`,
    302
  );
}
__name(routeInvite, "routeInvite");
async function routeAdminEntries(req, env2) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "all";
  const limit = Math.min(500, Number(url.searchParams.get("limit") ?? 200));
  const offset = Number(url.searchParams.get("offset") ?? 0);
  const filtered = status !== "all";
  const q = `SELECT * FROM waitlist${filtered ? " WHERE status=?" : ""} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const { results } = await env2.DB.prepare(q).bind(...filtered ? [status, limit, offset] : [limit, offset]).all();
  const totalQ = `SELECT COUNT(*) as n FROM waitlist${filtered ? " WHERE status=?" : ""}`;
  const total = await env2.DB.prepare(totalQ).bind(...filtered ? [status] : []).first();
  return json({ entries: results, total: total?.n ?? 0 });
}
__name(routeAdminEntries, "routeAdminEntries");
async function routeAdminApprove(req, env2, ctx) {
  const body = await req.json().catch(() => ({ ids: [] }));
  const ids = body.ids ?? [];
  if (!ids.length) return err("ids_required");
  const approved = [], failed = [];
  for (const id of ids) {
    const row = await env2.DB.prepare("SELECT id,email,name,status FROM waitlist WHERE id=?").bind(id).first();
    if (!row || row.status === "registered") {
      failed.push(id);
      continue;
    }
    const code = generateCode();
    await env2.DB.prepare("UPDATE waitlist SET status='approved',invite_code=?,approved_at=unixepoch() WHERE id=?").bind(code, id).run();
    const inviteUrl = `https://waitlist.allyapp.cc/invite/${code}`;
    const { subject, html } = inviteEmail(row.name, inviteUrl);
    ctx.waitUntil(sendEmail(env2, row.email, subject, html).then(
      () => env2.DB.prepare("UPDATE waitlist SET notified_at=unixepoch() WHERE id=?").bind(id).run()
    ));
    approved.push(id);
  }
  return json({ approved, failed });
}
__name(routeAdminApprove, "routeAdminApprove");
async function routeAdminReject(req, env2) {
  const body = await req.json().catch(() => ({ ids: [] }));
  const ids = body.ids ?? [];
  if (!ids.length) return err("ids_required");
  for (const id of ids) {
    if (body.note) {
      await env2.DB.prepare("UPDATE waitlist SET status='rejected',notes=? WHERE id=?").bind(body.note, id).run();
    } else {
      await env2.DB.prepare("UPDATE waitlist SET status='rejected' WHERE id=?").bind(id).run();
    }
  }
  return json({ rejected: ids });
}
__name(routeAdminReject, "routeAdminReject");
async function routeAdminResend(req, env2, ctx) {
  const body = await req.json().catch(() => ({ ids: [] }));
  const ids = body.ids ?? [];
  if (!ids.length) return err("ids_required");
  const sent = [];
  for (const id of ids) {
    const row = await env2.DB.prepare("SELECT id,email,name,invite_code,status FROM waitlist WHERE id=?").bind(id).first();
    if (!row?.invite_code || row.status !== "approved") continue;
    const url = `https://waitlist.allyapp.cc/invite/${row.invite_code}`;
    const { subject, html } = inviteEmail(row.name, url);
    ctx.waitUntil(sendEmail(env2, row.email, subject, html).then(
      () => env2.DB.prepare("UPDATE waitlist SET notified_at=unixepoch() WHERE id=?").bind(id).run()
    ));
    sent.push(id);
  }
  return json({ sent });
}
__name(routeAdminResend, "routeAdminResend");
async function routeAdminNote(req, env2) {
  const body = await req.json().catch(() => ({}));
  if (!body.id) return err("id_required");
  await env2.DB.prepare("UPDATE waitlist SET notes=? WHERE id=?").bind(body.note ?? "", body.id).run();
  return json({ ok: true });
}
__name(routeAdminNote, "routeAdminNote");
var index_default = {
  async fetch(req, env2, ctx) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method.toUpperCase();
    if (method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "content-type,authorization"
        }
      });
    }
    if (method === "POST" && path === "/join") return routeJoin(req, env2, ctx);
    if (method === "GET" && path === "/status") return routeStatus(req, env2);
    if (method === "GET" && path.startsWith("/invite/")) {
      return routeInvite(path.slice("/invite/".length), env2);
    }
    if (path === "/admin" || path === "/admin/") {
      if (!isAdmin(req, env2) && !path.endsWith("/")) {
      }
      return htmlResp(adminDashboardHtml());
    }
    if (!isAdmin(req, env2)) return err("unauthorized", 401);
    if (method === "GET" && path === "/admin/entries") return routeAdminEntries(req, env2);
    if (method === "POST" && path === "/admin/approve") return routeAdminApprove(req, env2, ctx);
    if (method === "POST" && path === "/admin/reject") return routeAdminReject(req, env2);
    if (method === "POST" && path === "/admin/resend") return routeAdminResend(req, env2, ctx);
    if (method === "POST" && path === "/admin/note") return routeAdminNote(req, env2);
    return err("not_found", 404);
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map