var ja = Object.defineProperty;
var eu = (e, n, t) => n in e ? ja(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var fe = (e, n, t) => (eu(e, typeof n != "symbol" ? n + "" : n, t), t);
function Ir() {
  return Ir = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var t = arguments[n];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, Ir.apply(this, arguments);
}
var di = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  epsilon: 1e-12,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
  number: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: !1,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};
function Le(e) {
  return typeof e == "number";
}
function Re(e) {
  return !e || typeof e != "object" || typeof e.constructor != "function" ? !1 : e.isBigNumber === !0 && typeof e.constructor.prototype == "object" && e.constructor.prototype.isBigNumber === !0 || typeof e.constructor.isDecimal == "function" && e.constructor.isDecimal(e) === !0;
}
function Yt(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isComplex === !0 || !1;
}
function Jt(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isFraction === !0 || !1;
}
function pi(e) {
  return e && e.constructor.prototype.isUnit === !0 || !1;
}
function tr(e) {
  return typeof e == "string";
}
var Me = Array.isArray;
function _e(e) {
  return e && e.constructor.prototype.isMatrix === !0 || !1;
}
function ot(e) {
  return Array.isArray(e) || _e(e);
}
function mi(e) {
  return e && e.isDenseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function gi(e) {
  return e && e.isSparseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function Di(e) {
  return e && e.constructor.prototype.isRange === !0 || !1;
}
function wt(e) {
  return e && e.constructor.prototype.isIndex === !0 || !1;
}
function ru(e) {
  return typeof e == "boolean";
}
function tu(e) {
  return e && e.constructor.prototype.isResultSet === !0 || !1;
}
function nu(e) {
  return e && e.constructor.prototype.isHelp === !0 || !1;
}
function iu(e) {
  return typeof e == "function";
}
function au(e) {
  return e instanceof Date;
}
function uu(e) {
  return e instanceof RegExp;
}
function yi(e) {
  return !!(e && typeof e == "object" && e.constructor === Object && !Yt(e) && !Jt(e));
}
function ou(e) {
  return e === null;
}
function su(e) {
  return e === void 0;
}
function fu(e) {
  return e && e.isAccessorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function cu(e) {
  return e && e.isArrayNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function lu(e) {
  return e && e.isAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function hu(e) {
  return e && e.isBlockNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function vu(e) {
  return e && e.isConditionalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function du(e) {
  return e && e.isConstantNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function pu(e) {
  return e && e.isFunctionAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function mu(e) {
  return e && e.isFunctionNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function gu(e) {
  return e && e.isIndexNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Du(e) {
  return e && e.isNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function yu(e) {
  return e && e.isObjectNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function wu(e) {
  return e && e.isOperatorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Au(e) {
  return e && e.isParenthesisNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Eu(e) {
  return e && e.isRangeNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Fu(e) {
  return e && e.isRelationalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Cu(e) {
  return e && e.isSymbolNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function bu(e) {
  return e && e.constructor.prototype.isChain === !0 || !1;
}
function lr(e) {
  var n = typeof e;
  return n === "object" ? e === null ? "null" : Re(e) ? "BigNumber" : e.constructor && e.constructor.name ? e.constructor.name : "Object" : n;
}
function Ce(e) {
  var n = typeof e;
  if (n === "number" || n === "string" || n === "boolean" || e === null || e === void 0)
    return e;
  if (typeof e.clone == "function")
    return e.clone();
  if (Array.isArray(e))
    return e.map(function(t) {
      return Ce(t);
    });
  if (e instanceof Date)
    return new Date(e.valueOf());
  if (Re(e))
    return e;
  if (yi(e))
    return Mu(e, Ce);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(e, ")"));
}
function Mu(e, n) {
  var t = {};
  for (var i in e)
    Yr(e, i) && (t[i] = n(e[i]));
  return t;
}
function Su(e, n) {
  for (var t in n)
    Yr(n, t) && (e[t] = n[t]);
  return e;
}
function Or(e, n) {
  var t, i, r;
  if (Array.isArray(e)) {
    if (!Array.isArray(n) || e.length !== n.length)
      return !1;
    for (i = 0, r = e.length; i < r; i++)
      if (!Or(e[i], n[i]))
        return !1;
    return !0;
  } else {
    if (typeof e == "function")
      return e === n;
    if (e instanceof Object) {
      if (Array.isArray(n) || !(n instanceof Object))
        return !1;
      for (t in e)
        if (!(t in n) || !Or(e[t], n[t]))
          return !1;
      for (t in n)
        if (!(t in e))
          return !1;
      return !0;
    } else
      return e === n;
  }
}
function Yr(e, n) {
  return e && Object.hasOwnProperty.call(e, n);
}
function xu(e, n) {
  for (var t = {}, i = 0; i < n.length; i++) {
    var r = n[i], a = e[r];
    a !== void 0 && (t[r] = a);
  }
  return t;
}
var Nu = ["Matrix", "Array"], Bu = ["number", "BigNumber", "Fraction"], je = function(n) {
  if (n)
    throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
  return Object.freeze(di);
};
Ir(je, di, {
  MATRIX_OPTIONS: Nu,
  NUMBER_OPTIONS: Bu
});
function nn() {
  return !0;
}
function rr() {
  return !1;
}
function Br() {
}
const an = "Argument is not a typed-function.";
function wi() {
  function e(N) {
    return typeof N == "object" && N !== null && N.constructor === Object;
  }
  const n = [{
    name: "number",
    test: function(N) {
      return typeof N == "number";
    }
  }, {
    name: "string",
    test: function(N) {
      return typeof N == "string";
    }
  }, {
    name: "boolean",
    test: function(N) {
      return typeof N == "boolean";
    }
  }, {
    name: "Function",
    test: function(N) {
      return typeof N == "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(N) {
      return N instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(N) {
      return N instanceof RegExp;
    }
  }, {
    name: "Object",
    test: e
  }, {
    name: "null",
    test: function(N) {
      return N === null;
    }
  }, {
    name: "undefined",
    test: function(N) {
      return N === void 0;
    }
  }], t = {
    name: "any",
    test: nn,
    isAny: !0
  };
  let i, r, a = 0, o = {
    createCount: 0
  };
  function l(N) {
    const _ = i.get(N);
    if (_)
      return _;
    let L = 'Unknown type "' + N + '"';
    const R = N.toLowerCase();
    let H;
    for (H of r)
      if (H.toLowerCase() === R) {
        L += '. Did you mean "' + H + '" ?';
        break;
      }
    throw new TypeError(L);
  }
  function c(N) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const L = _ ? l(_).index : r.length, R = [];
    for (let Y = 0; Y < N.length; ++Y) {
      if (!N[Y] || typeof N[Y].name != "string" || typeof N[Y].test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      const ae = N[Y].name;
      if (i.has(ae))
        throw new TypeError('Duplicate type name "' + ae + '"');
      R.push(ae), i.set(ae, {
        name: ae,
        test: N[Y].test,
        isAny: N[Y].isAny,
        index: L + Y,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const H = r.slice(L);
    r = r.slice(0, L).concat(R).concat(H);
    for (let Y = L + R.length; Y < r.length; ++Y)
      i.get(r[Y]).index = Y;
  }
  function h() {
    i = /* @__PURE__ */ new Map(), r = [], a = 0, c([t], !1);
  }
  h(), c(n);
  function s() {
    let N;
    for (N of r)
      i.get(N).conversionsTo = [];
    a = 0;
  }
  function u(N) {
    const _ = r.filter((L) => {
      const R = i.get(L);
      return !R.isAny && R.test(N);
    });
    return _.length ? _ : ["any"];
  }
  function f(N) {
    return N && typeof N == "function" && "_typedFunctionData" in N;
  }
  function d(N, _, L) {
    if (!f(N))
      throw new TypeError(an);
    const R = L && L.exact, H = Array.isArray(_) ? _.join(",") : _, Y = A(H), ae = m(Y);
    if (!R || ae in N.signatures) {
      const Ne = N._typedFunctionData.signatureMap.get(ae);
      if (Ne)
        return Ne;
    }
    const te = Y.length;
    let ie;
    if (R) {
      ie = [];
      let Ne;
      for (Ne in N.signatures)
        ie.push(N._typedFunctionData.signatureMap.get(Ne));
    } else
      ie = N._typedFunctionData.signatures;
    for (let Ne = 0; Ne < te; ++Ne) {
      const Ie = Y[Ne], Ue = [];
      let Ke;
      for (Ke of ie) {
        const Xe = b(Ke.params, Ne);
        if (!(!Xe || Ie.restParam && !Xe.restParam)) {
          if (!Xe.hasAny) {
            const ir = g(Xe);
            if (Ie.types.some((ar) => !ir.has(ar.name)))
              continue;
          }
          Ue.push(Ke);
        }
      }
      if (ie = Ue, ie.length === 0)
        break;
    }
    let re;
    for (re of ie)
      if (re.params.length <= te)
        return re;
    throw new TypeError("Signature not found (signature: " + (N.name || "unnamed") + "(" + m(Y, ", ") + "))");
  }
  function D(N, _, L) {
    return d(N, _, L).implementation;
  }
  function v(N, _) {
    const L = l(_);
    if (L.test(N))
      return N;
    const R = L.conversionsTo;
    if (R.length === 0)
      throw new Error("There are no conversions to " + _ + " defined.");
    for (let H = 0; H < R.length; H++)
      if (l(R[H].from).test(N))
        return R[H].convert(N);
    throw new Error("Cannot convert " + N + " to " + _);
  }
  function m(N) {
    let _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return N.map((L) => L.name).join(_);
  }
  function p(N) {
    const _ = N.indexOf("...") === 0, R = (_ ? N.length > 3 ? N.slice(3) : "any" : N).split("|").map((te) => l(te.trim()));
    let H = !1, Y = _ ? "..." : "";
    return {
      types: R.map(function(te) {
        return H = te.isAny || H, Y += te.name + "|", {
          name: te.name,
          typeIndex: te.index,
          test: te.test,
          isAny: te.isAny,
          conversion: null,
          conversionIndex: -1
        };
      }),
      name: Y.slice(0, -1),
      // remove trailing '|' from above
      hasAny: H,
      hasConversion: !1,
      restParam: _
    };
  }
  function w(N) {
    const _ = N.types.map((ae) => ae.name), L = G(_);
    let R = N.hasAny, H = N.name;
    const Y = L.map(function(ae) {
      const te = l(ae.from);
      return R = te.isAny || R, H += "|" + ae.from, {
        name: ae.from,
        typeIndex: te.index,
        test: te.test,
        isAny: te.isAny,
        conversion: ae,
        conversionIndex: ae.index
      };
    });
    return {
      types: N.types.concat(Y),
      name: H,
      hasAny: R,
      hasConversion: Y.length > 0,
      restParam: N.restParam
    };
  }
  function g(N) {
    return N.typeSet || (N.typeSet = /* @__PURE__ */ new Set(), N.types.forEach((_) => N.typeSet.add(_.name))), N.typeSet;
  }
  function A(N) {
    const _ = [];
    if (typeof N != "string")
      throw new TypeError("Signatures must be strings");
    const L = N.trim();
    if (L === "")
      return _;
    const R = L.split(",");
    for (let H = 0; H < R.length; ++H) {
      const Y = p(R[H].trim());
      if (Y.restParam && H !== R.length - 1)
        throw new SyntaxError('Unexpected rest parameter "' + R[H] + '": only allowed for the last parameter');
      if (Y.types.length === 0)
        return null;
      _.push(Y);
    }
    return _;
  }
  function F(N) {
    const _ = X(N);
    return _ ? _.restParam : !1;
  }
  function y(N) {
    if (!N || N.types.length === 0)
      return nn;
    if (N.types.length === 1)
      return l(N.types[0].name).test;
    if (N.types.length === 2) {
      const _ = l(N.types[0].name).test, L = l(N.types[1].name).test;
      return function(H) {
        return _(H) || L(H);
      };
    } else {
      const _ = N.types.map(function(L) {
        return l(L.name).test;
      });
      return function(R) {
        for (let H = 0; H < _.length; H++)
          if (_[H](R))
            return !0;
        return !1;
      };
    }
  }
  function C(N) {
    let _, L, R;
    if (F(N)) {
      _ = Q(N).map(y);
      const H = _.length, Y = y(X(N)), ae = function(te) {
        for (let ie = H; ie < te.length; ie++)
          if (!Y(te[ie]))
            return !1;
        return !0;
      };
      return function(ie) {
        for (let re = 0; re < _.length; re++)
          if (!_[re](ie[re]))
            return !1;
        return ae(ie) && ie.length >= H + 1;
      };
    } else
      return N.length === 0 ? function(Y) {
        return Y.length === 0;
      } : N.length === 1 ? (L = y(N[0]), function(Y) {
        return L(Y[0]) && Y.length === 1;
      }) : N.length === 2 ? (L = y(N[0]), R = y(N[1]), function(Y) {
        return L(Y[0]) && R(Y[1]) && Y.length === 2;
      }) : (_ = N.map(y), function(Y) {
        for (let ae = 0; ae < _.length; ae++)
          if (!_[ae](Y[ae]))
            return !1;
        return Y.length === _.length;
      });
  }
  function b(N, _) {
    return _ < N.length ? N[_] : F(N) ? X(N) : null;
  }
  function E(N, _) {
    const L = b(N, _);
    return L ? g(L) : /* @__PURE__ */ new Set();
  }
  function S(N) {
    return N.conversion === null || N.conversion === void 0;
  }
  function M(N, _) {
    const L = /* @__PURE__ */ new Set();
    return N.forEach((R) => {
      const H = E(R.params, _);
      let Y;
      for (Y of H)
        L.add(Y);
    }), L.has("any") ? ["any"] : Array.from(L);
  }
  function x(N, _, L) {
    let R, H;
    const Y = N || "unnamed";
    let ae = L, te;
    for (te = 0; te < _.length; te++) {
      const Ie = [];
      if (ae.forEach((Ue) => {
        const Ke = b(Ue.params, te), Xe = y(Ke);
        (te < Ue.params.length || F(Ue.params)) && Xe(_[te]) && Ie.push(Ue);
      }), Ie.length === 0) {
        if (H = M(ae, te), H.length > 0) {
          const Ue = u(_[te]);
          return R = new TypeError("Unexpected type of argument in function " + Y + " (expected: " + H.join(" or ") + ", actual: " + Ue.join(" | ") + ", index: " + te + ")"), R.data = {
            category: "wrongType",
            fn: Y,
            index: te,
            actual: Ue,
            expected: H
          }, R;
        }
      } else
        ae = Ie;
    }
    const ie = ae.map(function(Ie) {
      return F(Ie.params) ? 1 / 0 : Ie.params.length;
    });
    if (_.length < Math.min.apply(null, ie))
      return H = M(ae, te), R = new TypeError("Too few arguments in function " + Y + " (expected: " + H.join(" or ") + ", index: " + _.length + ")"), R.data = {
        category: "tooFewArgs",
        fn: Y,
        index: _.length,
        expected: H
      }, R;
    const re = Math.max.apply(null, ie);
    if (_.length > re)
      return R = new TypeError("Too many arguments in function " + Y + " (expected: " + re + ", actual: " + _.length + ")"), R.data = {
        category: "tooManyArgs",
        fn: Y,
        index: _.length,
        expectedLength: re
      }, R;
    const Ne = [];
    for (let Ie = 0; Ie < _.length; ++Ie)
      Ne.push(u(_[Ie]).join("|"));
    return R = new TypeError('Arguments of type "' + Ne.join(", ") + '" do not match any of the defined signatures of function ' + Y + "."), R.data = {
      category: "mismatch",
      actual: Ne
    }, R;
  }
  function I(N) {
    let _ = r.length + 1;
    for (let L = 0; L < N.types.length; L++)
      S(N.types[L]) && (_ = Math.min(_, N.types[L].typeIndex));
    return _;
  }
  function T(N) {
    let _ = a + 1;
    for (let L = 0; L < N.types.length; L++)
      S(N.types[L]) || (_ = Math.min(_, N.types[L].conversionIndex));
    return _;
  }
  function O(N, _) {
    if (N.hasAny) {
      if (!_.hasAny)
        return 1;
    } else if (_.hasAny)
      return -1;
    if (N.restParam) {
      if (!_.restParam)
        return 1;
    } else if (_.restParam)
      return -1;
    if (N.hasConversion) {
      if (!_.hasConversion)
        return 1;
    } else if (_.hasConversion)
      return -1;
    const L = I(N) - I(_);
    if (L < 0)
      return -1;
    if (L > 0)
      return 1;
    const R = T(N) - T(_);
    return R < 0 ? -1 : R > 0 ? 1 : 0;
  }
  function B(N, _) {
    const L = N.params, R = _.params, H = X(L), Y = X(R), ae = F(L), te = F(R);
    if (ae && H.hasAny) {
      if (!te || !Y.hasAny)
        return 1;
    } else if (te && Y.hasAny)
      return -1;
    let ie = 0, re = 0, Ne;
    for (Ne of L)
      Ne.hasAny && ++ie, Ne.hasConversion && ++re;
    let Ie = 0, Ue = 0;
    for (Ne of R)
      Ne.hasAny && ++Ie, Ne.hasConversion && ++Ue;
    if (ie !== Ie)
      return ie - Ie;
    if (ae && H.hasConversion) {
      if (!te || !Y.hasConversion)
        return 1;
    } else if (te && Y.hasConversion)
      return -1;
    if (re !== Ue)
      return re - Ue;
    if (ae) {
      if (!te)
        return 1;
    } else if (te)
      return -1;
    const Ke = (L.length - R.length) * (ae ? -1 : 1);
    if (Ke !== 0)
      return Ke;
    const Xe = [];
    let ir = 0;
    for (let Nr = 0; Nr < L.length; ++Nr) {
      const nt = O(L[Nr], R[Nr]);
      Xe.push(nt), ir += nt;
    }
    if (ir !== 0)
      return ir;
    let ar;
    for (ar of Xe)
      if (ar !== 0)
        return ar;
    return 0;
  }
  function G(N) {
    if (N.length === 0)
      return [];
    const _ = N.map(l);
    N.length > 1 && _.sort((H, Y) => H.index - Y.index);
    let L = _[0].conversionsTo;
    if (N.length === 1)
      return L;
    L = L.concat([]);
    const R = new Set(N);
    for (let H = 1; H < _.length; ++H) {
      let Y;
      for (Y of _[H].conversionsTo)
        R.has(Y.from) || (L.push(Y), R.add(Y.from));
    }
    return L;
  }
  function $(N, _) {
    let L = _;
    if (N.some((H) => H.hasConversion)) {
      const H = F(N), Y = N.map(z);
      L = function() {
        const te = [], ie = H ? arguments.length - 1 : arguments.length;
        for (let re = 0; re < ie; re++)
          te[re] = Y[re](arguments[re]);
        return H && (te[ie] = arguments[ie].map(Y[ie])), _.apply(this, te);
      };
    }
    let R = L;
    if (F(N)) {
      const H = N.length - 1;
      R = function() {
        return L.apply(this, J(arguments, 0, H).concat([J(arguments, H)]));
      };
    }
    return R;
  }
  function z(N) {
    let _, L, R, H;
    const Y = [], ae = [];
    switch (N.types.forEach(function(te) {
      te.conversion && (Y.push(l(te.conversion.from).test), ae.push(te.conversion.convert));
    }), ae.length) {
      case 0:
        return function(ie) {
          return ie;
        };
      case 1:
        return _ = Y[0], R = ae[0], function(ie) {
          return _(ie) ? R(ie) : ie;
        };
      case 2:
        return _ = Y[0], L = Y[1], R = ae[0], H = ae[1], function(ie) {
          return _(ie) ? R(ie) : L(ie) ? H(ie) : ie;
        };
      default:
        return function(ie) {
          for (let re = 0; re < ae.length; re++)
            if (Y[re](ie))
              return ae[re](ie);
          return ie;
        };
    }
  }
  function V(N) {
    function _(L, R, H) {
      if (R < L.length) {
        const Y = L[R];
        let ae = [];
        if (Y.restParam) {
          const te = Y.types.filter(S);
          te.length < Y.types.length && ae.push({
            types: te,
            name: "..." + te.map((ie) => ie.name).join("|"),
            hasAny: te.some((ie) => ie.isAny),
            hasConversion: !1,
            restParam: !0
          }), ae.push(Y);
        } else
          ae = Y.types.map(function(te) {
            return {
              types: [te],
              name: te.name,
              hasAny: te.isAny,
              hasConversion: te.conversion,
              restParam: !1
            };
          });
        return j(ae, function(te) {
          return _(L, R + 1, H.concat([te]));
        });
      } else
        return [H];
    }
    return _(N, 0, []);
  }
  function K(N, _) {
    const L = Math.max(N.length, _.length);
    for (let te = 0; te < L; te++) {
      const ie = E(N, te), re = E(_, te);
      let Ne = !1, Ie;
      for (Ie of re)
        if (ie.has(Ie)) {
          Ne = !0;
          break;
        }
      if (!Ne)
        return !1;
    }
    const R = N.length, H = _.length, Y = F(N), ae = F(_);
    return Y ? ae ? R === H : H >= R : ae ? R >= H : R === H;
  }
  function P(N) {
    return N.map((_) => Ae(_) ? pe(_.referToSelf.callback) : De(_) ? le(_.referTo.references, _.referTo.callback) : _);
  }
  function q(N, _, L) {
    const R = [];
    let H;
    for (H of N) {
      let Y = L[H];
      if (typeof Y != "number")
        throw new TypeError('No definition for referenced signature "' + H + '"');
      if (Y = _[Y], typeof Y != "function")
        return !1;
      R.push(Y);
    }
    return R;
  }
  function Z(N, _, L) {
    const R = P(N), H = new Array(R.length).fill(!1);
    let Y = !0;
    for (; Y; ) {
      Y = !1;
      let ae = !0;
      for (let te = 0; te < R.length; ++te) {
        if (H[te])
          continue;
        const ie = R[te];
        if (Ae(ie))
          R[te] = ie.referToSelf.callback(L), R[te].referToSelf = ie.referToSelf, H[te] = !0, ae = !1;
        else if (De(ie)) {
          const re = q(ie.referTo.references, R, _);
          re ? (R[te] = ie.referTo.callback.apply(this, re), R[te].referTo = ie.referTo, H[te] = !0, ae = !1) : Y = !0;
        }
      }
      if (ae && Y)
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return R;
  }
  function ne(N) {
    const _ = /\bthis(\(|\.signatures\b)/;
    Object.keys(N).forEach((L) => {
      const R = N[L];
      if (_.test(R.toString()))
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function k(N, _) {
    if (o.createCount++, Object.keys(_).length === 0)
      throw new SyntaxError("No signatures provided");
    o.warnAgainstDeprecatedThis && ne(_);
    const L = [], R = [], H = {}, Y = [];
    let ae;
    for (ae in _) {
      if (!Object.prototype.hasOwnProperty.call(_, ae))
        continue;
      const xe = A(ae);
      if (!xe)
        continue;
      L.forEach(function(Gr) {
        if (K(Gr, xe))
          throw new TypeError('Conflicting signatures "' + m(Gr) + '" and "' + m(xe) + '".');
      }), L.push(xe);
      const We = R.length;
      R.push(_[ae]);
      const Wa = xe.map(w);
      let it;
      for (it of V(Wa)) {
        const Gr = m(it);
        Y.push({
          params: it,
          name: Gr,
          fn: We
        }), it.every((ka) => !ka.hasConversion) && (H[Gr] = We);
      }
    }
    Y.sort(B);
    const te = Z(R, H, Zr);
    let ie;
    for (ie in H)
      Object.prototype.hasOwnProperty.call(H, ie) && (H[ie] = te[H[ie]]);
    const re = [], Ne = /* @__PURE__ */ new Map();
    for (ie of Y)
      Ne.has(ie.name) || (ie.fn = te[ie.fn], re.push(ie), Ne.set(ie.name, ie));
    const Ie = re[0] && re[0].params.length <= 2 && !F(re[0].params), Ue = re[1] && re[1].params.length <= 2 && !F(re[1].params), Ke = re[2] && re[2].params.length <= 2 && !F(re[2].params), Xe = re[3] && re[3].params.length <= 2 && !F(re[3].params), ir = re[4] && re[4].params.length <= 2 && !F(re[4].params), ar = re[5] && re[5].params.length <= 2 && !F(re[5].params), Nr = Ie && Ue && Ke && Xe && ir && ar;
    for (let xe = 0; xe < re.length; ++xe)
      re[xe].test = C(re[xe].params);
    const nt = Ie ? y(re[0].params[0]) : rr, Fa = Ue ? y(re[1].params[0]) : rr, Ca = Ke ? y(re[2].params[0]) : rr, ba = Xe ? y(re[3].params[0]) : rr, Ma = ir ? y(re[4].params[0]) : rr, Sa = ar ? y(re[5].params[0]) : rr, xa = Ie ? y(re[0].params[1]) : rr, Na = Ue ? y(re[1].params[1]) : rr, Ba = Ke ? y(re[2].params[1]) : rr, _a = Xe ? y(re[3].params[1]) : rr, za = ir ? y(re[4].params[1]) : rr, Ta = ar ? y(re[5].params[1]) : rr;
    for (let xe = 0; xe < re.length; ++xe)
      re[xe].implementation = $(re[xe].params, re[xe].fn);
    const Ia = Ie ? re[0].implementation : Br, Oa = Ue ? re[1].implementation : Br, La = Ke ? re[2].implementation : Br, $a = Xe ? re[3].implementation : Br, qa = ir ? re[4].implementation : Br, Pa = ar ? re[5].implementation : Br, Ra = Ie ? re[0].params.length : -1, Ua = Ue ? re[1].params.length : -1, Va = Ke ? re[2].params.length : -1, Za = Xe ? re[3].params.length : -1, Ga = ir ? re[4].params.length : -1, Ya = ar ? re[5].params.length : -1, Ja = Nr ? 6 : 0, Qa = re.length, Xa = re.map((xe) => xe.test), Ha = re.map((xe) => xe.implementation), Ka = function() {
      for (let We = Ja; We < Qa; We++)
        if (Xa[We](arguments))
          return Ha[We].apply(this, arguments);
      return o.onMismatch(N, arguments, re);
    };
    function Zr(xe, We) {
      return arguments.length === Ra && nt(xe) && xa(We) ? Ia.apply(this, arguments) : arguments.length === Ua && Fa(xe) && Na(We) ? Oa.apply(this, arguments) : arguments.length === Va && Ca(xe) && Ba(We) ? La.apply(this, arguments) : arguments.length === Za && ba(xe) && _a(We) ? $a.apply(this, arguments) : arguments.length === Ga && Ma(xe) && za(We) ? qa.apply(this, arguments) : arguments.length === Ya && Sa(xe) && Ta(We) ? Pa.apply(this, arguments) : Ka.apply(this, arguments);
    }
    try {
      Object.defineProperty(Zr, "name", {
        value: N
      });
    } catch {
    }
    return Zr.signatures = H, Zr._typedFunctionData = {
      signatures: re,
      signatureMap: Ne
    }, Zr;
  }
  function U(N, _, L) {
    throw x(N, _, L);
  }
  function Q(N) {
    return J(N, 0, N.length - 1);
  }
  function X(N) {
    return N[N.length - 1];
  }
  function J(N, _, L) {
    return Array.prototype.slice.call(N, _, L);
  }
  function ue(N, _) {
    for (let L = 0; L < N.length; L++)
      if (_(N[L]))
        return N[L];
  }
  function j(N, _) {
    return Array.prototype.concat.apply([], N.map(_));
  }
  function se() {
    const N = Q(arguments).map((L) => m(A(L))), _ = X(arguments);
    if (typeof _ != "function")
      throw new TypeError("Callback function expected as last argument");
    return le(N, _);
  }
  function le(N, _) {
    return {
      referTo: {
        references: N,
        callback: _
      }
    };
  }
  function pe(N) {
    if (typeof N != "function")
      throw new TypeError("Callback function expected as first argument");
    return {
      referToSelf: {
        callback: N
      }
    };
  }
  function De(N) {
    return N && typeof N.referTo == "object" && Array.isArray(N.referTo.references) && typeof N.referTo.callback == "function";
  }
  function Ae(N) {
    return N && typeof N.referToSelf == "object" && typeof N.referToSelf.callback == "function";
  }
  function he(N, _) {
    if (!N)
      return _;
    if (_ && _ !== N) {
      const L = new Error("Function names do not match (expected: " + N + ", actual: " + _ + ")");
      throw L.data = {
        actual: _,
        expected: N
      }, L;
    }
    return N;
  }
  function be(N) {
    let _;
    for (const L in N)
      Object.prototype.hasOwnProperty.call(N, L) && (f(N[L]) || typeof N[L].signature == "string") && (_ = he(_, N[L].name));
    return _;
  }
  function Ee(N, _) {
    let L;
    for (L in _)
      if (Object.prototype.hasOwnProperty.call(_, L)) {
        if (L in N && _[L] !== N[L]) {
          const R = new Error('Signature "' + L + '" is defined twice');
          throw R.data = {
            signature: L,
            sourceFunction: _[L],
            destFunction: N[L]
          }, R;
        }
        N[L] = _[L];
      }
  }
  const Se = o;
  o = function(N) {
    const _ = typeof N == "string", L = _ ? 1 : 0;
    let R = _ ? N : "";
    const H = {};
    for (let Y = L; Y < arguments.length; ++Y) {
      const ae = arguments[Y];
      let te = {}, ie;
      if (typeof ae == "function" ? (ie = ae.name, typeof ae.signature == "string" ? te[ae.signature] = ae : f(ae) && (te = ae.signatures)) : e(ae) && (te = ae, _ || (ie = be(ae))), Object.keys(te).length === 0) {
        const re = new TypeError("Argument to 'typed' at index " + Y + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw re.data = {
          index: Y,
          argument: ae
        }, re;
      }
      _ || (R = he(R, ie)), Ee(H, te);
    }
    return k(R || "", H);
  }, o.create = wi, o.createCount = Se.createCount, o.onMismatch = U, o.throwMismatchError = U, o.createError = x, o.clear = h, o.clearConversions = s, o.addTypes = c, o._findType = l, o.referTo = se, o.referToSelf = pe, o.convert = v, o.findSignature = d, o.find = D, o.isTypedFunction = f, o.warnAgainstDeprecatedThis = !0, o.addType = function(N, _) {
    let L = "any";
    _ !== !1 && i.has("Object") && (L = "Object"), o.addTypes([N], L);
  };
  function Ve(N) {
    if (!N || typeof N.from != "string" || typeof N.to != "string" || typeof N.convert != "function")
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (N.to === N.from)
      throw new SyntaxError('Illegal to define conversion from "' + N.from + '" to itself.');
  }
  return o.addConversion = function(N) {
    Ve(N);
    const _ = l(N.to);
    if (_.conversionsTo.every(function(L) {
      return L.from !== N.from;
    }))
      _.conversionsTo.push({
        from: N.from,
        convert: N.convert,
        index: a++
      });
    else
      throw new Error('There is already a conversion from "' + N.from + '" to "' + _.name + '"');
  }, o.addConversions = function(N) {
    N.forEach(o.addConversion);
  }, o.removeConversion = function(N) {
    Ve(N);
    const _ = l(N.to), L = ue(_.conversionsTo, (H) => H.from === N.from);
    if (!L)
      throw new Error("Attempt to remove nonexistent conversion from " + N.from + " to " + N.to);
    if (L.convert !== N.convert)
      throw new Error("Conversion to remove does not match existing conversion");
    const R = _.conversionsTo.indexOf(L);
    _.conversionsTo.splice(R, 1);
  }, o.resolve = function(N, _) {
    if (!f(N))
      throw new TypeError(an);
    const L = N._typedFunctionData.signatures;
    for (let R = 0; R < L.length; ++R)
      if (L[R].test(_))
        return L[R];
    return null;
  }, o;
}
const un = wi();
function ze(e) {
  return typeof e == "boolean" ? !0 : isFinite(e) ? e === Math.round(e) : !1;
}
var _u = Math.sign || function(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
};
function _t(e, n, t) {
  var i = {
    2: "0b",
    8: "0o",
    16: "0x"
  }, r = i[n], a = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!ze(t))
      throw new Error("size must be an integer");
    if (e > 2 ** (t - 1) - 1 || e < -(2 ** (t - 1)))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!ze(e))
      throw new Error("Value must be an integer");
    e < 0 && (e = e + 2 ** t), a = "i".concat(t);
  }
  var o = "";
  return e < 0 && (e = -e, o = "-"), "".concat(o).concat(r).concat(e.toString(n)).concat(a);
}
function Ot(e, n) {
  if (typeof n == "function")
    return n(e);
  if (e === 1 / 0)
    return "Infinity";
  if (e === -1 / 0)
    return "-Infinity";
  if (isNaN(e))
    return "NaN";
  var t = "auto", i, r;
  if (n && (n.notation && (t = n.notation), Le(n) ? i = n : Le(n.precision) && (i = n.precision), n.wordSize && (r = n.wordSize, typeof r != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (t) {
    case "fixed":
      return Tu(e, i);
    case "exponential":
      return Ai(e, i);
    case "engineering":
      return zu(e, i);
    case "bin":
      return _t(e, 2, r);
    case "oct":
      return _t(e, 8, r);
    case "hex":
      return _t(e, 16, r);
    case "auto":
      return Iu(e, i, n && n).replace(/((\.\d*?)(0+))($|e)/, function() {
        var a = arguments[2], o = arguments[4];
        return a !== "." ? a + o : o;
      });
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function At(e) {
  var n = String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!n)
    throw new SyntaxError("Invalid number " + e);
  var t = n[1], i = n[2], r = parseFloat(n[4] || "0"), a = i.indexOf(".");
  r += a !== -1 ? a - 1 : i.length - 1;
  var o = i.replace(".", "").replace(/^0*/, function(l) {
    return r -= l.length, "";
  }).replace(/0*$/, "").split("").map(function(l) {
    return parseInt(l);
  });
  return o.length === 0 && (o.push(0), r++), {
    sign: t,
    coefficients: o,
    exponent: r
  };
}
function zu(e, n) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = At(e), i = Et(t, n), r = i.exponent, a = i.coefficients, o = r % 3 === 0 ? r : r < 0 ? r - 3 - r % 3 : r - r % 3;
  if (Le(n))
    for (; n > a.length || r - o + 1 > a.length; )
      a.push(0);
  else
    for (var l = Math.abs(r - o) - (a.length - 1), c = 0; c < l; c++)
      a.push(0);
  for (var h = Math.abs(r - o), s = 1; h > 0; )
    s++, h--;
  var u = a.slice(s).join(""), f = Le(n) && u.length || u.match(/[1-9]/) ? "." + u : "", d = a.slice(0, s).join("") + f + "e" + (r >= 0 ? "+" : "") + o.toString();
  return i.sign + d;
}
function Tu(e, n) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = At(e), i = typeof n == "number" ? Et(t, t.exponent + 1 + n) : t, r = i.coefficients, a = i.exponent + 1, o = a + (n || 0);
  return r.length < o && (r = r.concat(zr(o - r.length))), a < 0 && (r = zr(-a + 1).concat(r), a = 1), a < r.length && r.splice(a, 0, a === 0 ? "0." : "."), i.sign + r.join("");
}
function Ai(e, n) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = At(e), i = n ? Et(t, n) : t, r = i.coefficients, a = i.exponent;
  r.length < n && (r = r.concat(zr(n - r.length)));
  var o = r.shift();
  return i.sign + o + (r.length > 0 ? "." + r.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
}
function Iu(e, n, t) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var i = t && t.lowerExp !== void 0 ? t.lowerExp : -3, r = t && t.upperExp !== void 0 ? t.upperExp : 5, a = At(e), o = n ? Et(a, n) : a;
  if (o.exponent < i || o.exponent >= r)
    return Ai(e, n);
  var l = o.coefficients, c = o.exponent;
  l.length < n && (l = l.concat(zr(n - l.length))), l = l.concat(zr(c - l.length + 1 + (l.length < n ? n - l.length : 0))), l = zr(-c).concat(l);
  var h = c > 0 ? c : 0;
  return h < l.length - 1 && l.splice(h + 1, 0, "."), o.sign + l.join("");
}
function Et(e, n) {
  for (var t = {
    sign: e.sign,
    coefficients: e.coefficients,
    exponent: e.exponent
  }, i = t.coefficients; n <= 0; )
    i.unshift(0), t.exponent++, n++;
  if (i.length > n) {
    var r = i.splice(n, i.length - n);
    if (r[0] >= 5) {
      var a = n - 1;
      for (i[a]++; i[a] === 10; )
        i.pop(), a === 0 && (i.unshift(0), t.exponent++, a++), a--, i[a]++;
    }
  }
  return t;
}
function zr(e) {
  for (var n = [], t = 0; t < e; t++)
    n.push(0);
  return n;
}
function Ou(e) {
  return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var Lu = Number.EPSILON || 2220446049250313e-31;
function yr(e, n, t) {
  if (t == null)
    return e === n;
  if (e === n)
    return !0;
  if (isNaN(e) || isNaN(n))
    return !1;
  if (isFinite(e) && isFinite(n)) {
    var i = Math.abs(e - n);
    return i <= Lu ? !0 : i <= Math.max(Math.abs(e), Math.abs(n)) * t;
  }
  return !1;
}
function zt(e, n, t) {
  var i = e.constructor, r = new i(2), a = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!ze(t))
      throw new Error("size must be an integer");
    if (e.greaterThan(r.pow(t - 1).sub(1)) || e.lessThan(r.pow(t - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!e.isInteger())
      throw new Error("Value must be an integer");
    e.lessThan(0) && (e = e.add(r.pow(t))), a = "i".concat(t);
  }
  switch (n) {
    case 2:
      return "".concat(e.toBinary()).concat(a);
    case 8:
      return "".concat(e.toOctal()).concat(a);
    case 16:
      return "".concat(e.toHexadecimal()).concat(a);
    default:
      throw new Error("Base ".concat(n, " not supported "));
  }
}
function $u(e, n) {
  if (typeof n == "function")
    return n(e);
  if (!e.isFinite())
    return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
  var t = "auto", i, r;
  if (n !== void 0 && (n.notation && (t = n.notation), typeof n == "number" ? i = n : n.precision !== void 0 && (i = n.precision), n.wordSize && (r = n.wordSize, typeof r != "number")))
    throw new Error('Option "wordSize" must be a number');
  switch (t) {
    case "fixed":
      return Pu(e, i);
    case "exponential":
      return on(e, i);
    case "engineering":
      return qu(e, i);
    case "bin":
      return zt(e, 2, r);
    case "oct":
      return zt(e, 8, r);
    case "hex":
      return zt(e, 16, r);
    case "auto": {
      var a = n && n.lowerExp !== void 0 ? n.lowerExp : -3, o = n && n.upperExp !== void 0 ? n.upperExp : 5;
      if (e.isZero())
        return "0";
      var l, c = e.toSignificantDigits(i), h = c.e;
      return h >= a && h < o ? l = c.toFixed() : l = on(e, i), l.replace(/((\.\d*?)(0+))($|e)/, function() {
        var s = arguments[2], u = arguments[4];
        return s !== "." ? s + u : u;
      });
    }
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function qu(e, n) {
  var t = e.e, i = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, r = e.mul(Math.pow(10, -i)), a = r.toPrecision(n);
  if (a.indexOf("e") !== -1) {
    var o = e.constructor;
    a = new o(a).toFixed();
  }
  return a + "e" + (t >= 0 ? "+" : "") + i.toString();
}
function on(e, n) {
  return n !== void 0 ? e.toExponential(n - 1) : e.toExponential();
}
function Pu(e, n) {
  return e.toFixed(n);
}
function Oe(e, n) {
  var t = Ru(e, n);
  return n && typeof n == "object" && "truncate" in n && t.length > n.truncate ? t.substring(0, n.truncate - 3) + "..." : t;
}
function Ru(e, n) {
  if (typeof e == "number")
    return Ot(e, n);
  if (Re(e))
    return $u(e, n);
  if (Uu(e))
    return !n || n.fraction !== "decimal" ? e.s * e.n + "/" + e.d : e.toString();
  if (Array.isArray(e))
    return Ei(e, n);
  if (tr(e))
    return sn(e);
  if (typeof e == "function")
    return e.syntax ? String(e.syntax) : "function";
  if (e && typeof e == "object") {
    if (typeof e.format == "function")
      return e.format(n);
    if (e && e.toString(n) !== {}.toString())
      return e.toString(n);
    var t = Object.keys(e).map((i) => sn(i) + ": " + Oe(e[i], n));
    return "{" + t.join(", ") + "}";
  }
  return String(e);
}
function sn(e) {
  for (var n = String(e), t = "", i = 0; i < n.length; ) {
    var r = n.charAt(i);
    t += r in fn ? fn[r] : r, i++;
  }
  return '"' + t + '"';
}
var fn = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function Ei(e, n) {
  if (Array.isArray(e)) {
    for (var t = "[", i = e.length, r = 0; r < i; r++)
      r !== 0 && (t += ", "), t += Ei(e[r], n);
    return t += "]", t;
  } else
    return Oe(e, n);
}
function Uu(e) {
  return e && typeof e == "object" && typeof e.s == "number" && typeof e.n == "number" && typeof e.d == "number" || !1;
}
function Fe(e, n, t) {
  if (!(this instanceof Fe))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = e, this.expected = n, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(n) ? "[" + n.join(", ") + "]" : n) + ")", this.stack = new Error().stack;
}
Fe.prototype = new RangeError();
Fe.prototype.constructor = RangeError;
Fe.prototype.name = "DimensionError";
Fe.prototype.isDimensionError = !0;
function br(e, n, t) {
  if (!(this instanceof br))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = e, arguments.length < 3 ? (this.min = 0, this.max = n) : (this.min = n, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
br.prototype = new RangeError();
br.prototype.constructor = RangeError;
br.prototype.name = "IndexError";
br.prototype.isIndexError = !0;
function $e(e) {
  for (var n = []; Array.isArray(e); )
    n.push(e.length), e = e[0];
  return n;
}
function Fi(e, n, t) {
  var i, r = e.length;
  if (r !== n[t])
    throw new Fe(r, n[t]);
  if (t < n.length - 1) {
    var a = t + 1;
    for (i = 0; i < r; i++) {
      var o = e[i];
      if (!Array.isArray(o))
        throw new Fe(n.length - 1, n.length, "<");
      Fi(e[i], n, a);
    }
  } else
    for (i = 0; i < r; i++)
      if (Array.isArray(e[i]))
        throw new Fe(n.length + 1, n.length, ">");
}
function cn(e, n) {
  var t = n.length === 0;
  if (t) {
    if (Array.isArray(e))
      throw new Fe(e.length, 0);
  } else
    Fi(e, n, 0);
}
function st(e, n) {
  var t = e.isMatrix ? e._size : $e(e), i = n._sourceSize;
  i.forEach((r, a) => {
    if (r !== null && r !== t[a])
      throw new Fe(r, t[a]);
  });
}
function Be(e, n) {
  if (e !== void 0) {
    if (!Le(e) || !ze(e))
      throw new TypeError("Index must be an integer (value: " + e + ")");
    if (e < 0 || typeof n == "number" && e >= n)
      throw new br(e, n);
  }
}
function Lr(e) {
  for (var n = 0; n < e._dimensions.length; ++n) {
    var t = e._dimensions[n];
    if (t._data && Me(t._data)) {
      if (t._size[0] === 0)
        return !0;
    } else if (t.isRange) {
      if (t.start === t.end)
        return !0;
    } else if (tr(t) && t.length === 0)
      return !0;
  }
  return !1;
}
function ft(e, n, t) {
  if (!Array.isArray(n))
    throw new TypeError("Array expected");
  if (n.length === 0)
    throw new Error("Resizing to scalar is not supported");
  n.forEach(function(r) {
    if (!Le(r) || !ze(r) || r < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Oe(n) + ")");
  }), (Le(e) || Re(e)) && (e = [e]);
  var i = t !== void 0 ? t : 0;
  return Lt(e, n, 0, i), e;
}
function Lt(e, n, t, i) {
  var r, a, o = e.length, l = n[t], c = Math.min(o, l);
  if (e.length = l, t < n.length - 1) {
    var h = t + 1;
    for (r = 0; r < c; r++)
      a = e[r], Array.isArray(a) || (a = [a], e[r] = a), Lt(a, n, h, i);
    for (r = c; r < l; r++)
      a = [], e[r] = a, Lt(a, n, h, i);
  } else {
    for (r = 0; r < c; r++)
      for (; Array.isArray(e[r]); )
        e[r] = e[r][0];
    for (r = c; r < l; r++)
      e[r] = i;
  }
}
function Qt(e, n) {
  var t = $t(e), i = t.length;
  if (!Array.isArray(e) || !Array.isArray(n))
    throw new TypeError("Array expected");
  if (n.length === 0)
    throw new Fe(0, i, "!=");
  n = Xt(n, i);
  var r = Ci(n);
  if (i !== r)
    throw new Fe(r, i, "!=");
  try {
    return Vu(t, n);
  } catch (a) {
    throw a instanceof Fe ? new Fe(r, i, "!=") : a;
  }
}
function Xt(e, n) {
  var t = Ci(e), i = e.slice(), r = -1, a = e.indexOf(r), o = e.indexOf(r, a + 1) >= 0;
  if (o)
    throw new Error("More than one wildcard in sizes");
  var l = a >= 0, c = n % t === 0;
  if (l)
    if (c)
      i[a] = -n / t;
    else
      throw new Error("Could not replace wildcard, since " + n + " is no multiple of " + -t);
  return i;
}
function Ci(e) {
  return e.reduce((n, t) => n * t, 1);
}
function Vu(e, n) {
  for (var t = e, i, r = n.length - 1; r > 0; r--) {
    var a = n[r];
    i = [];
    for (var o = t.length / a, l = 0; l < o; l++)
      i.push(t.slice(l * a, (l + 1) * a));
    t = i;
  }
  return t;
}
function ln(e, n) {
  for (var t = n || $e(e); Array.isArray(e) && e.length === 1; )
    e = e[0], t.shift();
  for (var i = t.length; t[i - 1] === 1; )
    i--;
  return i < t.length && (e = bi(e, i, 0), t.length = i), e;
}
function bi(e, n, t) {
  var i, r;
  if (t < n) {
    var a = t + 1;
    for (i = 0, r = e.length; i < r; i++)
      e[i] = bi(e[i], n, a);
  } else
    for (; Array.isArray(e); )
      e = e[0];
  return e;
}
function Mi(e, n, t, i) {
  var r = i || $e(e);
  if (t)
    for (var a = 0; a < t; a++)
      e = [e], r.unshift(1);
  for (e = Si(e, n, 0); r.length < n; )
    r.push(1);
  return e;
}
function Si(e, n, t) {
  var i, r;
  if (Array.isArray(e)) {
    var a = t + 1;
    for (i = 0, r = e.length; i < r; i++)
      e[i] = Si(e[i], n, a);
  } else
    for (var o = t; o < n; o++)
      e = [e];
  return e;
}
function $t(e) {
  if (!Array.isArray(e))
    return e;
  var n = [];
  return e.forEach(function t(i) {
    Array.isArray(i) ? i.forEach(t) : n.push(i);
  }), n;
}
function Jr(e, n) {
  for (var t, i = 0, r = 0; r < e.length; r++) {
    var a = e[r], o = Array.isArray(a);
    if (r === 0 && o && (i = a.length), o && a.length !== i)
      return;
    var l = o ? Jr(a, n) : n(a);
    if (t === void 0)
      t = l;
    else if (t !== l)
      return "mixed";
  }
  return t;
}
function xi(e, n, t, i) {
  if (i < t) {
    if (e.length !== n.length)
      throw new Fe(e.length, n.length);
    for (var r = [], a = 0; a < e.length; a++)
      r[a] = xi(e[a], n[a], t, i + 1);
    return r;
  } else
    return e.concat(n);
}
function Ni() {
  var e = Array.prototype.slice.call(arguments, 0, -1), n = Array.prototype.slice.call(arguments, -1);
  if (e.length === 1)
    return e[0];
  if (e.length > 1)
    return e.slice(1).reduce(function(t, i) {
      return xi(t, i, n, 0);
    }, e[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function Zu() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  for (var i = n.map((f) => f.length), r = Math.max(...i), a = new Array(r).fill(null), o = 0; o < n.length; o++)
    for (var l = n[o], c = i[o], h = 0; h < c; h++) {
      var s = r - c + h;
      l[h] > a[s] && (a[s] = l[h]);
    }
  for (var u = 0; u < n.length; u++)
    ct(n[u], a);
  return a;
}
function ct(e, n) {
  for (var t = n.length, i = e.length, r = 0; r < i; r++) {
    var a = t - i + r;
    if (e[r] < n[a] && e[r] > 1 || e[r] > n[a])
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(e, ") not possible to broadcast dimension ").concat(i, " with size ").concat(e[r], " to size ").concat(n[a]));
  }
}
function hn(e, n) {
  var t = $e(e);
  if (Or(t, n))
    return e;
  ct(t, n);
  var i = Zu(t, n), r = i.length, a = [...Array(r - t.length).fill(1), ...t], o = Yu(e);
  t.length < r && (o = Qt(o, a), t = $e(o));
  for (var l = 0; l < r; l++)
    t[l] < i[l] && (o = Gu(o, i[l], l), t = $e(o));
  return o;
}
function Gu(e, n, t) {
  return Ni(...Array(n).fill(e), t);
}
function Yu(e) {
  return Ir([], e);
}
function ee(e, n, t, i) {
  function r(a) {
    var o = xu(a, n.map(Xu));
    return Ju(e, n, a), t(o);
  }
  return r.isFactory = !0, r.fn = e, r.dependencies = n.slice().sort(), i && (r.meta = i), r;
}
function Ju(e, n, t) {
  var i = n.filter((a) => !Qu(a)).every((a) => t[a] !== void 0);
  if (!i) {
    var r = n.filter((a) => t[a] === void 0);
    throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(r.map((a) => '"'.concat(a, '"')).join(", "), "."));
  }
}
function Qu(e) {
  return e && e[0] === "?";
}
function Xu(e) {
  return e && e[0] === "?" ? e.slice(1) : e;
}
function Bi(e, n) {
  if (Ti(e) && zi(e, n))
    return e[n];
  throw typeof e[n] == "function" && Ku(e, n) ? new Error('Cannot access method "' + n + '" as a property') : new Error('No access to property "' + n + '"');
}
function _i(e, n, t) {
  if (Ti(e) && zi(e, n))
    return e[n] = t, t;
  throw new Error('No access to property "' + n + '"');
}
function Hu(e, n) {
  return n in e;
}
function zi(e, n) {
  return !e || typeof e != "object" ? !1 : Yr(Wu, n) ? !0 : !(n in Object.prototype || n in Function.prototype);
}
function Ku(e, n) {
  return e == null || typeof e[n] != "function" || Yr(e, n) && Object.getPrototypeOf && n in Object.getPrototypeOf(e) ? !1 : Yr(ku, n) ? !0 : !(n in Object.prototype || n in Function.prototype);
}
function Ti(e) {
  return typeof e == "object" && e && e.constructor === Object;
}
var Wu = {
  length: !0,
  name: !0
}, ku = {
  toString: !0,
  valueOf: !0,
  toLocaleString: !0
};
class ju {
  constructor(n) {
    this.wrappedObject = n;
  }
  keys() {
    return Object.keys(this.wrappedObject);
  }
  get(n) {
    return Bi(this.wrappedObject, n);
  }
  set(n, t) {
    return _i(this.wrappedObject, n, t), this;
  }
  has(n) {
    return Hu(this.wrappedObject, n);
  }
}
function eo(e) {
  return e ? e instanceof Map || e instanceof ju || typeof e.set == "function" && typeof e.get == "function" && typeof e.keys == "function" && typeof e.has == "function" : !1;
}
var Ii = function() {
  return Ii = un.create, un;
}, ro = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], to = /* @__PURE__ */ ee("typed", ro, function(n) {
  var {
    BigNumber: t,
    Complex: i,
    DenseMatrix: r,
    Fraction: a
  } = n, o = Ii();
  return o.clear(), o.addTypes([
    {
      name: "number",
      test: Le
    },
    {
      name: "Complex",
      test: Yt
    },
    {
      name: "BigNumber",
      test: Re
    },
    {
      name: "Fraction",
      test: Jt
    },
    {
      name: "Unit",
      test: pi
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    {
      name: "identifier",
      test: (l) => tr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(l)
    },
    {
      name: "string",
      test: tr
    },
    {
      name: "Chain",
      test: bu
    },
    {
      name: "Array",
      test: Me
    },
    {
      name: "Matrix",
      test: _e
    },
    {
      name: "DenseMatrix",
      test: mi
    },
    {
      name: "SparseMatrix",
      test: gi
    },
    {
      name: "Range",
      test: Di
    },
    {
      name: "Index",
      test: wt
    },
    {
      name: "boolean",
      test: ru
    },
    {
      name: "ResultSet",
      test: tu
    },
    {
      name: "Help",
      test: nu
    },
    {
      name: "function",
      test: iu
    },
    {
      name: "Date",
      test: au
    },
    {
      name: "RegExp",
      test: uu
    },
    {
      name: "null",
      test: ou
    },
    {
      name: "undefined",
      test: su
    },
    {
      name: "AccessorNode",
      test: fu
    },
    {
      name: "ArrayNode",
      test: cu
    },
    {
      name: "AssignmentNode",
      test: lu
    },
    {
      name: "BlockNode",
      test: hu
    },
    {
      name: "ConditionalNode",
      test: vu
    },
    {
      name: "ConstantNode",
      test: du
    },
    {
      name: "FunctionNode",
      test: mu
    },
    {
      name: "FunctionAssignmentNode",
      test: pu
    },
    {
      name: "IndexNode",
      test: gu
    },
    {
      name: "Node",
      test: Du
    },
    {
      name: "ObjectNode",
      test: yu
    },
    {
      name: "OperatorNode",
      test: wu
    },
    {
      name: "ParenthesisNode",
      test: Au
    },
    {
      name: "RangeNode",
      test: Eu
    },
    {
      name: "RelationalNode",
      test: Fu
    },
    {
      name: "SymbolNode",
      test: Cu
    },
    {
      name: "Map",
      test: eo
    },
    {
      name: "Object",
      test: yi
    }
    // order 'Object' last, it matches on other classes too
  ]), o.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function(c) {
      if (t || Tt(c), Ou(c) > 15)
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + c + "). Use function bignumber(x) to convert to BigNumber.");
      return new t(c);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c.toNumber(), 0);
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function(c) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function(c) {
      return i || at(c), new i(c.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function(c) {
      a || It(c);
      var h = new a(c);
      if (h.valueOf() !== c)
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + c + "). Use function fraction(x) to convert to Fraction.");
      return h;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function(c) {
      var h = Number(c);
      if (isNaN(h))
        throw new Error('Cannot convert "' + c + '" to a number');
      return h;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function(c) {
      t || Tt(c);
      try {
        return new t(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function(c) {
      a || It(c);
      try {
        return new a(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function(c) {
      i || at(c);
      try {
        return new i(c);
      } catch {
        throw new Error('Cannot convert "' + c + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function(c) {
      return +c;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function(c) {
      return t || Tt(c), new t(+c);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function(c) {
      return a || It(c), new a(+c);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function(c) {
      return String(c);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function(c) {
      return r || no(), new r(c);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function(c) {
      return c.valueOf();
    }
  }]), o.onMismatch = (l, c, h) => {
    var s = o.createError(l, c, h);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    h.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(l, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(l, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o.onMismatch = (l, c, h) => {
    var s = o.createError(l, c, h);
    if (["wrongType", "mismatch"].includes(s.data.category) && c.length === 1 && ot(c[0]) && // check if the function can be unary:
    h.some((f) => !f.params.includes(","))) {
      var u = new TypeError("Function '".concat(l, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(l, ")'."));
      throw u.data = s.data, u;
    }
    throw s;
  }, o;
});
function Tt(e) {
  throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided"));
}
function at(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided"));
}
function no() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function It(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided."));
}
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var _r = 9e15, Ar = 1e9, qt = "0123456789abcdef", lt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", ht = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", Pt = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -_r,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: _r,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, Oi, dr, me = !0, Ft = "[DecimalError] ", wr = Ft + "Invalid argument: ", Li = Ft + "Precision limit exceeded", $i = Ft + "crypto unavailable", qi = "[object Decimal]", Qe = Math.floor, Ze = Math.pow, io = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, ao = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, uo = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Pi = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, fr = 1e7, de = 7, oo = 9007199254740991, so = lt.length - 1, Rt = ht.length - 1, W = { toStringTag: qi };
W.absoluteValue = W.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), ve(e);
};
W.ceil = function() {
  return ve(new this.constructor(this), this.e + 1, 2);
};
W.clampedTo = W.clamp = function(e, n) {
  var t, i = this, r = i.constructor;
  if (e = new r(e), n = new r(n), !e.s || !n.s)
    return new r(NaN);
  if (e.gt(n))
    throw Error(wr + n);
  return t = i.cmp(e), t < 0 ? e : i.cmp(n) > 0 ? n : new r(i);
};
W.comparedTo = W.cmp = function(e) {
  var n, t, i, r, a = this, o = a.d, l = (e = new a.constructor(e)).d, c = a.s, h = e.s;
  if (!o || !l)
    return !c || !h ? NaN : c !== h ? c : o === l ? 0 : !o ^ c < 0 ? 1 : -1;
  if (!o[0] || !l[0])
    return o[0] ? c : l[0] ? -h : 0;
  if (c !== h)
    return c;
  if (a.e !== e.e)
    return a.e > e.e ^ c < 0 ? 1 : -1;
  for (i = o.length, r = l.length, n = 0, t = i < r ? i : r; n < t; ++n)
    if (o[n] !== l[n])
      return o[n] > l[n] ^ c < 0 ? 1 : -1;
  return i === r ? 0 : i > r ^ c < 0 ? 1 : -1;
};
W.cosine = W.cos = function() {
  var e, n, t = this, i = t.constructor;
  return t.d ? t.d[0] ? (e = i.precision, n = i.rounding, i.precision = e + Math.max(t.e, t.sd()) + de, i.rounding = 1, t = fo(i, Gi(i, t)), i.precision = e, i.rounding = n, ve(dr == 2 || dr == 3 ? t.neg() : t, e, n, !0)) : new i(1) : new i(NaN);
};
W.cubeRoot = W.cbrt = function() {
  var e, n, t, i, r, a, o, l, c, h, s = this, u = s.constructor;
  if (!s.isFinite() || s.isZero())
    return new u(s);
  for (me = !1, a = s.s * Ze(s.s * s, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (t = Ye(s.d), e = s.e, (a = (e - t.length + 1) % 3) && (t += a == 1 || a == -2 ? "0" : "00"), a = Ze(t, 1 / 3), e = Qe((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), i = new u(t), i.s = s.s) : i = new u(a.toString()), o = (e = u.precision) + 3; ; )
    if (l = i, c = l.times(l).times(l), h = c.plus(s), i = Te(h.plus(s).times(l), h.plus(c), o + 2, 1), Ye(l.d).slice(0, o) === (t = Ye(i.d)).slice(0, o))
      if (t = t.slice(o - 3, o + 1), t == "9999" || !r && t == "4999") {
        if (!r && (ve(l, e + 1, 0), l.times(l).times(l).eq(s))) {
          i = l;
          break;
        }
        o += 4, r = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (ve(i, e + 1, 1), n = !i.times(i).times(i).eq(s));
        break;
      }
  return me = !0, ve(i, e, u.rounding, n);
};
W.decimalPlaces = W.dp = function() {
  var e, n = this.d, t = NaN;
  if (n) {
    if (e = n.length - 1, t = (e - Qe(this.e / de)) * de, e = n[e], e)
      for (; e % 10 == 0; e /= 10)
        t--;
    t < 0 && (t = 0);
  }
  return t;
};
W.dividedBy = W.div = function(e) {
  return Te(this, new this.constructor(e));
};
W.dividedToIntegerBy = W.divToInt = function(e) {
  var n = this, t = n.constructor;
  return ve(Te(n, new t(e), 0, 1, 1), t.precision, t.rounding);
};
W.equals = W.eq = function(e) {
  return this.cmp(e) === 0;
};
W.floor = function() {
  return ve(new this.constructor(this), this.e + 1, 3);
};
W.greaterThan = W.gt = function(e) {
  return this.cmp(e) > 0;
};
W.greaterThanOrEqualTo = W.gte = function(e) {
  var n = this.cmp(e);
  return n == 1 || n === 0;
};
W.hyperbolicCosine = W.cosh = function() {
  var e, n, t, i, r, a = this, o = a.constructor, l = new o(1);
  if (!a.isFinite())
    return new o(a.s ? 1 / 0 : NaN);
  if (a.isZero())
    return l;
  t = o.precision, i = o.rounding, o.precision = t + Math.max(a.e, a.sd()) + 4, o.rounding = 1, r = a.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / bt(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), a = $r(o, 1, a.times(n), new o(1), !0);
  for (var c, h = e, s = new o(8); h--; )
    c = a.times(a), a = l.minus(c.times(s.minus(c.times(s))));
  return ve(a, o.precision = t, o.rounding = i, !0);
};
W.hyperbolicSine = W.sinh = function() {
  var e, n, t, i, r = this, a = r.constructor;
  if (!r.isFinite() || r.isZero())
    return new a(r);
  if (n = a.precision, t = a.rounding, a.precision = n + Math.max(r.e, r.sd()) + 4, a.rounding = 1, i = r.d.length, i < 3)
    r = $r(a, 2, r, r, !0);
  else {
    e = 1.4 * Math.sqrt(i), e = e > 16 ? 16 : e | 0, r = r.times(1 / bt(5, e)), r = $r(a, 2, r, r, !0);
    for (var o, l = new a(5), c = new a(16), h = new a(20); e--; )
      o = r.times(r), r = r.times(l.plus(o.times(c.times(o).plus(h))));
  }
  return a.precision = n, a.rounding = t, ve(r, n, t, !0);
};
W.hyperbolicTangent = W.tanh = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 7, i.rounding = 1, Te(t.sinh(), t.cosh(), i.precision = e, i.rounding = n)) : new i(t.s);
};
W.inverseCosine = W.acos = function() {
  var e, n = this, t = n.constructor, i = n.abs().cmp(1), r = t.precision, a = t.rounding;
  return i !== -1 ? i === 0 ? n.isNeg() ? sr(t, r, a) : new t(0) : new t(NaN) : n.isZero() ? sr(t, r + 4, a).times(0.5) : (t.precision = r + 6, t.rounding = 1, n = n.asin(), e = sr(t, r + 4, a).times(0.5), t.precision = r, t.rounding = a, e.minus(n));
};
W.inverseHyperbolicCosine = W.acosh = function() {
  var e, n, t = this, i = t.constructor;
  return t.lte(1) ? new i(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = i.precision, n = i.rounding, i.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, i.rounding = 1, me = !1, t = t.times(t).minus(1).sqrt().plus(t), me = !0, i.precision = e, i.rounding = n, t.ln()) : new i(t);
};
W.inverseHyperbolicSine = W.asinh = function() {
  var e, n, t = this, i = t.constructor;
  return !t.isFinite() || t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, i.rounding = 1, me = !1, t = t.times(t).plus(1).sqrt().plus(t), me = !0, i.precision = e, i.rounding = n, t.ln());
};
W.inverseHyperbolicTangent = W.atanh = function() {
  var e, n, t, i, r = this, a = r.constructor;
  return r.isFinite() ? r.e >= 0 ? new a(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = a.precision, n = a.rounding, i = r.sd(), Math.max(i, e) < 2 * -r.e - 1 ? ve(new a(r), e, n, !0) : (a.precision = t = i - r.e, r = Te(r.plus(1), new a(1).minus(r), t + e, 1), a.precision = e + 4, a.rounding = 1, r = r.ln(), a.precision = e, a.rounding = n, r.times(0.5))) : new a(NaN);
};
W.inverseSine = W.asin = function() {
  var e, n, t, i, r = this, a = r.constructor;
  return r.isZero() ? new a(r) : (n = r.abs().cmp(1), t = a.precision, i = a.rounding, n !== -1 ? n === 0 ? (e = sr(a, t + 4, i).times(0.5), e.s = r.s, e) : new a(NaN) : (a.precision = t + 6, a.rounding = 1, r = r.div(new a(1).minus(r.times(r)).sqrt().plus(1)).atan(), a.precision = t, a.rounding = i, r.times(2)));
};
W.inverseTangent = W.atan = function() {
  var e, n, t, i, r, a, o, l, c, h = this, s = h.constructor, u = s.precision, f = s.rounding;
  if (h.isFinite()) {
    if (h.isZero())
      return new s(h);
    if (h.abs().eq(1) && u + 4 <= Rt)
      return o = sr(s, u + 4, f).times(0.25), o.s = h.s, o;
  } else {
    if (!h.s)
      return new s(NaN);
    if (u + 4 <= Rt)
      return o = sr(s, u + 4, f).times(0.5), o.s = h.s, o;
  }
  for (s.precision = l = u + 10, s.rounding = 1, t = Math.min(28, l / de + 2 | 0), e = t; e; --e)
    h = h.div(h.times(h).plus(1).sqrt().plus(1));
  for (me = !1, n = Math.ceil(l / de), i = 1, c = h.times(h), o = new s(h), r = h; e !== -1; )
    if (r = r.times(c), a = o.minus(r.div(i += 2)), r = r.times(c), o = a.plus(r.div(i += 2)), o.d[n] !== void 0)
      for (e = n; o.d[e] === a.d[e] && e--; )
        ;
  return t && (o = o.times(2 << t - 1)), me = !0, ve(o, s.precision = u, s.rounding = f, !0);
};
W.isFinite = function() {
  return !!this.d;
};
W.isInteger = W.isInt = function() {
  return !!this.d && Qe(this.e / de) > this.d.length - 2;
};
W.isNaN = function() {
  return !this.s;
};
W.isNegative = W.isNeg = function() {
  return this.s < 0;
};
W.isPositive = W.isPos = function() {
  return this.s > 0;
};
W.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
W.lessThan = W.lt = function(e) {
  return this.cmp(e) < 0;
};
W.lessThanOrEqualTo = W.lte = function(e) {
  return this.cmp(e) < 1;
};
W.logarithm = W.log = function(e) {
  var n, t, i, r, a, o, l, c, h = this, s = h.constructor, u = s.precision, f = s.rounding, d = 5;
  if (e == null)
    e = new s(10), n = !0;
  else {
    if (e = new s(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1))
      return new s(NaN);
    n = e.eq(10);
  }
  if (t = h.d, h.s < 0 || !t || !t[0] || h.eq(1))
    return new s(t && !t[0] ? -1 / 0 : h.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (n)
    if (t.length > 1)
      a = !0;
    else {
      for (r = t[0]; r % 10 === 0; )
        r /= 10;
      a = r !== 1;
    }
  if (me = !1, l = u + d, o = Dr(h, l), i = n ? vt(s, l + 10) : Dr(e, l), c = Te(o, i, l, 1), Qr(c.d, r = u, f))
    do
      if (l += 10, o = Dr(h, l), i = n ? vt(s, l + 10) : Dr(e, l), c = Te(o, i, l, 1), !a) {
        +Ye(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = ve(c, u + 1, 0));
        break;
      }
    while (Qr(c.d, r += 10, f));
  return me = !0, ve(c, u, f);
};
W.minus = W.sub = function(e) {
  var n, t, i, r, a, o, l, c, h, s, u, f, d = this, D = d.constructor;
  if (e = new D(e), !d.d || !e.d)
    return !d.s || !e.s ? e = new D(NaN) : d.d ? e.s = -e.s : e = new D(e.d || d.s !== e.s ? d : NaN), e;
  if (d.s != e.s)
    return e.s = -e.s, d.plus(e);
  if (h = d.d, f = e.d, l = D.precision, c = D.rounding, !h[0] || !f[0]) {
    if (f[0])
      e.s = -e.s;
    else if (h[0])
      e = new D(d);
    else
      return new D(c === 3 ? -0 : 0);
    return me ? ve(e, l, c) : e;
  }
  if (t = Qe(e.e / de), s = Qe(d.e / de), h = h.slice(), a = s - t, a) {
    for (u = a < 0, u ? (n = h, a = -a, o = f.length) : (n = f, t = s, o = h.length), i = Math.max(Math.ceil(l / de), o) + 2, a > i && (a = i, n.length = 1), n.reverse(), i = a; i--; )
      n.push(0);
    n.reverse();
  } else {
    for (i = h.length, o = f.length, u = i < o, u && (o = i), i = 0; i < o; i++)
      if (h[i] != f[i]) {
        u = h[i] < f[i];
        break;
      }
    a = 0;
  }
  for (u && (n = h, h = f, f = n, e.s = -e.s), o = h.length, i = f.length - o; i > 0; --i)
    h[o++] = 0;
  for (i = f.length; i > a; ) {
    if (h[--i] < f[i]) {
      for (r = i; r && h[--r] === 0; )
        h[r] = fr - 1;
      --h[r], h[i] += fr;
    }
    h[i] -= f[i];
  }
  for (; h[--o] === 0; )
    h.pop();
  for (; h[0] === 0; h.shift())
    --t;
  return h[0] ? (e.d = h, e.e = Ct(h, t), me ? ve(e, l, c) : e) : new D(c === 3 ? -0 : 0);
};
W.modulo = W.mod = function(e) {
  var n, t = this, i = t.constructor;
  return e = new i(e), !t.d || !e.s || e.d && !e.d[0] ? new i(NaN) : !e.d || t.d && !t.d[0] ? ve(new i(t), i.precision, i.rounding) : (me = !1, i.modulo == 9 ? (n = Te(t, e.abs(), 0, 3, 1), n.s *= e.s) : n = Te(t, e, 0, i.modulo, 1), n = n.times(e), me = !0, t.minus(n));
};
W.naturalExponential = W.exp = function() {
  return Ut(this);
};
W.naturalLogarithm = W.ln = function() {
  return Dr(this);
};
W.negated = W.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, ve(e);
};
W.plus = W.add = function(e) {
  var n, t, i, r, a, o, l, c, h, s, u = this, f = u.constructor;
  if (e = new f(e), !u.d || !e.d)
    return !u.s || !e.s ? e = new f(NaN) : u.d || (e = new f(e.d || u.s === e.s ? u : NaN)), e;
  if (u.s != e.s)
    return e.s = -e.s, u.minus(e);
  if (h = u.d, s = e.d, l = f.precision, c = f.rounding, !h[0] || !s[0])
    return s[0] || (e = new f(u)), me ? ve(e, l, c) : e;
  if (a = Qe(u.e / de), i = Qe(e.e / de), h = h.slice(), r = a - i, r) {
    for (r < 0 ? (t = h, r = -r, o = s.length) : (t = s, i = a, o = h.length), a = Math.ceil(l / de), o = a > o ? a + 1 : o + 1, r > o && (r = o, t.length = 1), t.reverse(); r--; )
      t.push(0);
    t.reverse();
  }
  for (o = h.length, r = s.length, o - r < 0 && (r = o, t = s, s = h, h = t), n = 0; r; )
    n = (h[--r] = h[r] + s[r] + n) / fr | 0, h[r] %= fr;
  for (n && (h.unshift(n), ++i), o = h.length; h[--o] == 0; )
    h.pop();
  return e.d = h, e.e = Ct(h, i), me ? ve(e, l, c) : e;
};
W.precision = W.sd = function(e) {
  var n, t = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
    throw Error(wr + e);
  return t.d ? (n = Ri(t.d), e && t.e + 1 > n && (n = t.e + 1)) : n = NaN, n;
};
W.round = function() {
  var e = this, n = e.constructor;
  return ve(new n(e), e.e + 1, n.rounding);
};
W.sine = W.sin = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + Math.max(t.e, t.sd()) + de, i.rounding = 1, t = lo(i, Gi(i, t)), i.precision = e, i.rounding = n, ve(dr > 2 ? t.neg() : t, e, n, !0)) : new i(NaN);
};
W.squareRoot = W.sqrt = function() {
  var e, n, t, i, r, a, o = this, l = o.d, c = o.e, h = o.s, s = o.constructor;
  if (h !== 1 || !l || !l[0])
    return new s(!h || h < 0 && (!l || l[0]) ? NaN : l ? o : 1 / 0);
  for (me = !1, h = Math.sqrt(+o), h == 0 || h == 1 / 0 ? (n = Ye(l), (n.length + c) % 2 == 0 && (n += "0"), h = Math.sqrt(n), c = Qe((c + 1) / 2) - (c < 0 || c % 2), h == 1 / 0 ? n = "5e" + c : (n = h.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + c), i = new s(n)) : i = new s(h.toString()), t = (c = s.precision) + 3; ; )
    if (a = i, i = a.plus(Te(o, a, t + 2, 1)).times(0.5), Ye(a.d).slice(0, t) === (n = Ye(i.d)).slice(0, t))
      if (n = n.slice(t - 3, t + 1), n == "9999" || !r && n == "4999") {
        if (!r && (ve(a, c + 1, 0), a.times(a).eq(o))) {
          i = a;
          break;
        }
        t += 4, r = 1;
      } else {
        (!+n || !+n.slice(1) && n.charAt(0) == "5") && (ve(i, c + 1, 1), e = !i.times(i).eq(o));
        break;
      }
  return me = !0, ve(i, c, s.rounding, e);
};
W.tangent = W.tan = function() {
  var e, n, t = this, i = t.constructor;
  return t.isFinite() ? t.isZero() ? new i(t) : (e = i.precision, n = i.rounding, i.precision = e + 10, i.rounding = 1, t = t.sin(), t.s = 1, t = Te(t, new i(1).minus(t.times(t)).sqrt(), e + 10, 0), i.precision = e, i.rounding = n, ve(dr == 2 || dr == 4 ? t.neg() : t, e, n, !0)) : new i(NaN);
};
W.times = W.mul = function(e) {
  var n, t, i, r, a, o, l, c, h, s = this, u = s.constructor, f = s.d, d = (e = new u(e)).d;
  if (e.s *= s.s, !f || !f[0] || !d || !d[0])
    return new u(!e.s || f && !f[0] && !d || d && !d[0] && !f ? NaN : !f || !d ? e.s / 0 : e.s * 0);
  for (t = Qe(s.e / de) + Qe(e.e / de), c = f.length, h = d.length, c < h && (a = f, f = d, d = a, o = c, c = h, h = o), a = [], o = c + h, i = o; i--; )
    a.push(0);
  for (i = h; --i >= 0; ) {
    for (n = 0, r = c + i; r > i; )
      l = a[r] + d[i] * f[r - i - 1] + n, a[r--] = l % fr | 0, n = l / fr | 0;
    a[r] = (a[r] + n) % fr | 0;
  }
  for (; !a[--o]; )
    a.pop();
  return n ? ++t : a.shift(), e.d = a, e.e = Ct(a, t), me ? ve(e, u.precision, u.rounding) : e;
};
W.toBinary = function(e, n) {
  return Ht(this, 2, e, n);
};
W.toDecimalPlaces = W.toDP = function(e, n) {
  var t = this, i = t.constructor;
  return t = new i(t), e === void 0 ? t : (ke(e, 0, Ar), n === void 0 ? n = i.rounding : ke(n, 0, 8), ve(t, e + t.e + 1, n));
};
W.toExponential = function(e, n) {
  var t, i = this, r = i.constructor;
  return e === void 0 ? t = hr(i, !0) : (ke(e, 0, Ar), n === void 0 ? n = r.rounding : ke(n, 0, 8), i = ve(new r(i), e + 1, n), t = hr(i, !0, e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
};
W.toFixed = function(e, n) {
  var t, i, r = this, a = r.constructor;
  return e === void 0 ? t = hr(r) : (ke(e, 0, Ar), n === void 0 ? n = a.rounding : ke(n, 0, 8), i = ve(new a(r), e + r.e + 1, n), t = hr(i, !1, e + i.e + 1)), r.isNeg() && !r.isZero() ? "-" + t : t;
};
W.toFraction = function(e) {
  var n, t, i, r, a, o, l, c, h, s, u, f, d = this, D = d.d, v = d.constructor;
  if (!D)
    return new v(d);
  if (h = t = new v(1), i = c = new v(0), n = new v(i), a = n.e = Ri(D) - d.e - 1, o = a % de, n.d[0] = Ze(10, o < 0 ? de + o : o), e == null)
    e = a > 0 ? n : h;
  else {
    if (l = new v(e), !l.isInt() || l.lt(h))
      throw Error(wr + l);
    e = l.gt(n) ? a > 0 ? n : h : l;
  }
  for (me = !1, l = new v(Ye(D)), s = v.precision, v.precision = a = D.length * de * 2; u = Te(l, n, 0, 1, 1), r = t.plus(u.times(i)), r.cmp(e) != 1; )
    t = i, i = r, r = h, h = c.plus(u.times(r)), c = r, r = n, n = l.minus(u.times(r)), l = r;
  return r = Te(e.minus(t), i, 0, 1, 1), c = c.plus(r.times(h)), t = t.plus(r.times(i)), c.s = h.s = d.s, f = Te(h, i, a, 1).minus(d).abs().cmp(Te(c, t, a, 1).minus(d).abs()) < 1 ? [h, i] : [c, t], v.precision = s, me = !0, f;
};
W.toHexadecimal = W.toHex = function(e, n) {
  return Ht(this, 16, e, n);
};
W.toNearest = function(e, n) {
  var t = this, i = t.constructor;
  if (t = new i(t), e == null) {
    if (!t.d)
      return t;
    e = new i(1), n = i.rounding;
  } else {
    if (e = new i(e), n === void 0 ? n = i.rounding : ke(n, 0, 8), !t.d)
      return e.s ? t : e;
    if (!e.d)
      return e.s && (e.s = t.s), e;
  }
  return e.d[0] ? (me = !1, t = Te(t, e, 0, n, 1).times(e), me = !0, ve(t)) : (e.s = t.s, t = e), t;
};
W.toNumber = function() {
  return +this;
};
W.toOctal = function(e, n) {
  return Ht(this, 8, e, n);
};
W.toPower = W.pow = function(e) {
  var n, t, i, r, a, o, l = this, c = l.constructor, h = +(e = new c(e));
  if (!l.d || !e.d || !l.d[0] || !e.d[0])
    return new c(Ze(+l, h));
  if (l = new c(l), l.eq(1))
    return l;
  if (i = c.precision, a = c.rounding, e.eq(1))
    return ve(l, i, a);
  if (n = Qe(e.e / de), n >= e.d.length - 1 && (t = h < 0 ? -h : h) <= oo)
    return r = Ui(c, l, t, i), e.s < 0 ? new c(1).div(r) : ve(r, i, a);
  if (o = l.s, o < 0) {
    if (n < e.d.length - 1)
      return new c(NaN);
    if (e.d[n] & 1 || (o = 1), l.e == 0 && l.d[0] == 1 && l.d.length == 1)
      return l.s = o, l;
  }
  return t = Ze(+l, h), n = t == 0 || !isFinite(t) ? Qe(h * (Math.log("0." + Ye(l.d)) / Math.LN10 + l.e + 1)) : new c(t + "").e, n > c.maxE + 1 || n < c.minE - 1 ? new c(n > 0 ? o / 0 : 0) : (me = !1, c.rounding = l.s = 1, t = Math.min(12, (n + "").length), r = Ut(e.times(Dr(l, i + t)), i), r.d && (r = ve(r, i + 5, 1), Qr(r.d, i, a) && (n = i + 10, r = ve(Ut(e.times(Dr(l, n + t)), n), n + 5, 1), +Ye(r.d).slice(i + 1, i + 15) + 1 == 1e14 && (r = ve(r, i + 1, 0)))), r.s = o, me = !0, c.rounding = a, ve(r, i, a));
};
W.toPrecision = function(e, n) {
  var t, i = this, r = i.constructor;
  return e === void 0 ? t = hr(i, i.e <= r.toExpNeg || i.e >= r.toExpPos) : (ke(e, 1, Ar), n === void 0 ? n = r.rounding : ke(n, 0, 8), i = ve(new r(i), e, n), t = hr(i, e <= i.e || i.e <= r.toExpNeg, e)), i.isNeg() && !i.isZero() ? "-" + t : t;
};
W.toSignificantDigits = W.toSD = function(e, n) {
  var t = this, i = t.constructor;
  return e === void 0 ? (e = i.precision, n = i.rounding) : (ke(e, 1, Ar), n === void 0 ? n = i.rounding : ke(n, 0, 8)), ve(new i(t), e, n);
};
W.toString = function() {
  var e = this, n = e.constructor, t = hr(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + t : t;
};
W.truncated = W.trunc = function() {
  return ve(new this.constructor(this), this.e + 1, 1);
};
W.valueOf = W.toJSON = function() {
  var e = this, n = e.constructor, t = hr(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
  return e.isNeg() ? "-" + t : t;
};
function Ye(e) {
  var n, t, i, r = e.length - 1, a = "", o = e[0];
  if (r > 0) {
    for (a += o, n = 1; n < r; n++)
      i = e[n] + "", t = de - i.length, t && (a += mr(t)), a += i;
    o = e[n], i = o + "", t = de - i.length, t && (a += mr(t));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; )
    o /= 10;
  return a + o;
}
function ke(e, n, t) {
  if (e !== ~~e || e < n || e > t)
    throw Error(wr + e);
}
function Qr(e, n, t, i) {
  var r, a, o, l;
  for (a = e[0]; a >= 10; a /= 10)
    --n;
  return --n < 0 ? (n += de, r = 0) : (r = Math.ceil((n + 1) / de), n %= de), a = Ze(10, de - n), l = e[r] % a | 0, i == null ? n < 3 ? (n == 0 ? l = l / 100 | 0 : n == 1 && (l = l / 10 | 0), o = t < 4 && l == 99999 || t > 3 && l == 49999 || l == 5e4 || l == 0) : o = (t < 4 && l + 1 == a || t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 100 | 0) == Ze(10, n - 2) - 1 || (l == a / 2 || l == 0) && (e[r + 1] / a / 100 | 0) == 0 : n < 4 ? (n == 0 ? l = l / 1e3 | 0 : n == 1 ? l = l / 100 | 0 : n == 2 && (l = l / 10 | 0), o = (i || t < 4) && l == 9999 || !i && t > 3 && l == 4999) : o = ((i || t < 4) && l + 1 == a || !i && t > 3 && l + 1 == a / 2) && (e[r + 1] / a / 1e3 | 0) == Ze(10, n - 3) - 1, o;
}
function ut(e, n, t) {
  for (var i, r = [0], a, o = 0, l = e.length; o < l; ) {
    for (a = r.length; a--; )
      r[a] *= n;
    for (r[0] += qt.indexOf(e.charAt(o++)), i = 0; i < r.length; i++)
      r[i] > t - 1 && (r[i + 1] === void 0 && (r[i + 1] = 0), r[i + 1] += r[i] / t | 0, r[i] %= t);
  }
  return r.reverse();
}
function fo(e, n) {
  var t, i, r;
  if (n.isZero())
    return n;
  i = n.d.length, i < 32 ? (t = Math.ceil(i / 3), r = (1 / bt(4, t)).toString()) : (t = 16, r = "2.3283064365386962890625e-10"), e.precision += t, n = $r(e, 1, n.times(r), new e(1));
  for (var a = t; a--; ) {
    var o = n.times(n);
    n = o.times(o).minus(o).times(8).plus(1);
  }
  return e.precision -= t, n;
}
var Te = /* @__PURE__ */ function() {
  function e(i, r, a) {
    var o, l = 0, c = i.length;
    for (i = i.slice(); c--; )
      o = i[c] * r + l, i[c] = o % a | 0, l = o / a | 0;
    return l && i.unshift(l), i;
  }
  function n(i, r, a, o) {
    var l, c;
    if (a != o)
      c = a > o ? 1 : -1;
    else
      for (l = c = 0; l < a; l++)
        if (i[l] != r[l]) {
          c = i[l] > r[l] ? 1 : -1;
          break;
        }
    return c;
  }
  function t(i, r, a, o) {
    for (var l = 0; a--; )
      i[a] -= l, l = i[a] < r[a] ? 1 : 0, i[a] = l * o + i[a] - r[a];
    for (; !i[0] && i.length > 1; )
      i.shift();
  }
  return function(i, r, a, o, l, c) {
    var h, s, u, f, d, D, v, m, p, w, g, A, F, y, C, b, E, S, M, x, I = i.constructor, T = i.s == r.s ? 1 : -1, O = i.d, B = r.d;
    if (!O || !O[0] || !B || !B[0])
      return new I(
        // Return NaN if either NaN, or both Infinity or 0.
        !i.s || !r.s || (O ? B && O[0] == B[0] : !B) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          O && O[0] == 0 || !B ? T * 0 : T / 0
        )
      );
    for (c ? (d = 1, s = i.e - r.e) : (c = fr, d = de, s = Qe(i.e / d) - Qe(r.e / d)), M = B.length, E = O.length, p = new I(T), w = p.d = [], u = 0; B[u] == (O[u] || 0); u++)
      ;
    if (B[u] > (O[u] || 0) && s--, a == null ? (y = a = I.precision, o = I.rounding) : l ? y = a + (i.e - r.e) + 1 : y = a, y < 0)
      w.push(1), D = !0;
    else {
      if (y = y / d + 2 | 0, u = 0, M == 1) {
        for (f = 0, B = B[0], y++; (u < E || f) && y--; u++)
          C = f * c + (O[u] || 0), w[u] = C / B | 0, f = C % B | 0;
        D = f || u < E;
      } else {
        for (f = c / (B[0] + 1) | 0, f > 1 && (B = e(B, f, c), O = e(O, f, c), M = B.length, E = O.length), b = M, g = O.slice(0, M), A = g.length; A < M; )
          g[A++] = 0;
        x = B.slice(), x.unshift(0), S = B[0], B[1] >= c / 2 && ++S;
        do
          f = 0, h = n(B, g, M, A), h < 0 ? (F = g[0], M != A && (F = F * c + (g[1] || 0)), f = F / S | 0, f > 1 ? (f >= c && (f = c - 1), v = e(B, f, c), m = v.length, A = g.length, h = n(v, g, m, A), h == 1 && (f--, t(v, M < m ? x : B, m, c))) : (f == 0 && (h = f = 1), v = B.slice()), m = v.length, m < A && v.unshift(0), t(g, v, A, c), h == -1 && (A = g.length, h = n(B, g, M, A), h < 1 && (f++, t(g, M < A ? x : B, A, c))), A = g.length) : h === 0 && (f++, g = [0]), w[u++] = f, h && g[0] ? g[A++] = O[b] || 0 : (g = [O[b]], A = 1);
        while ((b++ < E || g[0] !== void 0) && y--);
        D = g[0] !== void 0;
      }
      w[0] || w.shift();
    }
    if (d == 1)
      p.e = s, Oi = D;
    else {
      for (u = 1, f = w[0]; f >= 10; f /= 10)
        u++;
      p.e = u + s * d - 1, ve(p, l ? a + p.e + 1 : a, o, D);
    }
    return p;
  };
}();
function ve(e, n, t, i) {
  var r, a, o, l, c, h, s, u, f, d = e.constructor;
  e:
    if (n != null) {
      if (u = e.d, !u)
        return e;
      for (r = 1, l = u[0]; l >= 10; l /= 10)
        r++;
      if (a = n - r, a < 0)
        a += de, o = n, s = u[f = 0], c = s / Ze(10, r - o - 1) % 10 | 0;
      else if (f = Math.ceil((a + 1) / de), l = u.length, f >= l)
        if (i) {
          for (; l++ <= f; )
            u.push(0);
          s = c = 0, r = 1, a %= de, o = a - de + 1;
        } else
          break e;
      else {
        for (s = l = u[f], r = 1; l >= 10; l /= 10)
          r++;
        a %= de, o = a - de + r, c = o < 0 ? 0 : s / Ze(10, r - o - 1) % 10 | 0;
      }
      if (i = i || n < 0 || u[f + 1] !== void 0 || (o < 0 ? s : s % Ze(10, r - o - 1)), h = t < 4 ? (c || i) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (t == 4 || i || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (a > 0 ? o > 0 ? s / Ze(10, r - o) : 0 : u[f - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !u[0])
        return u.length = 0, h ? (n -= e.e + 1, u[0] = Ze(10, (de - n % de) % de), e.e = -n || 0) : u[0] = e.e = 0, e;
      if (a == 0 ? (u.length = f, l = 1, f--) : (u.length = f + 1, l = Ze(10, de - a), u[f] = o > 0 ? (s / Ze(10, r - o) % Ze(10, o) | 0) * l : 0), h)
        for (; ; )
          if (f == 0) {
            for (a = 1, o = u[0]; o >= 10; o /= 10)
              a++;
            for (o = u[0] += l, l = 1; o >= 10; o /= 10)
              l++;
            a != l && (e.e++, u[0] == fr && (u[0] = 1));
            break;
          } else {
            if (u[f] += l, u[f] != fr)
              break;
            u[f--] = 0, l = 1;
          }
      for (a = u.length; u[--a] === 0; )
        u.pop();
    }
  return me && (e.e > d.maxE ? (e.d = null, e.e = NaN) : e.e < d.minE && (e.e = 0, e.d = [0])), e;
}
function hr(e, n, t) {
  if (!e.isFinite())
    return Zi(e);
  var i, r = e.e, a = Ye(e.d), o = a.length;
  return n ? (t && (i = t - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + mr(i) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (a = "0." + mr(-r - 1) + a, t && (i = t - o) > 0 && (a += mr(i))) : r >= o ? (a += mr(r + 1 - o), t && (i = t - r - 1) > 0 && (a = a + "." + mr(i))) : ((i = r + 1) < o && (a = a.slice(0, i) + "." + a.slice(i)), t && (i = t - o) > 0 && (r + 1 === o && (a += "."), a += mr(i))), a;
}
function Ct(e, n) {
  var t = e[0];
  for (n *= de; t >= 10; t /= 10)
    n++;
  return n;
}
function vt(e, n, t) {
  if (n > so)
    throw me = !0, t && (e.precision = t), Error(Li);
  return ve(new e(lt), n, 1, !0);
}
function sr(e, n, t) {
  if (n > Rt)
    throw Error(Li);
  return ve(new e(ht), n, t, !0);
}
function Ri(e) {
  var n = e.length - 1, t = n * de + 1;
  if (n = e[n], n) {
    for (; n % 10 == 0; n /= 10)
      t--;
    for (n = e[0]; n >= 10; n /= 10)
      t++;
  }
  return t;
}
function mr(e) {
  for (var n = ""; e--; )
    n += "0";
  return n;
}
function Ui(e, n, t, i) {
  var r, a = new e(1), o = Math.ceil(i / de + 4);
  for (me = !1; ; ) {
    if (t % 2 && (a = a.times(n), dn(a.d, o) && (r = !0)), t = Qe(t / 2), t === 0) {
      t = a.d.length - 1, r && a.d[t] === 0 && ++a.d[t];
      break;
    }
    n = n.times(n), dn(n.d, o);
  }
  return me = !0, a;
}
function vn(e) {
  return e.d[e.d.length - 1] & 1;
}
function Vi(e, n, t) {
  for (var i, r = new e(n[0]), a = 0; ++a < n.length; )
    if (i = new e(n[a]), i.s)
      r[t](i) && (r = i);
    else {
      r = i;
      break;
    }
  return r;
}
function Ut(e, n) {
  var t, i, r, a, o, l, c, h = 0, s = 0, u = 0, f = e.constructor, d = f.rounding, D = f.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new f(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (n == null ? (me = !1, c = D) : c = n, l = new f(0.03125); e.e > -2; )
    e = e.times(l), u += 5;
  for (i = Math.log(Ze(2, u)) / Math.LN10 * 2 + 5 | 0, c += i, t = a = o = new f(1), f.precision = c; ; ) {
    if (a = ve(a.times(e), c, 1), t = t.times(++s), l = o.plus(Te(a, t, c, 1)), Ye(l.d).slice(0, c) === Ye(o.d).slice(0, c)) {
      for (r = u; r--; )
        o = ve(o.times(o), c, 1);
      if (n == null)
        if (h < 3 && Qr(o.d, c - i, d, h))
          f.precision = c += 10, t = a = l = new f(1), s = 0, h++;
        else
          return ve(o, f.precision = D, d, me = !0);
      else
        return f.precision = D, o;
    }
    o = l;
  }
}
function Dr(e, n) {
  var t, i, r, a, o, l, c, h, s, u, f, d = 1, D = 10, v = e, m = v.d, p = v.constructor, w = p.rounding, g = p.precision;
  if (v.s < 0 || !m || !m[0] || !v.e && m[0] == 1 && m.length == 1)
    return new p(m && !m[0] ? -1 / 0 : v.s != 1 ? NaN : m ? 0 : v);
  if (n == null ? (me = !1, s = g) : s = n, p.precision = s += D, t = Ye(m), i = t.charAt(0), Math.abs(a = v.e) < 15e14) {
    for (; i < 7 && i != 1 || i == 1 && t.charAt(1) > 3; )
      v = v.times(e), t = Ye(v.d), i = t.charAt(0), d++;
    a = v.e, i > 1 ? (v = new p("0." + t), a++) : v = new p(i + "." + t.slice(1));
  } else
    return h = vt(p, s + 2, g).times(a + ""), v = Dr(new p(i + "." + t.slice(1)), s - D).plus(h), p.precision = g, n == null ? ve(v, g, w, me = !0) : v;
  for (u = v, c = o = v = Te(v.minus(1), v.plus(1), s, 1), f = ve(v.times(v), s, 1), r = 3; ; ) {
    if (o = ve(o.times(f), s, 1), h = c.plus(Te(o, new p(r), s, 1)), Ye(h.d).slice(0, s) === Ye(c.d).slice(0, s))
      if (c = c.times(2), a !== 0 && (c = c.plus(vt(p, s + 2, g).times(a + ""))), c = Te(c, new p(d), s, 1), n == null)
        if (Qr(c.d, s - D, w, l))
          p.precision = s += D, h = o = v = Te(u.minus(1), u.plus(1), s, 1), f = ve(v.times(v), s, 1), r = l = 1;
        else
          return ve(c, p.precision = g, w, me = !0);
      else
        return p.precision = g, c;
    c = h, r += 2;
  }
}
function Zi(e) {
  return String(e.s * e.s / 0);
}
function Vt(e, n) {
  var t, i, r;
  for ((t = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (i = n.search(/e/i)) > 0 ? (t < 0 && (t = i), t += +n.slice(i + 1), n = n.substring(0, i)) : t < 0 && (t = n.length), i = 0; n.charCodeAt(i) === 48; i++)
    ;
  for (r = n.length; n.charCodeAt(r - 1) === 48; --r)
    ;
  if (n = n.slice(i, r), n) {
    if (r -= i, e.e = t = t - i - 1, e.d = [], i = (t + 1) % de, t < 0 && (i += de), i < r) {
      for (i && e.d.push(+n.slice(0, i)), r -= de; i < r; )
        e.d.push(+n.slice(i, i += de));
      n = n.slice(i), i = de - n.length;
    } else
      i -= r;
    for (; i--; )
      n += "0";
    e.d.push(+n), me && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function co(e, n) {
  var t, i, r, a, o, l, c, h, s;
  if (n.indexOf("_") > -1) {
    if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Pi.test(n))
      return Vt(e, n);
  } else if (n === "Infinity" || n === "NaN")
    return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (ao.test(n))
    t = 16, n = n.toLowerCase();
  else if (io.test(n))
    t = 2;
  else if (uo.test(n))
    t = 8;
  else
    throw Error(wr + n);
  for (a = n.search(/p/i), a > 0 ? (c = +n.slice(a + 1), n = n.substring(2, a)) : n = n.slice(2), a = n.indexOf("."), o = a >= 0, i = e.constructor, o && (n = n.replace(".", ""), l = n.length, a = l - a, r = Ui(i, new i(t), a, a * 2)), h = ut(n, t, fr), s = h.length - 1, a = s; h[a] === 0; --a)
    h.pop();
  return a < 0 ? new i(e.s * 0) : (e.e = Ct(h, s), e.d = h, me = !1, o && (e = Te(e, r, l * 4)), c && (e = e.times(Math.abs(c) < 54 ? Ze(2, c) : qr.pow(2, c))), me = !0, e);
}
function lo(e, n) {
  var t, i = n.d.length;
  if (i < 3)
    return n.isZero() ? n : $r(e, 2, n, n);
  t = 1.4 * Math.sqrt(i), t = t > 16 ? 16 : t | 0, n = n.times(1 / bt(5, t)), n = $r(e, 2, n, n);
  for (var r, a = new e(5), o = new e(16), l = new e(20); t--; )
    r = n.times(n), n = n.times(a.plus(r.times(o.times(r).minus(l))));
  return n;
}
function $r(e, n, t, i, r) {
  var a, o, l, c, h = e.precision, s = Math.ceil(h / de);
  for (me = !1, c = t.times(t), l = new e(i); ; ) {
    if (o = Te(l.times(c), new e(n++ * n++), h, 1), l = r ? i.plus(o) : i.minus(o), i = Te(o.times(c), new e(n++ * n++), h, 1), o = l.plus(i), o.d[s] !== void 0) {
      for (a = s; o.d[a] === l.d[a] && a--; )
        ;
      if (a == -1)
        break;
    }
    a = l, l = i, i = o, o = a;
  }
  return me = !0, o.d.length = s + 1, o;
}
function bt(e, n) {
  for (var t = e; --n; )
    t *= e;
  return t;
}
function Gi(e, n) {
  var t, i = n.s < 0, r = sr(e, e.precision, 1), a = r.times(0.5);
  if (n = n.abs(), n.lte(a))
    return dr = i ? 4 : 1, n;
  if (t = n.divToInt(r), t.isZero())
    dr = i ? 3 : 2;
  else {
    if (n = n.minus(t.times(r)), n.lte(a))
      return dr = vn(t) ? i ? 2 : 3 : i ? 4 : 1, n;
    dr = vn(t) ? i ? 1 : 4 : i ? 3 : 2;
  }
  return n.minus(r).abs();
}
function Ht(e, n, t, i) {
  var r, a, o, l, c, h, s, u, f, d = e.constructor, D = t !== void 0;
  if (D ? (ke(t, 1, Ar), i === void 0 ? i = d.rounding : ke(i, 0, 8)) : (t = d.precision, i = d.rounding), !e.isFinite())
    s = Zi(e);
  else {
    for (s = hr(e), o = s.indexOf("."), D ? (r = 2, n == 16 ? t = t * 4 - 3 : n == 8 && (t = t * 3 - 2)) : r = n, o >= 0 && (s = s.replace(".", ""), f = new d(1), f.e = s.length - o, f.d = ut(hr(f), 10, r), f.e = f.d.length), u = ut(s, 10, r), a = c = u.length; u[--c] == 0; )
      u.pop();
    if (!u[0])
      s = D ? "0p+0" : "0";
    else {
      if (o < 0 ? a-- : (e = new d(e), e.d = u, e.e = a, e = Te(e, f, t, i, 0, r), u = e.d, a = e.e, h = Oi), o = u[t], l = r / 2, h = h || u[t + 1] !== void 0, h = i < 4 ? (o !== void 0 || h) && (i === 0 || i === (e.s < 0 ? 3 : 2)) : o > l || o === l && (i === 4 || h || i === 6 && u[t - 1] & 1 || i === (e.s < 0 ? 8 : 7)), u.length = t, h)
        for (; ++u[--t] > r - 1; )
          u[t] = 0, t || (++a, u.unshift(1));
      for (c = u.length; !u[c - 1]; --c)
        ;
      for (o = 0, s = ""; o < c; o++)
        s += qt.charAt(u[o]);
      if (D) {
        if (c > 1)
          if (n == 16 || n == 8) {
            for (o = n == 16 ? 4 : 3, --c; c % o; c++)
              s += "0";
            for (u = ut(s, r, n), c = u.length; !u[c - 1]; --c)
              ;
            for (o = 1, s = "1."; o < c; o++)
              s += qt.charAt(u[o]);
          } else
            s = s.charAt(0) + "." + s.slice(1);
        s = s + (a < 0 ? "p" : "p+") + a;
      } else if (a < 0) {
        for (; ++a; )
          s = "0" + s;
        s = "0." + s;
      } else if (++a > c)
        for (a -= c; a--; )
          s += "0";
      else
        a < c && (s = s.slice(0, a) + "." + s.slice(a));
    }
    s = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + s;
  }
  return e.s < 0 ? "-" + s : s;
}
function dn(e, n) {
  if (e.length > n)
    return e.length = n, !0;
}
function ho(e) {
  return new this(e).abs();
}
function vo(e) {
  return new this(e).acos();
}
function po(e) {
  return new this(e).acosh();
}
function mo(e, n) {
  return new this(e).plus(n);
}
function go(e) {
  return new this(e).asin();
}
function Do(e) {
  return new this(e).asinh();
}
function yo(e) {
  return new this(e).atan();
}
function wo(e) {
  return new this(e).atanh();
}
function Ao(e, n) {
  e = new this(e), n = new this(n);
  var t, i = this.precision, r = this.rounding, a = i + 4;
  return !e.s || !n.s ? t = new this(NaN) : !e.d && !n.d ? (t = sr(this, a, 1).times(n.s > 0 ? 0.25 : 0.75), t.s = e.s) : !n.d || e.isZero() ? (t = n.s < 0 ? sr(this, i, r) : new this(0), t.s = e.s) : !e.d || n.isZero() ? (t = sr(this, a, 1).times(0.5), t.s = e.s) : n.s < 0 ? (this.precision = a, this.rounding = 1, t = this.atan(Te(e, n, a, 1)), n = sr(this, a, 1), this.precision = i, this.rounding = r, t = e.s < 0 ? t.minus(n) : t.plus(n)) : t = this.atan(Te(e, n, a, 1)), t;
}
function Eo(e) {
  return new this(e).cbrt();
}
function Fo(e) {
  return ve(e = new this(e), e.e + 1, 2);
}
function Co(e, n, t) {
  return new this(e).clamp(n, t);
}
function bo(e) {
  if (!e || typeof e != "object")
    throw Error(Ft + "Object expected");
  var n, t, i, r = e.defaults === !0, a = [
    "precision",
    1,
    Ar,
    "rounding",
    0,
    8,
    "toExpNeg",
    -_r,
    0,
    "toExpPos",
    0,
    _r,
    "maxE",
    0,
    _r,
    "minE",
    -_r,
    0,
    "modulo",
    0,
    9
  ];
  for (n = 0; n < a.length; n += 3)
    if (t = a[n], r && (this[t] = Pt[t]), (i = e[t]) !== void 0)
      if (Qe(i) === i && i >= a[n + 1] && i <= a[n + 2])
        this[t] = i;
      else
        throw Error(wr + t + ": " + i);
  if (t = "crypto", r && (this[t] = Pt[t]), (i = e[t]) !== void 0)
    if (i === !0 || i === !1 || i === 0 || i === 1)
      if (i)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = !0;
        else
          throw Error($i);
      else
        this[t] = !1;
    else
      throw Error(wr + t + ": " + i);
  return this;
}
function Mo(e) {
  return new this(e).cos();
}
function So(e) {
  return new this(e).cosh();
}
function Yi(e) {
  var n, t, i;
  function r(a) {
    var o, l, c, h = this;
    if (!(h instanceof r))
      return new r(a);
    if (h.constructor = r, pn(a)) {
      h.s = a.s, me ? !a.d || a.e > r.maxE ? (h.e = NaN, h.d = null) : a.e < r.minE ? (h.e = 0, h.d = [0]) : (h.e = a.e, h.d = a.d.slice()) : (h.e = a.e, h.d = a.d ? a.d.slice() : a.d);
      return;
    }
    if (c = typeof a, c === "number") {
      if (a === 0) {
        h.s = 1 / a < 0 ? -1 : 1, h.e = 0, h.d = [0];
        return;
      }
      if (a < 0 ? (a = -a, h.s = -1) : h.s = 1, a === ~~a && a < 1e7) {
        for (o = 0, l = a; l >= 10; l /= 10)
          o++;
        me ? o > r.maxE ? (h.e = NaN, h.d = null) : o < r.minE ? (h.e = 0, h.d = [0]) : (h.e = o, h.d = [a]) : (h.e = o, h.d = [a]);
        return;
      } else if (a * 0 !== 0) {
        a || (h.s = NaN), h.e = NaN, h.d = null;
        return;
      }
      return Vt(h, a.toString());
    } else if (c !== "string")
      throw Error(wr + a);
    return (l = a.charCodeAt(0)) === 45 ? (a = a.slice(1), h.s = -1) : (l === 43 && (a = a.slice(1)), h.s = 1), Pi.test(a) ? Vt(h, a) : co(h, a);
  }
  if (r.prototype = W, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = bo, r.clone = Yi, r.isDecimal = pn, r.abs = ho, r.acos = vo, r.acosh = po, r.add = mo, r.asin = go, r.asinh = Do, r.atan = yo, r.atanh = wo, r.atan2 = Ao, r.cbrt = Eo, r.ceil = Fo, r.clamp = Co, r.cos = Mo, r.cosh = So, r.div = xo, r.exp = No, r.floor = Bo, r.hypot = _o, r.ln = zo, r.log = To, r.log10 = Oo, r.log2 = Io, r.max = Lo, r.min = $o, r.mod = qo, r.mul = Po, r.pow = Ro, r.random = Uo, r.round = Vo, r.sign = Zo, r.sin = Go, r.sinh = Yo, r.sqrt = Jo, r.sub = Qo, r.sum = Xo, r.tan = Ho, r.tanh = Ko, r.trunc = Wo, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < i.length; )
      e.hasOwnProperty(t = i[n++]) || (e[t] = this[t]);
  return r.config(e), r;
}
function xo(e, n) {
  return new this(e).div(n);
}
function No(e) {
  return new this(e).exp();
}
function Bo(e) {
  return ve(e = new this(e), e.e + 1, 3);
}
function _o() {
  var e, n, t = new this(0);
  for (me = !1, e = 0; e < arguments.length; )
    if (n = new this(arguments[e++]), n.d)
      t.d && (t = t.plus(n.times(n)));
    else {
      if (n.s)
        return me = !0, new this(1 / 0);
      t = n;
    }
  return me = !0, t.sqrt();
}
function pn(e) {
  return e instanceof qr || e && e.toStringTag === qi || !1;
}
function zo(e) {
  return new this(e).ln();
}
function To(e, n) {
  return new this(e).log(n);
}
function Io(e) {
  return new this(e).log(2);
}
function Oo(e) {
  return new this(e).log(10);
}
function Lo() {
  return Vi(this, arguments, "lt");
}
function $o() {
  return Vi(this, arguments, "gt");
}
function qo(e, n) {
  return new this(e).mod(n);
}
function Po(e, n) {
  return new this(e).mul(n);
}
function Ro(e, n) {
  return new this(e).pow(n);
}
function Uo(e) {
  var n, t, i, r, a = 0, o = new this(1), l = [];
  if (e === void 0 ? e = this.precision : ke(e, 1, Ar), i = Math.ceil(e / de), this.crypto)
    if (crypto.getRandomValues)
      for (n = crypto.getRandomValues(new Uint32Array(i)); a < i; )
        r = n[a], r >= 429e7 ? n[a] = crypto.getRandomValues(new Uint32Array(1))[0] : l[a++] = r % 1e7;
    else if (crypto.randomBytes) {
      for (n = crypto.randomBytes(i *= 4); a < i; )
        r = n[a] + (n[a + 1] << 8) + (n[a + 2] << 16) + ((n[a + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, a) : (l.push(r % 1e7), a += 4);
      a = i / 4;
    } else
      throw Error($i);
  else
    for (; a < i; )
      l[a++] = Math.random() * 1e7 | 0;
  for (i = l[--a], e %= de, i && e && (r = Ze(10, de - e), l[a] = (i / r | 0) * r); l[a] === 0; a--)
    l.pop();
  if (a < 0)
    t = 0, l = [0];
  else {
    for (t = -1; l[0] === 0; t -= de)
      l.shift();
    for (i = 1, r = l[0]; r >= 10; r /= 10)
      i++;
    i < de && (t -= de - i);
  }
  return o.e = t, o.d = l, o;
}
function Vo(e) {
  return ve(e = new this(e), e.e + 1, this.rounding);
}
function Zo(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function Go(e) {
  return new this(e).sin();
}
function Yo(e) {
  return new this(e).sinh();
}
function Jo(e) {
  return new this(e).sqrt();
}
function Qo(e, n) {
  return new this(e).sub(n);
}
function Xo() {
  var e = 0, n = arguments, t = new this(n[e]);
  for (me = !1; t.s && ++e < n.length; )
    t = t.plus(n[e]);
  return me = !0, ve(t, this.precision, this.rounding);
}
function Ho(e) {
  return new this(e).tan();
}
function Ko(e) {
  return new this(e).tanh();
}
function Wo(e) {
  return ve(e = new this(e), e.e + 1, 1);
}
W[Symbol.for("nodejs.util.inspect.custom")] = W.toString;
W[Symbol.toStringTag] = "Decimal";
var qr = W.constructor = Yi(Pt);
lt = new qr(lt);
ht = new qr(ht);
var ko = "BigNumber", jo = ["?on", "config"], es = /* @__PURE__ */ ee(ko, jo, (e) => {
  var {
    on: n,
    config: t
  } = e, i = qr.clone({
    precision: t.precision,
    modulo: qr.EUCLID
  });
  return i.prototype = Object.create(i.prototype), i.prototype.type = "BigNumber", i.prototype.isBigNumber = !0, i.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  }, i.fromJSON = function(r) {
    return new i(r.value);
  }, n && n("config", function(r, a) {
    r.precision !== a.precision && i.config({
      precision: r.precision
    });
  }), i;
}, {
  isClass: !0
});
function Ji(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qi = { exports: {} };
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(e, n) {
  (function(t) {
    var i = Math.cosh || function(u) {
      return Math.abs(u) < 1e-9 ? 1 - u : (Math.exp(u) + Math.exp(-u)) * 0.5;
    }, r = Math.sinh || function(u) {
      return Math.abs(u) < 1e-9 ? u : (Math.exp(u) - Math.exp(-u)) * 0.5;
    }, a = function(u) {
      var f = Math.PI / 4;
      if (-f > u || u > f)
        return Math.cos(u) - 1;
      var d = u * u;
      return d * (d * (d * (d * (d * (d * (d * (d / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, o = function(u, f) {
      var d = Math.abs(u), D = Math.abs(f);
      return d < 3e3 && D < 3e3 ? Math.sqrt(d * d + D * D) : (d < D ? (d = D, D = u / f) : D = f / u, d * Math.sqrt(1 + D * D));
    }, l = function() {
      throw SyntaxError("Invalid Param");
    };
    function c(u, f) {
      var d = Math.abs(u), D = Math.abs(f);
      return u === 0 ? Math.log(D) : f === 0 ? Math.log(d) : d < 3e3 && D < 3e3 ? Math.log(u * u + f * f) * 0.5 : (u = u / 2, f = f / 2, 0.5 * Math.log(u * u + f * f) + Math.LN2);
    }
    var h = function(u, f) {
      var d = { re: 0, im: 0 };
      if (u == null)
        d.re = d.im = 0;
      else if (f !== void 0)
        d.re = u, d.im = f;
      else
        switch (typeof u) {
          case "object":
            if ("im" in u && "re" in u)
              d.re = u.re, d.im = u.im;
            else if ("abs" in u && "arg" in u) {
              if (!Number.isFinite(u.abs) && Number.isFinite(u.arg))
                return s.INFINITY;
              d.re = u.abs * Math.cos(u.arg), d.im = u.abs * Math.sin(u.arg);
            } else if ("r" in u && "phi" in u) {
              if (!Number.isFinite(u.r) && Number.isFinite(u.phi))
                return s.INFINITY;
              d.re = u.r * Math.cos(u.phi), d.im = u.r * Math.sin(u.phi);
            } else
              u.length === 2 ? (d.re = u[0], d.im = u[1]) : l();
            break;
          case "string":
            d.im = /* void */
            d.re = 0;
            var D = u.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), v = 1, m = 0;
            D === null && l();
            for (var p = 0; p < D.length; p++) {
              var w = D[p];
              w === " " || w === "	" || w === `
` || (w === "+" ? v++ : w === "-" ? m++ : w === "i" || w === "I" ? (v + m === 0 && l(), D[p + 1] !== " " && !isNaN(D[p + 1]) ? (d.im += parseFloat((m % 2 ? "-" : "") + D[p + 1]), p++) : d.im += parseFloat((m % 2 ? "-" : "") + "1"), v = m = 0) : ((v + m === 0 || isNaN(w)) && l(), D[p + 1] === "i" || D[p + 1] === "I" ? (d.im += parseFloat((m % 2 ? "-" : "") + w), p++) : d.re += parseFloat((m % 2 ? "-" : "") + w), v = m = 0));
            }
            v + m > 0 && l();
            break;
          case "number":
            d.im = 0, d.re = u;
            break;
          default:
            l();
        }
      return isNaN(d.re) || isNaN(d.im), d;
    };
    function s(u, f) {
      if (!(this instanceof s))
        return new s(u, f);
      var d = h(u, f);
      this.re = d.re, this.im = d.im;
    }
    s.prototype = {
      re: 0,
      im: 0,
      /**
       * Calculates the sign of a complex number, which is a normalized complex
       *
       * @returns {Complex}
       */
      sign: function() {
        var u = this.abs();
        return new s(
          this.re / u,
          this.im / u
        );
      },
      /**
       * Adds two complex numbers
       *
       * @returns {Complex}
       */
      add: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : new s(
          this.re + d.re,
          this.im + d.im
        );
      },
      /**
       * Subtracts two complex numbers
       *
       * @returns {Complex}
       */
      sub: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : new s(
          this.re - d.re,
          this.im - d.im
        );
      },
      /**
       * Multiplies two complex numbers
       *
       * @returns {Complex}
       */
      mul: function(u, f) {
        var d = new s(u, f);
        return this.isInfinite() && d.isZero() || this.isZero() && d.isInfinite() ? s.NAN : this.isInfinite() || d.isInfinite() ? s.INFINITY : d.im === 0 && this.im === 0 ? new s(this.re * d.re, 0) : new s(
          this.re * d.re - this.im * d.im,
          this.re * d.im + this.im * d.re
        );
      },
      /**
       * Divides two complex numbers
       *
       * @returns {Complex}
       */
      div: function(u, f) {
        var d = new s(u, f);
        if (this.isZero() && d.isZero() || this.isInfinite() && d.isInfinite())
          return s.NAN;
        if (this.isInfinite() || d.isZero())
          return s.INFINITY;
        if (this.isZero() || d.isInfinite())
          return s.ZERO;
        u = this.re, f = this.im;
        var D = d.re, v = d.im, m, p;
        return v === 0 ? new s(u / D, f / D) : Math.abs(D) < Math.abs(v) ? (p = D / v, m = D * p + v, new s(
          (u * p + f) / m,
          (f * p - u) / m
        )) : (p = v / D, m = v * p + D, new s(
          (u + f * p) / m,
          (f - u * p) / m
        ));
      },
      /**
       * Calculate the power of two complex numbers
       *
       * @returns {Complex}
       */
      pow: function(u, f) {
        var d = new s(u, f);
        if (u = this.re, f = this.im, d.isZero())
          return s.ONE;
        if (d.im === 0) {
          if (f === 0 && u > 0)
            return new s(Math.pow(u, d.re), 0);
          if (u === 0)
            switch ((d.re % 4 + 4) % 4) {
              case 0:
                return new s(Math.pow(f, d.re), 0);
              case 1:
                return new s(0, Math.pow(f, d.re));
              case 2:
                return new s(-Math.pow(f, d.re), 0);
              case 3:
                return new s(0, -Math.pow(f, d.re));
            }
        }
        if (u === 0 && f === 0 && d.re > 0 && d.im >= 0)
          return s.ZERO;
        var D = Math.atan2(f, u), v = c(u, f);
        return u = Math.exp(d.re * v - d.im * D), f = d.im * v + d.re * D, new s(
          u * Math.cos(f),
          u * Math.sin(f)
        );
      },
      /**
       * Calculate the complex square root
       *
       * @returns {Complex}
       */
      sqrt: function() {
        var u = this.re, f = this.im, d = this.abs(), D, v;
        if (u >= 0) {
          if (f === 0)
            return new s(Math.sqrt(u), 0);
          D = 0.5 * Math.sqrt(2 * (d + u));
        } else
          D = Math.abs(f) / Math.sqrt(2 * (d - u));
        return u <= 0 ? v = 0.5 * Math.sqrt(2 * (d - u)) : v = Math.abs(f) / Math.sqrt(2 * (d + u)), new s(D, f < 0 ? -v : v);
      },
      /**
       * Calculate the complex exponent
       *
       * @returns {Complex}
       */
      exp: function() {
        var u = Math.exp(this.re);
        return this.im, new s(
          u * Math.cos(this.im),
          u * Math.sin(this.im)
        );
      },
      /**
       * Calculate the complex exponent and subtracts one.
       *
       * This may be more accurate than `Complex(x).exp().sub(1)` if
       * `x` is small.
       *
       * @returns {Complex}
       */
      expm1: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.expm1(u) * Math.cos(f) + a(f),
          Math.exp(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the natural log
       *
       * @returns {Complex}
       */
      log: function() {
        var u = this.re, f = this.im;
        return new s(
          c(u, f),
          Math.atan2(f, u)
        );
      },
      /**
       * Calculate the magnitude of the complex number
       *
       * @returns {number}
       */
      abs: function() {
        return o(this.re, this.im);
      },
      /**
       * Calculate the angle of the complex number
       *
       * @returns {number}
       */
      arg: function() {
        return Math.atan2(this.im, this.re);
      },
      /**
       * Calculate the sine of the complex number
       *
       * @returns {Complex}
       */
      sin: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.sin(u) * i(f),
          Math.cos(u) * r(f)
        );
      },
      /**
       * Calculate the cosine
       *
       * @returns {Complex}
       */
      cos: function() {
        var u = this.re, f = this.im;
        return new s(
          Math.cos(u) * i(f),
          -Math.sin(u) * r(f)
        );
      },
      /**
       * Calculate the tangent
       *
       * @returns {Complex}
       */
      tan: function() {
        var u = 2 * this.re, f = 2 * this.im, d = Math.cos(u) + i(f);
        return new s(
          Math.sin(u) / d,
          r(f) / d
        );
      },
      /**
       * Calculate the cotangent
       *
       * @returns {Complex}
       */
      cot: function() {
        var u = 2 * this.re, f = 2 * this.im, d = Math.cos(u) - i(f);
        return new s(
          -Math.sin(u) / d,
          r(f) / d
        );
      },
      /**
       * Calculate the secant
       *
       * @returns {Complex}
       */
      sec: function() {
        var u = this.re, f = this.im, d = 0.5 * i(2 * f) + 0.5 * Math.cos(2 * u);
        return new s(
          Math.cos(u) * i(f) / d,
          Math.sin(u) * r(f) / d
        );
      },
      /**
       * Calculate the cosecans
       *
       * @returns {Complex}
       */
      csc: function() {
        var u = this.re, f = this.im, d = 0.5 * i(2 * f) - 0.5 * Math.cos(2 * u);
        return new s(
          Math.sin(u) * i(f) / d,
          -Math.cos(u) * r(f) / d
        );
      },
      /**
       * Calculate the complex arcus sinus
       *
       * @returns {Complex}
       */
      asin: function() {
        var u = this.re, f = this.im, d = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          d.re - f,
          d.im + u
        ).log();
        return new s(D.im, -D.re);
      },
      /**
       * Calculate the complex arcus cosinus
       *
       * @returns {Complex}
       */
      acos: function() {
        var u = this.re, f = this.im, d = new s(
          f * f - u * u + 1,
          -2 * u * f
        ).sqrt(), D = new s(
          d.re - f,
          d.im + u
        ).log();
        return new s(Math.PI / 2 - D.im, D.re);
      },
      /**
       * Calculate the complex arcus tangent
       *
       * @returns {Complex}
       */
      atan: function() {
        var u = this.re, f = this.im;
        if (u === 0) {
          if (f === 1)
            return new s(0, 1 / 0);
          if (f === -1)
            return new s(0, -1 / 0);
        }
        var d = u * u + (1 - f) * (1 - f), D = new s(
          (1 - f * f - u * u) / d,
          -2 * u / d
        ).log();
        return new s(-0.5 * D.im, 0.5 * D.re);
      },
      /**
       * Calculate the complex arcus cotangent
       *
       * @returns {Complex}
       */
      acot: function() {
        var u = this.re, f = this.im;
        if (f === 0)
          return new s(Math.atan2(1, u), 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).atan() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atan();
      },
      /**
       * Calculate the complex arcus secant
       *
       * @returns {Complex}
       */
      asec: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(0, 1 / 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).acos() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acos();
      },
      /**
       * Calculate the complex arcus cosecans
       *
       * @returns {Complex}
       */
      acsc: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(Math.PI / 2, 1 / 0);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).asin() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asin();
      },
      /**
       * Calculate the complex sinh
       *
       * @returns {Complex}
       */
      sinh: function() {
        var u = this.re, f = this.im;
        return new s(
          r(u) * Math.cos(f),
          i(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex cosh
       *
       * @returns {Complex}
       */
      cosh: function() {
        var u = this.re, f = this.im;
        return new s(
          i(u) * Math.cos(f),
          r(u) * Math.sin(f)
        );
      },
      /**
       * Calculate the complex tanh
       *
       * @returns {Complex}
       */
      tanh: function() {
        var u = 2 * this.re, f = 2 * this.im, d = i(u) + Math.cos(f);
        return new s(
          r(u) / d,
          Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      coth: function() {
        var u = 2 * this.re, f = 2 * this.im, d = i(u) - Math.cos(f);
        return new s(
          r(u) / d,
          -Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      csch: function() {
        var u = this.re, f = this.im, d = Math.cos(2 * f) - i(2 * u);
        return new s(
          -2 * r(u) * Math.cos(f) / d,
          2 * i(u) * Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex sech
       *
       * @returns {Complex}
       */
      sech: function() {
        var u = this.re, f = this.im, d = Math.cos(2 * f) + i(2 * u);
        return new s(
          2 * i(u) * Math.cos(f) / d,
          -2 * r(u) * Math.sin(f) / d
        );
      },
      /**
       * Calculate the complex asinh
       *
       * @returns {Complex}
       */
      asinh: function() {
        var u = this.im;
        this.im = -this.re, this.re = u;
        var f = this.asin();
        return this.re = -this.im, this.im = u, u = f.re, f.re = -f.im, f.im = u, f;
      },
      /**
       * Calculate the complex acosh
       *
       * @returns {Complex}
       */
      acosh: function() {
        var u = this.acos();
        if (u.im <= 0) {
          var f = u.re;
          u.re = -u.im, u.im = f;
        } else {
          var f = u.im;
          u.im = -u.re, u.re = f;
        }
        return u;
      },
      /**
       * Calculate the complex atanh
       *
       * @returns {Complex}
       */
      atanh: function() {
        var u = this.re, f = this.im, d = u > 1 && f === 0, D = 1 - u, v = 1 + u, m = D * D + f * f, p = m !== 0 ? new s(
          (v * D - f * f) / m,
          (f * D + v * f) / m
        ) : new s(
          u !== -1 ? u / 0 : 0,
          f !== 0 ? f / 0 : 0
        ), w = p.re;
        return p.re = c(p.re, p.im) / 2, p.im = Math.atan2(p.im, w) / 2, d && (p.im = -p.im), p;
      },
      /**
       * Calculate the complex acoth
       *
       * @returns {Complex}
       */
      acoth: function() {
        var u = this.re, f = this.im;
        if (u === 0 && f === 0)
          return new s(0, Math.PI / 2);
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).atanh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).atanh();
      },
      /**
       * Calculate the complex acsch
       *
       * @returns {Complex}
       */
      acsch: function() {
        var u = this.re, f = this.im;
        if (f === 0)
          return new s(
            u !== 0 ? Math.log(u + Math.sqrt(u * u + 1)) : 1 / 0,
            0
          );
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).asinh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).asinh();
      },
      /**
       * Calculate the complex asech
       *
       * @returns {Complex}
       */
      asech: function() {
        var u = this.re, f = this.im;
        if (this.isZero())
          return s.INFINITY;
        var d = u * u + f * f;
        return d !== 0 ? new s(
          u / d,
          -f / d
        ).acosh() : new s(
          u !== 0 ? u / 0 : 0,
          f !== 0 ? -f / 0 : 0
        ).acosh();
      },
      /**
       * Calculate the complex inverse 1/z
       *
       * @returns {Complex}
       */
      inverse: function() {
        if (this.isZero())
          return s.INFINITY;
        if (this.isInfinite())
          return s.ZERO;
        var u = this.re, f = this.im, d = u * u + f * f;
        return new s(u / d, -f / d);
      },
      /**
       * Returns the complex conjugate
       *
       * @returns {Complex}
       */
      conjugate: function() {
        return new s(this.re, -this.im);
      },
      /**
       * Gets the negated complex number
       *
       * @returns {Complex}
       */
      neg: function() {
        return new s(-this.re, -this.im);
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      ceil: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.ceil(this.re * u) / u,
          Math.ceil(this.im * u) / u
        );
      },
      /**
       * Floors the actual complex number
       *
       * @returns {Complex}
       */
      floor: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.floor(this.re * u) / u,
          Math.floor(this.im * u) / u
        );
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      round: function(u) {
        return u = Math.pow(10, u || 0), new s(
          Math.round(this.re * u) / u,
          Math.round(this.im * u) / u
        );
      },
      /**
       * Compares two complex numbers
       *
       * **Note:** new Complex(Infinity).equals(Infinity) === false
       *
       * @returns {boolean}
       */
      equals: function(u, f) {
        var d = new s(u, f);
        return Math.abs(d.re - this.re) <= s.EPSILON && Math.abs(d.im - this.im) <= s.EPSILON;
      },
      /**
       * Clones the actual object
       *
       * @returns {Complex}
       */
      clone: function() {
        return new s(this.re, this.im);
      },
      /**
       * Gets a string of the actual complex number
       *
       * @returns {string}
       */
      toString: function() {
        var u = this.re, f = this.im, d = "";
        return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(u) < s.EPSILON && (u = 0), Math.abs(f) < s.EPSILON && (f = 0), f === 0 ? d + u : (u !== 0 ? (d += u, d += " ", f < 0 ? (f = -f, d += "-") : d += "+", d += " ") : f < 0 && (f = -f, d += "-"), f !== 1 && (d += f), d + "i"));
      },
      /**
       * Returns the actual number as a vector
       *
       * @returns {Array}
       */
      toVector: function() {
        return [this.re, this.im];
      },
      /**
       * Returns the actual real value of the current object
       *
       * @returns {number|null}
       */
      valueOf: function() {
        return this.im === 0 ? this.re : null;
      },
      /**
       * Determines whether a complex number is not on the Riemann sphere.
       *
       * @returns {boolean}
       */
      isNaN: function() {
        return isNaN(this.re) || isNaN(this.im);
      },
      /**
       * Determines whether or not a complex number is at the zero pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isZero: function() {
        return this.im === 0 && this.re === 0;
      },
      /**
       * Determines whether a complex number is not at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isFinite: function() {
        return isFinite(this.re) && isFinite(this.im);
      },
      /**
       * Determines whether or not a complex number is at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      isInfinite: function() {
        return !(this.isNaN() || this.isFinite());
      }
    }, s.ZERO = new s(0, 0), s.ONE = new s(1, 0), s.I = new s(0, 1), s.PI = new s(Math.PI, 0), s.E = new s(Math.E, 0), s.INFINITY = new s(1 / 0, 1 / 0), s.NAN = new s(NaN, NaN), s.EPSILON = 1e-15, Object.defineProperty(s, "__esModule", { value: !0 }), s.default = s, s.Complex = s, e.exports = s;
  })();
})(Qi);
var rs = Qi.exports;
const Ge = /* @__PURE__ */ Ji(rs);
var ts = "Complex", ns = [], is = /* @__PURE__ */ ee(ts, ns, () => (Object.defineProperty(Ge, "name", {
  value: "Complex"
}), Ge.prototype.constructor = Ge, Ge.prototype.type = "Complex", Ge.prototype.isComplex = !0, Ge.prototype.toJSON = function() {
  return {
    mathjs: "Complex",
    re: this.re,
    im: this.im
  };
}, Ge.prototype.toPolar = function() {
  return {
    r: this.abs(),
    phi: this.arg()
  };
}, Ge.prototype.format = function(e) {
  var n = "", t = this.im, i = this.re, r = Ot(this.re, e), a = Ot(this.im, e), o = Le(e) ? e : e ? e.precision : null;
  if (o !== null) {
    var l = Math.pow(10, -o);
    Math.abs(i / t) < l && (i = 0), Math.abs(t / i) < l && (t = 0);
  }
  return t === 0 ? n = r : i === 0 ? t === 1 ? n = "i" : t === -1 ? n = "-i" : n = a + "i" : t < 0 ? t === -1 ? n = r + " - i" : n = r + " - " + a.substring(1) + "i" : t === 1 ? n = r + " + i" : n = r + " + " + a + "i", n;
}, Ge.fromPolar = function(e) {
  switch (arguments.length) {
    case 1: {
      var n = arguments[0];
      if (typeof n == "object")
        return Ge(n);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var t = arguments[0], i = arguments[1];
      if (Le(t)) {
        if (pi(i) && i.hasBase("ANGLE") && (i = i.toNumber("rad")), Le(i))
          return new Ge({
            r: t,
            phi: i
          });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, Ge.prototype.valueOf = Ge.prototype.toString, Ge.fromJSON = function(e) {
  return new Ge(e);
}, Ge.compare = function(e, n) {
  return e.re > n.re ? 1 : e.re < n.re ? -1 : e.im > n.im ? 1 : e.im < n.im ? -1 : 0;
}, Ge), {
  isClass: !0
}), Xi = { exports: {} };
/**
 * @license Fraction.js v4.3.0 20/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(e, n) {
  (function(t) {
    var i = 2e3, r = {
      s: 1,
      n: 0,
      d: 1
    };
    function a(p, w) {
      if (isNaN(p = parseInt(p, 10)))
        throw v();
      return p * w;
    }
    function o(p, w) {
      if (w === 0)
        throw D();
      var g = Object.create(d.prototype);
      g.s = p < 0 ? -1 : 1, p = p < 0 ? -p : p;
      var A = f(p, w);
      return g.n = p / A, g.d = w / A, g;
    }
    function l(p) {
      for (var w = {}, g = p, A = 2, F = 4; F <= g; ) {
        for (; g % A === 0; )
          g /= A, w[A] = (w[A] || 0) + 1;
        F += 1 + 2 * A++;
      }
      return g !== p ? g > 1 && (w[g] = (w[g] || 0) + 1) : w[p] = (w[p] || 0) + 1, w;
    }
    var c = function(p, w) {
      var g = 0, A = 1, F = 1, y = 0, C = 0, b = 0, E = 1, S = 1, M = 0, x = 1, I = 1, T = 1, O = 1e7, B;
      if (p != null)
        if (w !== void 0) {
          if (g = p, A = w, F = g * A, g % 1 !== 0 || A % 1 !== 0)
            throw m();
        } else
          switch (typeof p) {
            case "object": {
              if ("d" in p && "n" in p)
                g = p.n, A = p.d, "s" in p && (g *= p.s);
              else if (0 in p)
                g = p[0], 1 in p && (A = p[1]);
              else
                throw v();
              F = g * A;
              break;
            }
            case "number": {
              if (p < 0 && (F = p, p = -p), p % 1 === 0)
                g = p;
              else if (p > 0) {
                for (p >= 1 && (S = Math.pow(10, Math.floor(1 + Math.log(p) / Math.LN10)), p /= S); x <= O && T <= O; )
                  if (B = (M + I) / (x + T), p === B) {
                    x + T <= O ? (g = M + I, A = x + T) : T > x ? (g = I, A = T) : (g = M, A = x);
                    break;
                  } else
                    p > B ? (M += I, x += T) : (I += M, T += x), x > O ? (g = I, A = T) : (g = M, A = x);
                g *= S;
              } else
                (isNaN(p) || isNaN(w)) && (A = g = NaN);
              break;
            }
            case "string": {
              if (x = p.match(/\d+|./g), x === null)
                throw v();
              if (x[M] === "-" ? (F = -1, M++) : x[M] === "+" && M++, x.length === M + 1 ? C = a(x[M++], F) : x[M + 1] === "." || x[M] === "." ? (x[M] !== "." && (y = a(x[M++], F)), M++, (M + 1 === x.length || x[M + 1] === "(" && x[M + 3] === ")" || x[M + 1] === "'" && x[M + 3] === "'") && (C = a(x[M], F), E = Math.pow(10, x[M].length), M++), (x[M] === "(" && x[M + 2] === ")" || x[M] === "'" && x[M + 2] === "'") && (b = a(x[M + 1], F), S = Math.pow(10, x[M + 1].length) - 1, M += 3)) : x[M + 1] === "/" || x[M + 1] === ":" ? (C = a(x[M], F), E = a(x[M + 2], 1), M += 3) : x[M + 3] === "/" && x[M + 1] === " " && (y = a(x[M], F), C = a(x[M + 2], F), E = a(x[M + 4], 1), M += 5), x.length <= M) {
                A = E * S, F = /* void */
                g = b + A * y + S * C;
                break;
              }
            }
            default:
              throw v();
          }
      if (A === 0)
        throw D();
      r.s = F < 0 ? -1 : 1, r.n = Math.abs(g), r.d = Math.abs(A);
    };
    function h(p, w, g) {
      for (var A = 1; w > 0; p = p * p % g, w >>= 1)
        w & 1 && (A = A * p % g);
      return A;
    }
    function s(p, w) {
      for (; w % 2 === 0; w /= 2)
        ;
      for (; w % 5 === 0; w /= 5)
        ;
      if (w === 1)
        return 0;
      for (var g = 10 % w, A = 1; g !== 1; A++)
        if (g = g * 10 % w, A > i)
          return 0;
      return A;
    }
    function u(p, w, g) {
      for (var A = 1, F = h(10, g, w), y = 0; y < 300; y++) {
        if (A === F)
          return y;
        A = A * 10 % w, F = F * 10 % w;
      }
      return 0;
    }
    function f(p, w) {
      if (!p)
        return w;
      if (!w)
        return p;
      for (; ; ) {
        if (p %= w, !p)
          return w;
        if (w %= p, !w)
          return p;
      }
    }
    function d(p, w) {
      if (c(p, w), this instanceof d)
        p = f(r.d, r.n), this.s = r.s, this.n = r.n / p, this.d = r.d / p;
      else
        return o(r.s * r.n, r.d);
    }
    var D = function() {
      return new Error("Division by Zero");
    }, v = function() {
      return new Error("Invalid argument");
    }, m = function() {
      return new Error("Parameters must be integer");
    };
    d.prototype = {
      s: 1,
      n: 0,
      d: 1,
      /**
       * Calculates the absolute value
       *
       * Ex: new Fraction(-4).abs() => 4
       **/
      abs: function() {
        return o(this.n, this.d);
      },
      /**
       * Inverts the sign of the current fraction
       *
       * Ex: new Fraction(-4).neg() => 4
       **/
      neg: function() {
        return o(-this.s * this.n, this.d);
      },
      /**
       * Adds two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
       **/
      add: function(p, w) {
        return c(p, w), o(
          this.s * this.n * r.d + r.s * this.d * r.n,
          this.d * r.d
        );
      },
      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      sub: function(p, w) {
        return c(p, w), o(
          this.s * this.n * r.d - r.s * this.d * r.n,
          this.d * r.d
        );
      },
      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      mul: function(p, w) {
        return c(p, w), o(
          this.s * r.s * this.n * r.n,
          this.d * r.d
        );
      },
      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      div: function(p, w) {
        return c(p, w), o(
          this.s * r.s * this.n * r.d,
          this.d * r.n
        );
      },
      /**
       * Clones the actual object
       *
       * Ex: new Fraction("-17.(345)").clone()
       **/
      clone: function() {
        return o(this.s * this.n, this.d);
      },
      /**
       * Calculates the modulo of two rational numbers - a more precise fmod
       *
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
       **/
      mod: function(p, w) {
        if (isNaN(this.n) || isNaN(this.d))
          return new d(NaN);
        if (p === void 0)
          return o(this.s * this.n % this.d, 1);
        if (c(p, w), r.n === 0 && this.d === 0)
          throw D();
        return o(
          this.s * (r.d * this.n) % (r.n * this.d),
          r.d * this.d
        );
      },
      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      gcd: function(p, w) {
        return c(p, w), o(f(r.n, this.n) * f(r.d, this.d), r.d * this.d);
      },
      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      lcm: function(p, w) {
        return c(p, w), r.n === 0 && this.n === 0 ? o(0, 1) : o(r.n * this.n, f(r.n, this.n) * f(r.d, this.d));
      },
      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      ceil: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.ceil(p * this.s * this.n / this.d), p);
      },
      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      floor: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.floor(p * this.s * this.n / this.d), p);
      },
      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      round: function(p) {
        return p = Math.pow(10, p || 0), isNaN(this.n) || isNaN(this.d) ? new d(NaN) : o(Math.round(p * this.s * this.n / this.d), p);
      },
      /**
       * Gets the inverse of the fraction, means numerator and denominator are exchanged
       *
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
       **/
      inverse: function() {
        return o(this.s * this.d, this.n);
      },
      /**
       * Calculates the fraction to some rational exponent, if possible
       *
       * Ex: new Fraction(-1,2).pow(-3) => -8
       */
      pow: function(p, w) {
        if (c(p, w), r.d === 1)
          return r.s < 0 ? o(Math.pow(this.s * this.d, r.n), Math.pow(this.n, r.n)) : o(Math.pow(this.s * this.n, r.n), Math.pow(this.d, r.n));
        if (this.s < 0)
          return null;
        var g = l(this.n), A = l(this.d), F = 1, y = 1;
        for (var C in g)
          if (C !== "1") {
            if (C === "0") {
              F = 0;
              break;
            }
            if (g[C] *= r.n, g[C] % r.d === 0)
              g[C] /= r.d;
            else
              return null;
            F *= Math.pow(C, g[C]);
          }
        for (var C in A)
          if (C !== "1") {
            if (A[C] *= r.n, A[C] % r.d === 0)
              A[C] /= r.d;
            else
              return null;
            y *= Math.pow(C, A[C]);
          }
        return r.s < 0 ? o(y, F) : o(F, y);
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      equals: function(p, w) {
        return c(p, w), this.s * this.n * r.d === r.s * r.n * this.d;
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      compare: function(p, w) {
        c(p, w);
        var g = this.s * this.n * r.d - r.s * r.n * this.d;
        return (0 < g) - (g < 0);
      },
      simplify: function(p) {
        if (isNaN(this.n) || isNaN(this.d))
          return this;
        p = p || 1e-3;
        for (var w = this.abs(), g = w.toContinued(), A = 1; A < g.length; A++) {
          for (var F = o(g[A - 1], 1), y = A - 2; y >= 0; y--)
            F = F.inverse().add(g[y]);
          if (Math.abs(F.sub(w).valueOf()) < p)
            return F.mul(this.s);
        }
        return this;
      },
      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      divisible: function(p, w) {
        return c(p, w), !(!(r.n * this.d) || this.n * r.d % (r.n * this.d));
      },
      /**
       * Returns a decimal representation of the fraction
       *
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
       **/
      valueOf: function() {
        return this.s * this.n / this.d;
      },
      /**
       * Returns a string-fraction representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
       **/
      toFraction: function(p) {
        var w, g = "", A = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += A : (p && (w = Math.floor(A / F)) > 0 && (g += w, g += " ", A %= F), g += A, g += "/", g += F), g;
      },
      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      toLatex: function(p) {
        var w, g = "", A = this.n, F = this.d;
        return this.s < 0 && (g += "-"), F === 1 ? g += A : (p && (w = Math.floor(A / F)) > 0 && (g += w, A %= F), g += "\\frac{", g += A, g += "}{", g += F, g += "}"), g;
      },
      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      toContinued: function() {
        var p, w = this.n, g = this.d, A = [];
        if (isNaN(w) || isNaN(g))
          return A;
        do
          A.push(Math.floor(w / g)), p = w % g, w = g, g = p;
        while (w !== 1);
        return A;
      },
      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      toString: function(p) {
        var w = this.n, g = this.d;
        if (isNaN(w) || isNaN(g))
          return "NaN";
        p = p || 15;
        var A = s(w, g), F = u(w, g, A), y = this.s < 0 ? "-" : "";
        if (y += w / g | 0, w %= g, w *= 10, w && (y += "."), A) {
          for (var C = F; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += "(";
          for (var C = A; C--; )
            y += w / g | 0, w %= g, w *= 10;
          y += ")";
        } else
          for (var C = p; w && C--; )
            y += w / g | 0, w %= g, w *= 10;
        return y;
      }
    }, Object.defineProperty(d, "__esModule", { value: !0 }), d.default = d, d.Fraction = d, e.exports = d;
  })();
})(Xi);
var as = Xi.exports;
const vr = /* @__PURE__ */ Ji(as);
var us = "Fraction", os = [], ss = /* @__PURE__ */ ee(us, os, () => (Object.defineProperty(vr, "name", {
  value: "Fraction"
}), vr.prototype.constructor = vr, vr.prototype.type = "Fraction", vr.prototype.isFraction = !0, vr.prototype.toJSON = function() {
  return {
    mathjs: "Fraction",
    n: this.s * this.n,
    d: this.d
  };
}, vr.fromJSON = function(e) {
  return new vr(e);
}, vr), {
  isClass: !0
}), fs = "Matrix", cs = [], ls = /* @__PURE__ */ ee(fs, cs, () => {
  function e() {
    if (!(this instanceof e))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, e.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, e.prototype.create = function(n, t) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, e.prototype.subset = function(n, t, i) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, e.prototype.get = function(n) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, e.prototype.set = function(n, t, i) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, e.prototype.resize = function(n, t) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, e.prototype.reshape = function(n, t) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, e.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, e.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, e.prototype.map = function(n, t) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, e.prototype.forEach = function(n) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, e.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  }, e.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, e.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, e.prototype.format = function(n) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, e.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, e;
}, {
  isClass: !0
});
function Hi(e) {
  return Object.keys(e.signatures || {}).reduce(function(n, t) {
    var i = (t.match(/,/g) || []).length + 1;
    return Math.max(n, i);
  }, -1);
}
var hs = "DenseMatrix", vs = ["Matrix"], ds = /* @__PURE__ */ ee(hs, vs, (e) => {
  var {
    Matrix: n
  } = e;
  function t(s, u) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (u && !tr(u))
      throw new Error("Invalid datatype: " + u);
    if (_e(s))
      s.type === "DenseMatrix" ? (this._data = Ce(s._data), this._size = Ce(s._size), this._datatype = u || s._datatype) : (this._data = s.toArray(), this._size = s.size(), this._datatype = u || s._datatype);
    else if (s && Me(s.data) && Me(s.size))
      this._data = s.data, this._size = s.size, cn(this._data, this._size), this._datatype = u || s.datatype;
    else if (Me(s))
      this._data = h(s), this._size = $e(this._data), cn(this._data, this._size), this._datatype = u;
    else {
      if (s)
        throw new TypeError("Unsupported type of data (" + lr(s) + ")");
      this._data = [], this._size = [0], this._datatype = u;
    }
  }
  t.prototype = new n(), t.prototype.createDenseMatrix = function(s, u) {
    return new t(s, u);
  }, Object.defineProperty(t, "name", {
    value: "DenseMatrix"
  }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = !0, t.prototype.getDataType = function() {
    return Jr(this._data, lr);
  }, t.prototype.storage = function() {
    return "dense";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(s, u) {
    return new t(s, u);
  }, t.prototype.subset = function(s, u, f) {
    switch (arguments.length) {
      case 1:
        return i(this, s);
      case 2:
      case 3:
        return a(this, s, u, f);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, t.prototype.get = function(s) {
    if (!Me(s))
      throw new TypeError("Array expected");
    if (s.length !== this._size.length)
      throw new Fe(s.length, this._size.length);
    for (var u = 0; u < s.length; u++)
      Be(s[u], this._size[u]);
    for (var f = this._data, d = 0, D = s.length; d < D; d++) {
      var v = s[d];
      Be(v, f.length), f = f[v];
    }
    return f;
  }, t.prototype.set = function(s, u, f) {
    if (!Me(s))
      throw new TypeError("Array expected");
    if (s.length < this._size.length)
      throw new Fe(s.length, this._size.length, "<");
    var d, D, v, m = s.map(function(w) {
      return w + 1;
    });
    c(this, m, f);
    var p = this._data;
    for (d = 0, D = s.length - 1; d < D; d++)
      v = s[d], Be(v, p.length), p = p[v];
    return v = s[s.length - 1], Be(v, p.length), p[v] = u, this;
  };
  function i(s, u) {
    if (!wt(u))
      throw new TypeError("Invalid index");
    var f = u.isScalar();
    if (f)
      return s.get(u.min());
    var d = u.size();
    if (d.length !== s._size.length)
      throw new Fe(d.length, s._size.length);
    for (var D = u.min(), v = u.max(), m = 0, p = s._size.length; m < p; m++)
      Be(D[m], s._size[m]), Be(v[m], s._size[m]);
    return new t(r(s._data, u, d.length, 0), s._datatype);
  }
  function r(s, u, f, d) {
    var D = d === f - 1, v = u.dimension(d);
    return D ? v.map(function(m) {
      return Be(m, s.length), s[m];
    }).valueOf() : v.map(function(m) {
      Be(m, s.length);
      var p = s[m];
      return r(p, u, f, d + 1);
    }).valueOf();
  }
  function a(s, u, f, d) {
    if (!u || u.isIndex !== !0)
      throw new TypeError("Invalid index");
    var D = u.size(), v = u.isScalar(), m;
    if (_e(f) ? (m = f.size(), f = f.valueOf()) : m = $e(f), v) {
      if (m.length !== 0)
        throw new TypeError("Scalar expected");
      s.set(u.min(), f, d);
    } else {
      if (!Or(m, D))
        try {
          m.length === 0 ? f = hn([f], D) : f = hn(f, D), m = $e(f);
        } catch {
        }
      if (D.length < s._size.length)
        throw new Fe(D.length, s._size.length, "<");
      if (m.length < D.length) {
        for (var p = 0, w = 0; D[p] === 1 && m[p] === 1; )
          p++;
        for (; D[p] === 1; )
          w++, p++;
        f = Mi(f, D.length, w, m);
      }
      if (!Or(D, m))
        throw new Fe(D, m, ">");
      var g = u.max().map(function(y) {
        return y + 1;
      });
      c(s, g, d);
      var A = D.length, F = 0;
      o(s._data, u, f, A, F);
    }
    return s;
  }
  function o(s, u, f, d, D) {
    var v = D === d - 1, m = u.dimension(D);
    v ? m.forEach(function(p, w) {
      Be(p), s[p] = f[w[0]];
    }) : m.forEach(function(p, w) {
      Be(p), o(s[p], u, f[w[0]], d, D + 1);
    });
  }
  t.prototype.resize = function(s, u, f) {
    if (!ot(s))
      throw new TypeError("Array or Matrix expected");
    var d = s.valueOf().map((v) => Array.isArray(v) && v.length === 1 ? v[0] : v), D = f ? this.clone() : this;
    return l(D, d, u);
  };
  function l(s, u, f) {
    if (u.length === 0) {
      for (var d = s._data; Me(d); )
        d = d[0];
      return d;
    }
    return s._size = u.slice(0), s._data = ft(s._data, s._size, f), s;
  }
  t.prototype.reshape = function(s, u) {
    var f = u ? this.clone() : this;
    f._data = Qt(f._data, s);
    var d = f._size.reduce((D, v) => D * v);
    return f._size = Xt(s, d), f;
  };
  function c(s, u, f) {
    for (var d = s._size.slice(0), D = !1; d.length < u.length; )
      d.push(0), D = !0;
    for (var v = 0, m = u.length; v < m; v++)
      u[v] > d[v] && (d[v] = u[v], D = !0);
    D && l(s, d, f);
  }
  t.prototype.clone = function() {
    var s = new t({
      data: Ce(this._data),
      size: Ce(this._size),
      datatype: this._datatype
    });
    return s;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype.map = function(s) {
    var u = this, f = Hi(s), d = function m(p, w) {
      return Me(p) ? p.map(function(g, A) {
        return m(g, w.concat(A));
      }) : f === 1 ? s(p) : f === 2 ? s(p, w) : s(p, w, u);
    }, D = d(this._data, []), v = this._datatype !== void 0 ? Jr(D, lr) : void 0;
    return new t(D, v);
  }, t.prototype.forEach = function(s) {
    var u = this, f = function d(D, v) {
      Me(D) ? D.forEach(function(m, p) {
        d(m, v.concat(p));
      }) : s(D, v, u);
    };
    f(this._data, []);
  }, t.prototype[Symbol.iterator] = function* () {
    var s = function* u(f, d) {
      if (Me(f))
        for (var D = 0; D < f.length; D++)
          yield* u(f[D], d.concat(D));
      else
        yield {
          value: f,
          index: d
        };
    };
    yield* s(this._data, []);
  }, t.prototype.rows = function() {
    var s = [], u = this.size();
    if (u.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var f = this._data;
    for (var d of f)
      s.push(new t([d], this._datatype));
    return s;
  }, t.prototype.columns = function() {
    var s = this, u = [], f = this.size();
    if (f.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var d = this._data, D = function(p) {
      var w = d.map((g) => [g[p]]);
      u.push(new t(w, s._datatype));
    }, v = 0; v < f[1]; v++)
      D(v);
    return u;
  }, t.prototype.toArray = function() {
    return Ce(this._data);
  }, t.prototype.valueOf = function() {
    return this._data;
  }, t.prototype.format = function(s) {
    return Oe(this._data, s);
  }, t.prototype.toString = function() {
    return Oe(this._data);
  }, t.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, t.prototype.diagonal = function(s) {
    if (s) {
      if (Re(s) && (s = s.toNumber()), !Le(s) || !ze(s))
        throw new TypeError("The parameter k must be an integer number");
    } else
      s = 0;
    for (var u = s > 0 ? s : 0, f = s < 0 ? -s : 0, d = this._size[0], D = this._size[1], v = Math.min(d - f, D - u), m = [], p = 0; p < v; p++)
      m[p] = this._data[p + f][p + u];
    return new t({
      data: m,
      size: [v],
      datatype: this._datatype
    });
  }, t.diagonal = function(s, u, f, d) {
    if (!Me(s))
      throw new TypeError("Array expected, size parameter");
    if (s.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (s = s.map(function(C) {
      if (Re(C) && (C = C.toNumber()), !Le(C) || !ze(C) || C < 1)
        throw new Error("Size values must be positive integers");
      return C;
    }), f) {
      if (Re(f) && (f = f.toNumber()), !Le(f) || !ze(f))
        throw new TypeError("The parameter k must be an integer number");
    } else
      f = 0;
    var D = f > 0 ? f : 0, v = f < 0 ? -f : 0, m = s[0], p = s[1], w = Math.min(m - v, p - D), g;
    if (Me(u)) {
      if (u.length !== w)
        throw new Error("Invalid value array length");
      g = function(b) {
        return u[b];
      };
    } else if (_e(u)) {
      var A = u.size();
      if (A.length !== 1 || A[0] !== w)
        throw new Error("Invalid matrix length");
      g = function(b) {
        return u.get([b]);
      };
    } else
      g = function() {
        return u;
      };
    d || (d = Re(g(0)) ? g(0).mul(0) : 0);
    var F = [];
    if (s.length > 0) {
      F = ft(F, s, d);
      for (var y = 0; y < w; y++)
        F[y + v][y + D] = g(y);
    }
    return new t({
      data: F,
      size: [m, p]
    });
  }, t.fromJSON = function(s) {
    return new t(s);
  }, t.prototype.swapRows = function(s, u) {
    if (!Le(s) || !ze(s) || !Le(u) || !ze(u))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Be(s, this._size[0]), Be(u, this._size[0]), t._swapRows(s, u, this._data), this;
  }, t._swapRows = function(s, u, f) {
    var d = f[s];
    f[s] = f[u], f[u] = d;
  };
  function h(s) {
    return _e(s) ? h(s.valueOf()) : Me(s) ? s.map(h) : s;
  }
  return t;
}, {
  isClass: !0
});
function er(e, n, t) {
  return e && typeof e.map == "function" ? e.map(function(i) {
    return er(i, n);
  }) : n(e);
}
var mn = "isInteger", ps = ["typed"], ms = /* @__PURE__ */ ee(mn, ps, (e) => {
  var {
    typed: n
  } = e;
  return n(mn, {
    number: ze,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function(i) {
      return i.isInt();
    },
    Fraction: function(i) {
      return i.d === 1 && isFinite(i.n);
    },
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), Kt = "number", Mt = "number, number";
function Ki(e) {
  return Math.abs(e);
}
Ki.signature = Kt;
function Wi(e, n) {
  return e + n;
}
Wi.signature = Mt;
function ki(e, n) {
  return e - n;
}
ki.signature = Mt;
function ji(e, n) {
  return e * n;
}
ji.signature = Mt;
function ea(e) {
  return -e;
}
ea.signature = Kt;
function Zt(e) {
  return _u(e);
}
Zt.signature = Kt;
function ra(e, n) {
  return e * e < 1 && n === 1 / 0 || e * e > 1 && n === -1 / 0 ? 0 : Math.pow(e, n);
}
ra.signature = Mt;
var ta = "number";
function na(e) {
  return e > 0;
}
na.signature = ta;
function ia(e) {
  return e === 0;
}
ia.signature = ta;
var gn = "isPositive", gs = ["typed"], Ds = /* @__PURE__ */ ee(gn, gs, (e) => {
  var {
    typed: n
  } = e;
  return n(gn, {
    number: na,
    BigNumber: function(i) {
      return !i.isNeg() && !i.isZero() && !i.isNaN();
    },
    Fraction: function(i) {
      return i.s > 0 && i.n > 0;
    },
    Unit: n.referToSelf((t) => (i) => n.find(t, i.valueType())(i.value)),
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), Dn = "isZero", ys = ["typed"], ws = /* @__PURE__ */ ee(Dn, ys, (e) => {
  var {
    typed: n
  } = e;
  return n(Dn, {
    number: ia,
    BigNumber: function(i) {
      return i.isZero();
    },
    Complex: function(i) {
      return i.re === 0 && i.im === 0;
    },
    Fraction: function(i) {
      return i.d === 1 && i.n === 0;
    },
    Unit: n.referToSelf((t) => (i) => n.find(t, i.valueType())(i.value)),
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), yn = "typeOf", As = ["typed"], Es = /* @__PURE__ */ ee(yn, As, (e) => {
  var {
    typed: n
  } = e;
  return n(yn, {
    any: lr
  });
});
function Xr(e, n, t) {
  if (t == null)
    return e.eq(n);
  if (e.eq(n))
    return !0;
  if (e.isNaN() || n.isNaN())
    return !1;
  if (e.isFinite() && n.isFinite()) {
    var i = e.minus(n).abs();
    if (i.isZero())
      return !0;
    var r = e.constructor.max(e.abs(), n.abs());
    return i.lte(r.times(t));
  }
  return !1;
}
function Fs(e, n, t) {
  return yr(e.re, n.re, t) && yr(e.im, n.im, t);
}
var Hr = /* @__PURE__ */ ee("compareUnits", ["typed"], (e) => {
  var {
    typed: n
  } = e;
  return {
    "Unit, Unit": n.referToSelf((t) => (i, r) => {
      if (!i.equalBase(r))
        throw new Error("Cannot compare units with different base");
      return n.find(t, [i.valueType(), r.valueType()])(i.value, r.value);
    })
  };
}), dt = "equalScalar", Cs = ["typed", "config"], bs = /* @__PURE__ */ ee(dt, Cs, (e) => {
  var {
    typed: n,
    config: t
  } = e, i = Hr({
    typed: n
  });
  return n(dt, {
    "boolean, boolean": function(a, o) {
      return a === o;
    },
    "number, number": function(a, o) {
      return yr(a, o, t.epsilon);
    },
    "BigNumber, BigNumber": function(a, o) {
      return a.eq(o) || Xr(a, o, t.epsilon);
    },
    "Fraction, Fraction": function(a, o) {
      return a.equals(o);
    },
    "Complex, Complex": function(a, o) {
      return Fs(a, o, t.epsilon);
    }
  }, i);
});
ee(dt, ["typed", "config"], (e) => {
  var {
    typed: n,
    config: t
  } = e;
  return n(dt, {
    "number, number": function(r, a) {
      return yr(r, a, t.epsilon);
    }
  });
});
var Ms = "SparseMatrix", Ss = ["typed", "equalScalar", "Matrix"], xs = /* @__PURE__ */ ee(Ms, Ss, (e) => {
  var {
    typed: n,
    equalScalar: t,
    Matrix: i
  } = e;
  function r(v, m) {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (m && !tr(m))
      throw new Error("Invalid datatype: " + m);
    if (_e(v))
      a(this, v, m);
    else if (v && Me(v.index) && Me(v.ptr) && Me(v.size))
      this._values = v.values, this._index = v.index, this._ptr = v.ptr, this._size = v.size, this._datatype = m || v.datatype;
    else if (Me(v))
      o(this, v, m);
    else {
      if (v)
        throw new TypeError("Unsupported type of data (" + lr(v) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = m;
    }
  }
  function a(v, m, p) {
    m.type === "SparseMatrix" ? (v._values = m._values ? Ce(m._values) : void 0, v._index = Ce(m._index), v._ptr = Ce(m._ptr), v._size = Ce(m._size), v._datatype = p || m._datatype) : o(v, m.valueOf(), p || m._datatype);
  }
  function o(v, m, p) {
    v._values = [], v._index = [], v._ptr = [], v._datatype = p;
    var w = m.length, g = 0, A = t, F = 0;
    if (tr(p) && (A = n.find(t, [p, p]) || t, F = n.convert(0, p)), w > 0) {
      var y = 0;
      do {
        v._ptr.push(v._index.length);
        for (var C = 0; C < w; C++) {
          var b = m[C];
          if (Me(b)) {
            if (y === 0 && g < b.length && (g = b.length), y < b.length) {
              var E = b[y];
              A(E, F) || (v._values.push(E), v._index.push(C));
            }
          } else
            y === 0 && g < 1 && (g = 1), A(b, F) || (v._values.push(b), v._index.push(C));
        }
        y++;
      } while (y < g);
    }
    v._ptr.push(v._index.length), v._size = [w, g];
  }
  r.prototype = new i(), r.prototype.createSparseMatrix = function(v, m) {
    return new r(v, m);
  }, Object.defineProperty(r, "name", {
    value: "SparseMatrix"
  }), r.prototype.constructor = r, r.prototype.type = "SparseMatrix", r.prototype.isSparseMatrix = !0, r.prototype.getDataType = function() {
    return Jr(this._values, lr);
  }, r.prototype.storage = function() {
    return "sparse";
  }, r.prototype.datatype = function() {
    return this._datatype;
  }, r.prototype.create = function(v, m) {
    return new r(v, m);
  }, r.prototype.density = function() {
    var v = this._size[0], m = this._size[1];
    return v !== 0 && m !== 0 ? this._index.length / (v * m) : 0;
  }, r.prototype.subset = function(v, m, p) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return l(this, v);
      case 2:
      case 3:
        return c(this, v, m, p);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function l(v, m) {
    if (!wt(m))
      throw new TypeError("Invalid index");
    var p = m.isScalar();
    if (p)
      return v.get(m.min());
    var w = m.size();
    if (w.length !== v._size.length)
      throw new Fe(w.length, v._size.length);
    var g, A, F, y, C = m.min(), b = m.max();
    for (g = 0, A = v._size.length; g < A; g++)
      Be(C[g], v._size[g]), Be(b[g], v._size[g]);
    var E = v._values, S = v._index, M = v._ptr, x = m.dimension(0), I = m.dimension(1), T = [], O = [];
    x.forEach(function(z, V) {
      O[z] = V[0], T[z] = !0;
    });
    var B = E ? [] : void 0, G = [], $ = [];
    return I.forEach(function(z) {
      for ($.push(G.length), F = M[z], y = M[z + 1]; F < y; F++)
        g = S[F], T[g] === !0 && (G.push(O[g]), B && B.push(E[F]));
    }), $.push(G.length), new r({
      values: B,
      index: G,
      ptr: $,
      size: w,
      datatype: v._datatype
    });
  }
  function c(v, m, p, w) {
    if (!m || m.isIndex !== !0)
      throw new TypeError("Invalid index");
    var g = m.size(), A = m.isScalar(), F;
    if (_e(p) ? (F = p.size(), p = p.toArray()) : F = $e(p), A) {
      if (F.length !== 0)
        throw new TypeError("Scalar expected");
      v.set(m.min(), p, w);
    } else {
      if (g.length !== 1 && g.length !== 2)
        throw new Fe(g.length, v._size.length, "<");
      if (F.length < g.length) {
        for (var y = 0, C = 0; g[y] === 1 && F[y] === 1; )
          y++;
        for (; g[y] === 1; )
          C++, y++;
        p = Mi(p, g.length, C, F);
      }
      if (!Or(g, F))
        throw new Fe(g, F, ">");
      if (g.length === 1) {
        var b = m.dimension(0);
        b.forEach(function(M, x) {
          Be(M), v.set([M, 0], p[x[0]], w);
        });
      } else {
        var E = m.dimension(0), S = m.dimension(1);
        E.forEach(function(M, x) {
          Be(M), S.forEach(function(I, T) {
            Be(I), v.set([M, I], p[x[0]][T[0]], w);
          });
        });
      }
    }
    return v;
  }
  r.prototype.get = function(v) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== this._size.length)
      throw new Fe(v.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var m = v[0], p = v[1];
    Be(m, this._size[0]), Be(p, this._size[1]);
    var w = h(m, this._ptr[p], this._ptr[p + 1], this._index);
    return w < this._ptr[p + 1] && this._index[w] === m ? this._values[w] : 0;
  }, r.prototype.set = function(v, m, p) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== this._size.length)
      throw new Fe(v.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var w = v[0], g = v[1], A = this._size[0], F = this._size[1], y = t, C = 0;
    tr(this._datatype) && (y = n.find(t, [this._datatype, this._datatype]) || t, C = n.convert(0, this._datatype)), (w > A - 1 || g > F - 1) && (f(this, Math.max(w + 1, A), Math.max(g + 1, F), p), A = this._size[0], F = this._size[1]), Be(w, A), Be(g, F);
    var b = h(w, this._ptr[g], this._ptr[g + 1], this._index);
    return b < this._ptr[g + 1] && this._index[b] === w ? y(m, C) ? s(b, g, this._values, this._index, this._ptr) : this._values[b] = m : y(m, C) || u(b, w, g, m, this._values, this._index, this._ptr), this;
  };
  function h(v, m, p, w) {
    if (p - m === 0)
      return p;
    for (var g = m; g < p; g++)
      if (w[g] === v)
        return g;
    return m;
  }
  function s(v, m, p, w, g) {
    p.splice(v, 1), w.splice(v, 1);
    for (var A = m + 1; A < g.length; A++)
      g[A]--;
  }
  function u(v, m, p, w, g, A, F) {
    g.splice(v, 0, w), A.splice(v, 0, m);
    for (var y = p + 1; y < F.length; y++)
      F[y]++;
  }
  r.prototype.resize = function(v, m, p) {
    if (!ot(v))
      throw new TypeError("Array or Matrix expected");
    var w = v.valueOf().map((A) => Array.isArray(A) && A.length === 1 ? A[0] : A);
    if (w.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    w.forEach(function(A) {
      if (!Le(A) || !ze(A) || A < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Oe(w) + ")");
    });
    var g = p ? this.clone() : this;
    return f(g, w[0], w[1], m);
  };
  function f(v, m, p, w) {
    var g = w || 0, A = t, F = 0;
    tr(v._datatype) && (A = n.find(t, [v._datatype, v._datatype]) || t, F = n.convert(0, v._datatype), g = n.convert(g, v._datatype));
    var y = !A(g, F), C = v._size[0], b = v._size[1], E, S, M;
    if (p > b) {
      for (S = b; S < p; S++)
        if (v._ptr[S] = v._values.length, y)
          for (E = 0; E < C; E++)
            v._values.push(g), v._index.push(E);
      v._ptr[p] = v._values.length;
    } else
      p < b && (v._ptr.splice(p + 1, b - p), v._values.splice(v._ptr[p], v._values.length), v._index.splice(v._ptr[p], v._index.length));
    if (b = p, m > C) {
      if (y) {
        var x = 0;
        for (S = 0; S < b; S++) {
          v._ptr[S] = v._ptr[S] + x, M = v._ptr[S + 1] + x;
          var I = 0;
          for (E = C; E < m; E++, I++)
            v._values.splice(M + I, 0, g), v._index.splice(M + I, 0, E), x++;
        }
        v._ptr[b] = v._values.length;
      }
    } else if (m < C) {
      var T = 0;
      for (S = 0; S < b; S++) {
        v._ptr[S] = v._ptr[S] - T;
        var O = v._ptr[S], B = v._ptr[S + 1] - T;
        for (M = O; M < B; M++)
          E = v._index[M], E > m - 1 && (v._values.splice(M, 1), v._index.splice(M, 1), T++);
      }
      v._ptr[S] = v._values.length;
    }
    return v._size[0] = m, v._size[1] = p, v;
  }
  r.prototype.reshape = function(v, m) {
    if (!Me(v))
      throw new TypeError("Array expected");
    if (v.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    v.forEach(function(z) {
      if (!Le(z) || !ze(z) || z <= -2 || z === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Oe(v) + ")");
    });
    var p = this._size[0] * this._size[1];
    v = Xt(v, p);
    var w = v[0] * v[1];
    if (p !== w)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var g = m ? this.clone() : this;
    if (this._size[0] === v[0] && this._size[1] === v[1])
      return g;
    for (var A = [], F = 0; F < g._ptr.length; F++)
      for (var y = 0; y < g._ptr[F + 1] - g._ptr[F]; y++)
        A.push(F);
    for (var C = g._values.slice(), b = g._index.slice(), E = 0; E < g._index.length; E++) {
      var S = b[E], M = A[E], x = S * g._size[1] + M;
      A[E] = x % v[1], b[E] = Math.floor(x / v[1]);
    }
    g._values.length = 0, g._index.length = 0, g._ptr.length = v[1] + 1, g._size = v.slice();
    for (var I = 0; I < g._ptr.length; I++)
      g._ptr[I] = 0;
    for (var T = 0; T < C.length; T++) {
      var O = b[T], B = A[T], G = C[T], $ = h(O, g._ptr[B], g._ptr[B + 1], g._index);
      u($, O, B, G, g._values, g._index, g._ptr);
    }
    return g;
  }, r.prototype.clone = function() {
    var v = new r({
      values: this._values ? Ce(this._values) : void 0,
      index: Ce(this._index),
      ptr: Ce(this._ptr),
      size: Ce(this._size),
      datatype: this._datatype
    });
    return v;
  }, r.prototype.size = function() {
    return this._size.slice(0);
  }, r.prototype.map = function(v, m) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var p = this, w = this._size[0], g = this._size[1], A = Hi(v), F = function(C, b, E) {
      return A === 1 ? v(C) : A === 2 ? v(C, [b, E]) : v(C, [b, E], p);
    };
    return d(this, 0, w - 1, 0, g - 1, F, m);
  };
  function d(v, m, p, w, g, A, F) {
    var y = [], C = [], b = [], E = t, S = 0;
    tr(v._datatype) && (E = n.find(t, [v._datatype, v._datatype]) || t, S = n.convert(0, v._datatype));
    for (var M = function(q, Z, ne) {
      q = A(q, Z, ne), E(q, S) || (y.push(q), C.push(Z));
    }, x = w; x <= g; x++) {
      b.push(y.length);
      var I = v._ptr[x], T = v._ptr[x + 1];
      if (F)
        for (var O = I; O < T; O++) {
          var B = v._index[O];
          B >= m && B <= p && M(v._values[O], B - m, x - w);
        }
      else {
        for (var G = {}, $ = I; $ < T; $++) {
          var z = v._index[$];
          G[z] = v._values[$];
        }
        for (var V = m; V <= p; V++) {
          var K = V in G ? G[V] : 0;
          M(K, V - m, x - w);
        }
      }
    }
    return b.push(y.length), new r({
      values: y,
      index: C,
      ptr: b,
      size: [p - m + 1, g - w + 1]
    });
  }
  r.prototype.forEach = function(v, m) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var p = this, w = this._size[0], g = this._size[1], A = 0; A < g; A++) {
      var F = this._ptr[A], y = this._ptr[A + 1];
      if (m)
        for (var C = F; C < y; C++) {
          var b = this._index[C];
          v(this._values[C], [b, A], p);
        }
      else {
        for (var E = {}, S = F; S < y; S++) {
          var M = this._index[S];
          E[M] = this._values[S];
        }
        for (var x = 0; x < w; x++) {
          var I = x in E ? E[x] : 0;
          v(I, [x, A], p);
        }
      }
    }
  }, r.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var v = this._size[1], m = 0; m < v; m++)
      for (var p = this._ptr[m], w = this._ptr[m + 1], g = p; g < w; g++) {
        var A = this._index[g];
        yield {
          value: this._values[g],
          index: [A, m]
        };
      }
  }, r.prototype.toArray = function() {
    return D(this._values, this._index, this._ptr, this._size, !0);
  }, r.prototype.valueOf = function() {
    return D(this._values, this._index, this._ptr, this._size, !1);
  };
  function D(v, m, p, w, g) {
    var A = w[0], F = w[1], y = [], C, b;
    for (C = 0; C < A; C++)
      for (y[C] = [], b = 0; b < F; b++)
        y[C][b] = 0;
    for (b = 0; b < F; b++)
      for (var E = p[b], S = p[b + 1], M = E; M < S; M++)
        C = m[M], y[C][b] = v ? g ? Ce(v[M]) : v[M] : 1;
    return y;
  }
  return r.prototype.format = function(v) {
    for (var m = this._size[0], p = this._size[1], w = this.density(), g = "Sparse Matrix [" + Oe(m, v) + " x " + Oe(p, v) + "] density: " + Oe(w, v) + `
`, A = 0; A < p; A++)
      for (var F = this._ptr[A], y = this._ptr[A + 1], C = F; C < y; C++) {
        var b = this._index[C];
        g += `
    (` + Oe(b, v) + ", " + Oe(A, v) + ") ==> " + (this._values ? Oe(this._values[C], v) : "X");
      }
    return g;
  }, r.prototype.toString = function() {
    return Oe(this.toArray());
  }, r.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  }, r.prototype.diagonal = function(v) {
    if (v) {
      if (Re(v) && (v = v.toNumber()), !Le(v) || !ze(v))
        throw new TypeError("The parameter k must be an integer number");
    } else
      v = 0;
    var m = v > 0 ? v : 0, p = v < 0 ? -v : 0, w = this._size[0], g = this._size[1], A = Math.min(w - p, g - m), F = [], y = [], C = [];
    C[0] = 0;
    for (var b = m; b < g && F.length < A; b++)
      for (var E = this._ptr[b], S = this._ptr[b + 1], M = E; M < S; M++) {
        var x = this._index[M];
        if (x === b - m + p) {
          F.push(this._values[M]), y[F.length - 1] = x - p;
          break;
        }
      }
    return C.push(F.length), new r({
      values: F,
      index: y,
      ptr: C,
      size: [A, 1]
    });
  }, r.fromJSON = function(v) {
    return new r(v);
  }, r.diagonal = function(v, m, p, w, g) {
    if (!Me(v))
      throw new TypeError("Array expected, size parameter");
    if (v.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (v = v.map(function(z) {
      if (Re(z) && (z = z.toNumber()), !Le(z) || !ze(z) || z < 1)
        throw new Error("Size values must be positive integers");
      return z;
    }), p) {
      if (Re(p) && (p = p.toNumber()), !Le(p) || !ze(p))
        throw new TypeError("The parameter k must be an integer number");
    } else
      p = 0;
    var A = t, F = 0;
    tr(g) && (A = n.find(t, [g, g]) || t, F = n.convert(0, g));
    var y = p > 0 ? p : 0, C = p < 0 ? -p : 0, b = v[0], E = v[1], S = Math.min(b - C, E - y), M;
    if (Me(m)) {
      if (m.length !== S)
        throw new Error("Invalid value array length");
      M = function(V) {
        return m[V];
      };
    } else if (_e(m)) {
      var x = m.size();
      if (x.length !== 1 || x[0] !== S)
        throw new Error("Invalid matrix length");
      M = function(V) {
        return m.get([V]);
      };
    } else
      M = function() {
        return m;
      };
    for (var I = [], T = [], O = [], B = 0; B < E; B++) {
      O.push(I.length);
      var G = B - y;
      if (G >= 0 && G < S) {
        var $ = M(G);
        A($, F) || (T.push(G + C), I.push($));
      }
    }
    return O.push(I.length), new r({
      values: I,
      index: T,
      ptr: O,
      size: [b, E]
    });
  }, r.prototype.swapRows = function(v, m) {
    if (!Le(v) || !ze(v) || !Le(m) || !ze(m))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Be(v, this._size[0]), Be(m, this._size[0]), r._swapRows(v, m, this._size[1], this._values, this._index, this._ptr), this;
  }, r._forEachRow = function(v, m, p, w, g) {
    for (var A = w[v], F = w[v + 1], y = A; y < F; y++)
      g(p[y], m[y]);
  }, r._swapRows = function(v, m, p, w, g, A) {
    for (var F = 0; F < p; F++) {
      var y = A[F], C = A[F + 1], b = h(v, y, C, g), E = h(m, y, C, g);
      if (b < C && E < C && g[b] === v && g[E] === m) {
        if (w) {
          var S = w[b];
          w[b] = w[E], w[E] = S;
        }
        continue;
      }
      if (b < C && g[b] === v && (E >= C || g[E] !== m)) {
        var M = w ? w[b] : void 0;
        g.splice(E, 0, m), w && w.splice(E, 0, M), g.splice(E <= b ? b + 1 : b, 1), w && w.splice(E <= b ? b + 1 : b, 1);
        continue;
      }
      if (E < C && g[E] === m && (b >= C || g[b] !== v)) {
        var x = w ? w[E] : void 0;
        g.splice(b, 0, v), w && w.splice(b, 0, x), g.splice(b <= E ? E + 1 : E, 1), w && w.splice(b <= E ? E + 1 : E, 1);
      }
    }
  }, r;
}, {
  isClass: !0
}), Ns = "number", Bs = ["typed"];
function _s(e) {
  var n = e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (n) {
    var t = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[n[1]], i = n[2], r = n[3];
    return {
      input: e,
      radix: t,
      integerPart: i,
      fractionalPart: r
    };
  } else
    return null;
}
function zs(e) {
  for (var n = parseInt(e.integerPart, e.radix), t = 0, i = 0; i < e.fractionalPart.length; i++) {
    var r = parseInt(e.fractionalPart[i], e.radix);
    t += r / Math.pow(e.radix, i + 1);
  }
  var a = n + t;
  if (isNaN(a))
    throw new SyntaxError('String "' + e.input + '" is not a valid number');
  return a;
}
var Ts = /* @__PURE__ */ ee(Ns, Bs, (e) => {
  var {
    typed: n
  } = e, t = n("number", {
    "": function() {
      return 0;
    },
    number: function(r) {
      return r;
    },
    string: function(r) {
      if (r === "NaN")
        return NaN;
      var a = _s(r);
      if (a)
        return zs(a);
      var o = 0, l = r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      l && (o = Number(l[2]), r = l[1]);
      var c = Number(r);
      if (isNaN(c))
        throw new SyntaxError('String "' + r + '" is not a valid number');
      if (l) {
        if (c > 2 ** o - 1)
          throw new SyntaxError('String "'.concat(r, '" is out of range'));
        c >= 2 ** (o - 1) && (c = c - 2 ** o);
      }
      return c;
    },
    BigNumber: function(r) {
      return r.toNumber();
    },
    Fraction: function(r) {
      return r.valueOf();
    },
    Unit: n.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    null: function(r) {
      return 0;
    },
    "Unit, string | Unit": function(r, a) {
      return r.toNumber(a);
    },
    "Array | Matrix": n.referToSelf((i) => (r) => er(r, i))
  });
  return t.fromJSON = function(i) {
    return parseFloat(i.value);
  }, t;
}), Is = "bignumber", Os = ["typed", "BigNumber"], Ls = /* @__PURE__ */ ee(Is, Os, (e) => {
  var {
    typed: n,
    BigNumber: t
  } = e;
  return n("bignumber", {
    "": function() {
      return new t(0);
    },
    number: function(r) {
      return new t(r + "");
    },
    string: function(r) {
      var a = r.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (a) {
        var o = a[2], l = t(a[1]), c = new t(2).pow(Number(o));
        if (l.gt(c.sub(1)))
          throw new SyntaxError('String "'.concat(r, '" is out of range'));
        var h = new t(2).pow(Number(o) - 1);
        return l.gte(h) ? l.sub(c) : l;
      }
      return new t(r);
    },
    BigNumber: function(r) {
      return r;
    },
    Unit: n.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    Fraction: function(r) {
      return new t(r.n).div(r.d).times(r.s);
    },
    null: function(r) {
      return new t(0);
    },
    "Array | Matrix": n.referToSelf((i) => (r) => er(r, i))
  });
}), $s = "complex", qs = ["typed", "Complex"], Ps = /* @__PURE__ */ ee($s, qs, (e) => {
  var {
    typed: n,
    Complex: t
  } = e;
  return n("complex", {
    "": function() {
      return t.ZERO;
    },
    number: function(r) {
      return new t(r, 0);
    },
    "number, number": function(r, a) {
      return new t(r, a);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function(r, a) {
      return new t(r.toNumber(), a.toNumber());
    },
    Fraction: function(r) {
      return new t(r.valueOf(), 0);
    },
    Complex: function(r) {
      return r.clone();
    },
    string: function(r) {
      return t(r);
    },
    null: function(r) {
      return t(0);
    },
    Object: function(r) {
      if ("re" in r && "im" in r)
        return new t(r.re, r.im);
      if ("r" in r && "phi" in r || "abs" in r && "arg" in r)
        return new t(r);
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": n.referToSelf((i) => (r) => er(r, i))
  });
}), Rs = "fraction", Us = ["typed", "Fraction"], Vs = /* @__PURE__ */ ee(Rs, Us, (e) => {
  var {
    typed: n,
    Fraction: t
  } = e;
  return n("fraction", {
    number: function(r) {
      if (!isFinite(r) || isNaN(r))
        throw new Error(r + " cannot be represented as a fraction");
      return new t(r);
    },
    string: function(r) {
      return new t(r);
    },
    "number, number": function(r, a) {
      return new t(r, a);
    },
    null: function(r) {
      return new t(0);
    },
    BigNumber: function(r) {
      return new t(r.toString());
    },
    Fraction: function(r) {
      return r;
    },
    Unit: n.referToSelf((i) => (r) => {
      var a = r.clone();
      return a.value = i(r.value), a;
    }),
    Object: function(r) {
      return new t(r);
    },
    "Array | Matrix": n.referToSelf((i) => (r) => er(r, i))
  });
}), wn = "matrix", Zs = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], Gs = /* @__PURE__ */ ee(wn, Zs, (e) => {
  var {
    typed: n,
    Matrix: t,
    DenseMatrix: i,
    SparseMatrix: r
  } = e;
  return n(wn, {
    "": function() {
      return a([]);
    },
    string: function(l) {
      return a([], l);
    },
    "string, string": function(l, c) {
      return a([], l, c);
    },
    Array: function(l) {
      return a(l);
    },
    Matrix: function(l) {
      return a(l, l.storage());
    },
    "Array | Matrix, string": a,
    "Array | Matrix, string, string": a
  });
  function a(o, l, c) {
    if (l === "dense" || l === "default" || l === void 0)
      return new i(o, c);
    if (l === "sparse")
      return new r(o, c);
    throw new TypeError("Unknown matrix type " + JSON.stringify(l) + ".");
  }
}), An = "matrixFromColumns", Ys = ["typed", "matrix", "flatten", "size"], Js = /* @__PURE__ */ ee(An, Ys, (e) => {
  var {
    typed: n,
    matrix: t,
    flatten: i,
    size: r
  } = e;
  return n(An, {
    "...Array": function(c) {
      return a(c);
    },
    "...Matrix": function(c) {
      return t(a(c.map((h) => h.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function a(l) {
    if (l.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    for (var c = o(l[0]), h = [], s = 0; s < c; s++)
      h[s] = [];
    for (var u of l) {
      var f = o(u);
      if (f !== c)
        throw new TypeError("The vectors had different length: " + (c | 0) + " ≠ " + (f | 0));
      for (var d = i(u), D = 0; D < c; D++)
        h[D].push(d[D]);
    }
    return h;
  }
  function o(l) {
    var c = r(l);
    if (c.length === 1)
      return c[0];
    if (c.length === 2) {
      if (c[0] === 1)
        return c[1];
      if (c[1] === 1)
        return c[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), En = "unaryMinus", Qs = ["typed"], Xs = /* @__PURE__ */ ee(En, Qs, (e) => {
  var {
    typed: n
  } = e;
  return n(En, {
    number: ea,
    "Complex | BigNumber | Fraction": (t) => t.neg(),
    Unit: n.referToSelf((t) => (i) => {
      var r = i.clone();
      return r.value = n.find(t, r.valueType())(i.value), r;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
    // TODO: add support for string
  });
}), Fn = "abs", Hs = ["typed"], Ks = /* @__PURE__ */ ee(Fn, Hs, (e) => {
  var {
    typed: n
  } = e;
  return n(Fn, {
    number: Ki,
    "Complex | BigNumber | Fraction | Unit": (t) => t.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), Cn = "addScalar", Ws = ["typed"], ks = /* @__PURE__ */ ee(Cn, Ws, (e) => {
  var {
    typed: n
  } = e;
  return n(Cn, {
    "number, number": Wi,
    "Complex, Complex": function(i, r) {
      return i.add(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.plus(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.add(r);
    },
    "Unit, Unit": n.referToSelf((t) => (i, r) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (r.value === null || r.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(r))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = n.find(t, [a.valueType(), r.valueType()])(a.value, r.value), a.fixPrefix = !1, a;
    })
  });
}), bn = "subtractScalar", js = ["typed"], ef = /* @__PURE__ */ ee(bn, js, (e) => {
  var {
    typed: n
  } = e;
  return n(bn, {
    "number, number": ki,
    "Complex, Complex": function(i, r) {
      return i.sub(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.minus(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.sub(r);
    },
    "Unit, Unit": n.referToSelf((t) => (i, r) => {
      if (i.value === null || i.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (r.value === null || r.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!i.equalBase(r))
        throw new Error("Units do not match");
      var a = i.clone();
      return a.value = n.find(t, [a.valueType(), r.valueType()])(a.value, r.value), a.fixPrefix = !1, a;
    })
  });
}), rf = "matAlgo11xS0s", tf = ["typed", "equalScalar"], nf = /* @__PURE__ */ ee(rf, tf, (e) => {
  var {
    typed: n,
    equalScalar: t
  } = e;
  return function(r, a, o, l) {
    var c = r._values, h = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], v, m = t, p = 0, w = o;
    typeof f == "string" && (v = f, m = n.find(t, [v, v]), p = n.convert(0, v), a = n.convert(a, v), w = n.find(o, [v, v]));
    for (var g = [], A = [], F = [], y = 0; y < D; y++) {
      F[y] = A.length;
      for (var C = s[y], b = s[y + 1], E = C; E < b; E++) {
        var S = h[E], M = l ? w(a, c[E]) : w(c[E], a);
        m(M, p) || (A.push(S), g.push(M));
      }
    }
    return F[D] = A.length, r.createSparseMatrix({
      values: g,
      index: A,
      ptr: F,
      size: [d, D],
      datatype: v
    });
  };
}), af = "matAlgo12xSfs", uf = ["typed", "DenseMatrix"], Pr = /* @__PURE__ */ ee(af, uf, (e) => {
  var {
    typed: n,
    DenseMatrix: t
  } = e;
  return function(r, a, o, l) {
    var c = r._values, h = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], v, m = o;
    typeof f == "string" && (v = f, a = n.convert(a, v), m = n.find(o, [v, v]));
    for (var p = [], w = [], g = [], A = 0; A < D; A++) {
      for (var F = A + 1, y = s[A], C = s[A + 1], b = y; b < C; b++) {
        var E = h[b];
        w[E] = c[b], g[E] = F;
      }
      for (var S = 0; S < d; S++)
        A === 0 && (p[S] = []), g[S] === F ? p[S][A] = l ? m(a, w[S]) : m(w[S], a) : p[S][A] = l ? m(a, 0) : m(0, a);
    }
    return new t({
      data: p,
      size: [d, D],
      datatype: v
    });
  };
}), of = "matAlgo14xDs", sf = ["typed"], aa = /* @__PURE__ */ ee(of, sf, (e) => {
  var {
    typed: n
  } = e;
  return function(r, a, o, l) {
    var c = r._data, h = r._size, s = r._datatype, u, f = o;
    typeof s == "string" && (u = s, a = n.convert(a, u), f = n.find(o, [u, u]));
    var d = h.length > 0 ? t(f, 0, h, h[0], c, a, l) : [];
    return r.createDenseMatrix({
      data: d,
      size: Ce(h),
      datatype: u
    });
  };
  function t(i, r, a, o, l, c, h) {
    var s = [];
    if (r === a.length - 1)
      for (var u = 0; u < o; u++)
        s[u] = h ? i(c, l[u]) : i(l[u], c);
    else
      for (var f = 0; f < o; f++)
        s[f] = t(i, r + 1, a, a[r + 1], l[f], c, h);
    return s;
  }
}), ff = "matAlgo03xDSf", cf = ["typed"], Rr = /* @__PURE__ */ ee(ff, cf, (e) => {
  var {
    typed: n
  } = e;
  return function(i, r, a, o) {
    var l = i._data, c = i._size, h = i._datatype, s = r._values, u = r._index, f = r._ptr, d = r._size, D = r._datatype;
    if (c.length !== d.length)
      throw new Fe(c.length, d.length);
    if (c[0] !== d[0] || c[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + d + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var v = c[0], m = c[1], p, w = 0, g = a;
    typeof h == "string" && h === D && (p = h, w = n.convert(0, p), g = n.find(a, [p, p]));
    for (var A = [], F = 0; F < v; F++)
      A[F] = [];
    for (var y = [], C = [], b = 0; b < m; b++) {
      for (var E = b + 1, S = f[b], M = f[b + 1], x = S; x < M; x++) {
        var I = u[x];
        y[I] = o ? g(s[x], l[I][b]) : g(l[I][b], s[x]), C[I] = E;
      }
      for (var T = 0; T < v; T++)
        C[T] === E ? A[T][b] = y[T] : A[T][b] = o ? g(w, l[T][b]) : g(l[T][b], w);
    }
    return i.createDenseMatrix({
      data: A,
      size: [v, m],
      datatype: p
    });
  };
}), lf = "matAlgo05xSfSf", hf = ["typed", "equalScalar"], vf = /* @__PURE__ */ ee(lf, hf, (e) => {
  var {
    typed: n,
    equalScalar: t
  } = e;
  return function(r, a, o) {
    var l = r._values, c = r._index, h = r._ptr, s = r._size, u = r._datatype, f = a._values, d = a._index, D = a._ptr, v = a._size, m = a._datatype;
    if (s.length !== v.length)
      throw new Fe(s.length, v.length);
    if (s[0] !== v[0] || s[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
    var p = s[0], w = s[1], g, A = t, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, A = n.find(t, [g, g]), F = n.convert(0, g), y = n.find(o, [g, g]));
    var C = l && f ? [] : void 0, b = [], E = [], S = C ? [] : void 0, M = C ? [] : void 0, x = [], I = [], T, O, B, G;
    for (O = 0; O < w; O++) {
      E[O] = b.length;
      var $ = O + 1;
      for (B = h[O], G = h[O + 1]; B < G; B++)
        T = c[B], b.push(T), x[T] = $, S && (S[T] = l[B]);
      for (B = D[O], G = D[O + 1]; B < G; B++)
        T = d[B], x[T] !== $ && b.push(T), I[T] = $, M && (M[T] = f[B]);
      if (C)
        for (B = E[O]; B < b.length; ) {
          T = b[B];
          var z = x[T], V = I[T];
          if (z === $ || V === $) {
            var K = z === $ ? S[T] : F, P = V === $ ? M[T] : F, q = y(K, P);
            A(q, F) ? b.splice(B, 1) : (C.push(q), B++);
          }
        }
    }
    return E[w] = b.length, r.createSparseMatrix({
      values: C,
      index: b,
      ptr: E,
      size: [p, w],
      datatype: g
    });
  };
}), df = "matAlgo13xDD", pf = ["typed"], mf = /* @__PURE__ */ ee(df, pf, (e) => {
  var {
    typed: n
  } = e;
  return function(r, a, o) {
    var l = r._data, c = r._size, h = r._datatype, s = a._data, u = a._size, f = a._datatype, d = [];
    if (c.length !== u.length)
      throw new Fe(c.length, u.length);
    for (var D = 0; D < c.length; D++) {
      if (c[D] !== u[D])
        throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + u + ")");
      d[D] = c[D];
    }
    var v, m = o;
    typeof h == "string" && h === f && (v = h, m = n.find(o, [v, v]));
    var p = d.length > 0 ? t(m, 0, d, d[0], l, s) : [];
    return r.createDenseMatrix({
      data: p,
      size: d,
      datatype: v
    });
  };
  function t(i, r, a, o, l, c) {
    var h = [];
    if (r === a.length - 1)
      for (var s = 0; s < o; s++)
        h[s] = i(l[s], c[s]);
    else
      for (var u = 0; u < o; u++)
        h[u] = t(i, r + 1, a, a[r + 1], l[u], c[u]);
    return h;
  }
}), gf = "broadcast", Df = ["concat"], yf = /* @__PURE__ */ ee(gf, Df, (e) => {
  var {
    concat: n
  } = e;
  return function(r, a) {
    var o = Math.max(r._size.length, a._size.length);
    if (r._size.length === a._size.length && r._size.every((D, v) => D === a._size[v]))
      return [r, a];
    for (var l = t(r._size, o, 0), c = t(a._size, o, 0), h = [], s = 0; s < o; s++)
      h[s] = Math.max(l[s], c[s]);
    ct(l, h), ct(c, h);
    var u = r.clone(), f = a.clone();
    u._size.length < o ? u.reshape(t(u._size, o, 1)) : f._size.length < o && f.reshape(t(f._size, o, 1));
    for (var d = 0; d < o; d++)
      u._size[d] < h[d] && (u = i(u, h[d], d)), f._size[d] < h[d] && (f = i(f, h[d], d));
    return [u, f];
  };
  function t(r, a, o) {
    return [...Array(a - r.length).fill(o), ...r];
  }
  function i(r, a, o) {
    return n(...Array(a).fill(r), o);
  }
}), wf = "matrixAlgorithmSuite", Af = ["typed", "matrix", "concat"], Mr = /* @__PURE__ */ ee(wf, Af, (e) => {
  var {
    typed: n,
    matrix: t,
    concat: i
  } = e, r = mf({
    typed: n
  }), a = aa({
    typed: n
  }), o = yf({
    concat: i
  });
  return function(c) {
    var h = c.elop, s = c.SD || c.DS, u;
    h ? (u = {
      "DenseMatrix, DenseMatrix": (v, m) => r(...o(v, m), h),
      "Array, Array": (v, m) => r(...o(t(v), t(m)), h).valueOf(),
      "Array, DenseMatrix": (v, m) => r(...o(t(v), m), h),
      "DenseMatrix, Array": (v, m) => r(...o(v, t(m)), h)
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = (v, m) => c.SS(...o(v, m), h, !1)), c.DS && (u["DenseMatrix, SparseMatrix"] = (v, m) => c.DS(...o(v, m), h, !1), u["Array, SparseMatrix"] = (v, m) => c.DS(...o(t(v), m), h, !1)), s && (u["SparseMatrix, DenseMatrix"] = (v, m) => s(...o(m, v), h, !0), u["SparseMatrix, Array"] = (v, m) => s(...o(t(m), v), h, !0))) : (u = {
      "DenseMatrix, DenseMatrix": n.referToSelf((v) => (m, p) => r(...o(m, p), v)),
      "Array, Array": n.referToSelf((v) => (m, p) => r(...o(t(m), t(p)), v).valueOf()),
      "Array, DenseMatrix": n.referToSelf((v) => (m, p) => r(...o(t(m), p), v)),
      "DenseMatrix, Array": n.referToSelf((v) => (m, p) => r(...o(m, t(p)), v))
    }, c.SS && (u["SparseMatrix, SparseMatrix"] = n.referToSelf((v) => (m, p) => c.SS(...o(m, p), v, !1))), c.DS && (u["DenseMatrix, SparseMatrix"] = n.referToSelf((v) => (m, p) => c.DS(...o(m, p), v, !1)), u["Array, SparseMatrix"] = n.referToSelf((v) => (m, p) => c.DS(...o(t(m), p), v, !1))), s && (u["SparseMatrix, DenseMatrix"] = n.referToSelf((v) => (m, p) => s(...o(p, m), v, !0)), u["SparseMatrix, Array"] = n.referToSelf((v) => (m, p) => s(...o(t(p), m), v, !0))));
    var f = c.scalar || "any", d = c.Ds || c.Ss;
    d && (h ? (u["DenseMatrix," + f] = (v, m) => a(v, m, h, !1), u[f + ", DenseMatrix"] = (v, m) => a(m, v, h, !0), u["Array," + f] = (v, m) => a(t(v), m, h, !1).valueOf(), u[f + ", Array"] = (v, m) => a(t(m), v, h, !0).valueOf()) : (u["DenseMatrix," + f] = n.referToSelf((v) => (m, p) => a(m, p, v, !1)), u[f + ", DenseMatrix"] = n.referToSelf((v) => (m, p) => a(p, m, v, !0)), u["Array," + f] = n.referToSelf((v) => (m, p) => a(t(m), p, v, !1).valueOf()), u[f + ", Array"] = n.referToSelf((v) => (m, p) => a(t(p), m, v, !0).valueOf())));
    var D = c.sS !== void 0 ? c.sS : c.Ss;
    return h ? (c.Ss && (u["SparseMatrix," + f] = (v, m) => c.Ss(v, m, h, !1)), D && (u[f + ", SparseMatrix"] = (v, m) => D(m, v, h, !0))) : (c.Ss && (u["SparseMatrix," + f] = n.referToSelf((v) => (m, p) => c.Ss(m, p, v, !1))), D && (u[f + ", SparseMatrix"] = n.referToSelf((v) => (m, p) => D(p, m, v, !0)))), h && h.signatures && Su(u, h.signatures), u;
  };
}), Ef = "matAlgo01xDSid", Ff = ["typed"], ua = /* @__PURE__ */ ee(Ef, Ff, (e) => {
  var {
    typed: n
  } = e;
  return function(i, r, a, o) {
    var l = i._data, c = i._size, h = i._datatype, s = r._values, u = r._index, f = r._ptr, d = r._size, D = r._datatype;
    if (c.length !== d.length)
      throw new Fe(c.length, d.length);
    if (c[0] !== d[0] || c[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + d + ")");
    if (!s)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var v = c[0], m = c[1], p = typeof h == "string" && h === D ? h : void 0, w = p ? n.find(a, [p, p]) : a, g, A, F = [];
    for (g = 0; g < v; g++)
      F[g] = [];
    var y = [], C = [];
    for (A = 0; A < m; A++) {
      for (var b = A + 1, E = f[A], S = f[A + 1], M = E; M < S; M++)
        g = u[M], y[g] = o ? w(s[M], l[g][A]) : w(l[g][A], s[M]), C[g] = b;
      for (g = 0; g < v; g++)
        C[g] === b ? F[g][A] = y[g] : F[g][A] = l[g][A];
    }
    return i.createDenseMatrix({
      data: F,
      size: [v, m],
      datatype: p
    });
  };
}), Cf = "matAlgo04xSidSid", bf = ["typed", "equalScalar"], Mf = /* @__PURE__ */ ee(Cf, bf, (e) => {
  var {
    typed: n,
    equalScalar: t
  } = e;
  return function(r, a, o) {
    var l = r._values, c = r._index, h = r._ptr, s = r._size, u = r._datatype, f = a._values, d = a._index, D = a._ptr, v = a._size, m = a._datatype;
    if (s.length !== v.length)
      throw new Fe(s.length, v.length);
    if (s[0] !== v[0] || s[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + v + ")");
    var p = s[0], w = s[1], g, A = t, F = 0, y = o;
    typeof u == "string" && u === m && (g = u, A = n.find(t, [g, g]), F = n.convert(0, g), y = n.find(o, [g, g]));
    var C = l && f ? [] : void 0, b = [], E = [], S = l && f ? [] : void 0, M = l && f ? [] : void 0, x = [], I = [], T, O, B, G, $;
    for (O = 0; O < w; O++) {
      E[O] = b.length;
      var z = O + 1;
      for (G = h[O], $ = h[O + 1], B = G; B < $; B++)
        T = c[B], b.push(T), x[T] = z, S && (S[T] = l[B]);
      for (G = D[O], $ = D[O + 1], B = G; B < $; B++)
        if (T = d[B], x[T] === z) {
          if (S) {
            var V = y(S[T], f[B]);
            A(V, F) ? x[T] = null : S[T] = V;
          }
        } else
          b.push(T), I[T] = z, M && (M[T] = f[B]);
      if (S && M)
        for (B = E[O]; B < b.length; )
          T = b[B], x[T] === z ? (C[B] = S[T], B++) : I[T] === z ? (C[B] = M[T], B++) : b.splice(B, 1);
    }
    return E[w] = b.length, r.createSparseMatrix({
      values: C,
      index: b,
      ptr: E,
      size: [p, w],
      datatype: g
    });
  };
}), Sf = "matAlgo10xSids", xf = ["typed", "DenseMatrix"], oa = /* @__PURE__ */ ee(Sf, xf, (e) => {
  var {
    typed: n,
    DenseMatrix: t
  } = e;
  return function(r, a, o, l) {
    var c = r._values, h = r._index, s = r._ptr, u = r._size, f = r._datatype;
    if (!c)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var d = u[0], D = u[1], v, m = o;
    typeof f == "string" && (v = f, a = n.convert(a, v), m = n.find(o, [v, v]));
    for (var p = [], w = [], g = [], A = 0; A < D; A++) {
      for (var F = A + 1, y = s[A], C = s[A + 1], b = y; b < C; b++) {
        var E = h[b];
        w[E] = c[b], g[E] = F;
      }
      for (var S = 0; S < d; S++)
        A === 0 && (p[S] = []), g[S] === F ? p[S][A] = l ? m(a, w[S]) : m(w[S], a) : p[S][A] = a;
    }
    return new t({
      data: p,
      size: [d, D],
      datatype: v
    });
  };
}), Nf = "multiplyScalar", Bf = ["typed"], _f = /* @__PURE__ */ ee(Nf, Bf, (e) => {
  var {
    typed: n
  } = e;
  return n("multiplyScalar", {
    "number, number": ji,
    "Complex, Complex": function(i, r) {
      return i.mul(r);
    },
    "BigNumber, BigNumber": function(i, r) {
      return i.times(r);
    },
    "Fraction, Fraction": function(i, r) {
      return i.mul(r);
    },
    "number | Fraction | BigNumber | Complex, Unit": (t, i) => i.multiply(t),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (t, i) => t.multiply(i)
  });
}), Mn = "multiply", zf = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], Tf = /* @__PURE__ */ ee(Mn, zf, (e) => {
  var {
    typed: n,
    matrix: t,
    addScalar: i,
    multiplyScalar: r,
    equalScalar: a,
    dot: o
  } = e, l = nf({
    typed: n,
    equalScalar: a
  }), c = aa({
    typed: n
  });
  function h(F, y) {
    switch (F.length) {
      case 1:
        switch (y.length) {
          case 1:
            if (F[0] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (F[0] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + y[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + y.length + " dimensions)");
        }
        break;
      case 2:
        switch (y.length) {
          case 1:
            if (F[1] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + y[0] + ")");
            break;
          case 2:
            if (F[1] !== y[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + y[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + y.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
    }
  }
  function s(F, y, C) {
    if (C === 0)
      throw new Error("Cannot multiply two empty vectors");
    return o(F, y);
  }
  function u(F, y) {
    if (y.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return f(F, y);
  }
  function f(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._size, x = y._datatype, I = b[0], T = M[1], O, B = i, G = r;
    E && x && E === x && typeof E == "string" && (O = E, B = n.find(i, [O, O]), G = n.find(r, [O, O]));
    for (var $ = [], z = 0; z < T; z++) {
      for (var V = G(C[0], S[0][z]), K = 1; K < I; K++)
        V = B(V, G(C[K], S[K][z]));
      $[z] = V;
    }
    return F.createDenseMatrix({
      data: $,
      size: [T],
      datatype: O
    });
  }
  var d = n("_multiplyMatrixVector", {
    "DenseMatrix, any": v,
    "SparseMatrix, any": w
  }), D = n("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": m,
    "DenseMatrix, SparseMatrix": p,
    "SparseMatrix, DenseMatrix": g,
    "SparseMatrix, SparseMatrix": A
  });
  function v(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._datatype, x = b[0], I = b[1], T, O = i, B = r;
    E && M && E === M && typeof E == "string" && (T = E, O = n.find(i, [T, T]), B = n.find(r, [T, T]));
    for (var G = [], $ = 0; $ < x; $++) {
      for (var z = C[$], V = B(z[0], S[0]), K = 1; K < I; K++)
        V = O(V, B(z[K], S[K]));
      G[$] = V;
    }
    return F.createDenseMatrix({
      data: G,
      size: [x],
      datatype: T
    });
  }
  function m(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._data, M = y._size, x = y._datatype, I = b[0], T = b[1], O = M[1], B, G = i, $ = r;
    E && x && E === x && typeof E == "string" && (B = E, G = n.find(i, [B, B]), $ = n.find(r, [B, B]));
    for (var z = [], V = 0; V < I; V++) {
      var K = C[V];
      z[V] = [];
      for (var P = 0; P < O; P++) {
        for (var q = $(K[0], S[0][P]), Z = 1; Z < T; Z++)
          q = G(q, $(K[Z], S[Z][P]));
        z[V][P] = q;
      }
    }
    return F.createDenseMatrix({
      data: z,
      size: [I, O],
      datatype: B
    });
  }
  function p(F, y) {
    var C = F._data, b = F._size, E = F._datatype, S = y._values, M = y._index, x = y._ptr, I = y._size, T = y._datatype;
    if (!S)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var O = b[0], B = I[1], G, $ = i, z = r, V = a, K = 0;
    E && T && E === T && typeof E == "string" && (G = E, $ = n.find(i, [G, G]), z = n.find(r, [G, G]), V = n.find(a, [G, G]), K = n.convert(0, G));
    for (var P = [], q = [], Z = [], ne = y.createSparseMatrix({
      values: P,
      index: q,
      ptr: Z,
      size: [O, B],
      datatype: G
    }), k = 0; k < B; k++) {
      Z[k] = q.length;
      var U = x[k], Q = x[k + 1];
      if (Q > U)
        for (var X = 0, J = 0; J < O; J++) {
          for (var ue = J + 1, j = void 0, se = U; se < Q; se++) {
            var le = M[se];
            X !== ue ? (j = z(C[J][le], S[se]), X = ue) : j = $(j, z(C[J][le], S[se]));
          }
          X === ue && !V(j, K) && (q.push(J), P.push(j));
        }
    }
    return Z[B] = q.length, ne;
  }
  function w(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, x = y._datatype, I = F._size[0], T = y._size[0], O = [], B = [], G = [], $, z = i, V = r, K = a, P = 0;
    S && x && S === x && typeof S == "string" && ($ = S, z = n.find(i, [$, $]), V = n.find(r, [$, $]), K = n.find(a, [$, $]), P = n.convert(0, $));
    var q = [], Z = [];
    G[0] = 0;
    for (var ne = 0; ne < T; ne++) {
      var k = M[ne];
      if (!K(k, P))
        for (var U = E[ne], Q = E[ne + 1], X = U; X < Q; X++) {
          var J = b[X];
          Z[J] ? q[J] = z(q[J], V(k, C[X])) : (Z[J] = !0, B.push(J), q[J] = V(k, C[X]));
        }
    }
    for (var ue = B.length, j = 0; j < ue; j++) {
      var se = B[j];
      O[j] = q[se];
    }
    return G[1] = B.length, F.createSparseMatrix({
      values: O,
      index: B,
      ptr: G,
      size: [I, 1],
      datatype: $
    });
  }
  function g(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype;
    if (!C)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var M = y._data, x = y._datatype, I = F._size[0], T = y._size[0], O = y._size[1], B, G = i, $ = r, z = a, V = 0;
    S && x && S === x && typeof S == "string" && (B = S, G = n.find(i, [B, B]), $ = n.find(r, [B, B]), z = n.find(a, [B, B]), V = n.convert(0, B));
    for (var K = [], P = [], q = [], Z = F.createSparseMatrix({
      values: K,
      index: P,
      ptr: q,
      size: [I, O],
      datatype: B
    }), ne = [], k = [], U = 0; U < O; U++) {
      q[U] = P.length;
      for (var Q = U + 1, X = 0; X < T; X++) {
        var J = M[X][U];
        if (!z(J, V))
          for (var ue = E[X], j = E[X + 1], se = ue; se < j; se++) {
            var le = b[se];
            k[le] !== Q ? (k[le] = Q, P.push(le), ne[le] = $(J, C[se])) : ne[le] = G(ne[le], $(J, C[se]));
          }
      }
      for (var pe = q[U], De = P.length, Ae = pe; Ae < De; Ae++) {
        var he = P[Ae];
        K[Ae] = ne[he];
      }
    }
    return q[O] = P.length, Z;
  }
  function A(F, y) {
    var C = F._values, b = F._index, E = F._ptr, S = F._datatype, M = y._values, x = y._index, I = y._ptr, T = y._datatype, O = F._size[0], B = y._size[1], G = C && M, $, z = i, V = r;
    S && T && S === T && typeof S == "string" && ($ = S, z = n.find(i, [$, $]), V = n.find(r, [$, $]));
    for (var K = G ? [] : void 0, P = [], q = [], Z = F.createSparseMatrix({
      values: K,
      index: P,
      ptr: q,
      size: [O, B],
      datatype: $
    }), ne = G ? [] : void 0, k = [], U, Q, X, J, ue, j, se, le, pe = 0; pe < B; pe++) {
      q[pe] = P.length;
      var De = pe + 1;
      for (ue = I[pe], j = I[pe + 1], J = ue; J < j; J++)
        if (le = x[J], G)
          for (Q = E[le], X = E[le + 1], U = Q; U < X; U++)
            se = b[U], k[se] !== De ? (k[se] = De, P.push(se), ne[se] = V(M[J], C[U])) : ne[se] = z(ne[se], V(M[J], C[U]));
        else
          for (Q = E[le], X = E[le + 1], U = Q; U < X; U++)
            se = b[U], k[se] !== De && (k[se] = De, P.push(se));
      if (G)
        for (var Ae = q[pe], he = P.length, be = Ae; be < he; be++) {
          var Ee = P[be];
          K[be] = ne[Ee];
        }
    }
    return q[B] = P.length, Z;
  }
  return n(Mn, r, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": n.referTo("Matrix, Matrix", (F) => (y, C) => {
      h($e(y), $e(C));
      var b = F(t(y), t(C));
      return _e(b) ? b.valueOf() : b;
    }),
    "Matrix, Matrix": function(y, C) {
      var b = y.size(), E = C.size();
      return h(b, E), b.length === 1 ? E.length === 1 ? s(y, C, b[0]) : u(y, C) : E.length === 1 ? d(y, C) : D(y, C);
    },
    "Matrix, Array": n.referTo("Matrix,Matrix", (F) => (y, C) => F(y, t(C))),
    "Array, Matrix": n.referToSelf((F) => (y, C) => F(t(y, C.storage()), C)),
    "SparseMatrix, any": function(y, C) {
      return l(y, C, r, !1);
    },
    "DenseMatrix, any": function(y, C) {
      return c(y, C, r, !1);
    },
    "any, SparseMatrix": function(y, C) {
      return l(C, y, r, !0);
    },
    "any, DenseMatrix": function(y, C) {
      return c(C, y, r, !0);
    },
    "Array, any": function(y, C) {
      return c(t(y), C, r, !1).valueOf();
    },
    "any, Array": function(y, C) {
      return c(t(C), y, r, !0).valueOf();
    },
    "any, any": r,
    "any, any, ...any": n.referToSelf((F) => (y, C, b) => {
      for (var E = F(y, C), S = 0; S < b.length; S++)
        E = F(E, b[S]);
      return E;
    })
  });
}), Sn = "sign", If = ["typed", "BigNumber", "Fraction", "complex"], Of = /* @__PURE__ */ ee(Sn, If, (e) => {
  var {
    typed: n,
    BigNumber: t,
    complex: i,
    Fraction: r
  } = e;
  return n(Sn, {
    number: Zt,
    Complex: function(o) {
      return o.im === 0 ? i(Zt(o.re)) : o.sign();
    },
    BigNumber: function(o) {
      return new t(o.cmp(0));
    },
    Fraction: function(o) {
      return new r(o.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": n.referToSelf((a) => (o) => er(o, a)),
    Unit: n.referToSelf((a) => (o) => {
      if (!o._isDerived() && o.units[0].unit.offset !== 0)
        throw new TypeError("sign is ambiguous for units with offset");
      return n.find(a, o.valueType())(o.value);
    })
  });
}), Lf = "sqrt", $f = ["config", "typed", "Complex"], qf = /* @__PURE__ */ ee(Lf, $f, (e) => {
  var {
    config: n,
    typed: t,
    Complex: i
  } = e;
  return t("sqrt", {
    number: r,
    Complex: function(o) {
      return o.sqrt();
    },
    BigNumber: function(o) {
      return !o.isNegative() || n.predictable ? o.sqrt() : r(o.toNumber());
    },
    Unit: function(o) {
      return o.pow(0.5);
    }
  });
  function r(a) {
    return isNaN(a) ? NaN : a >= 0 || n.predictable ? Math.sqrt(a) : new i(a, 0).sqrt();
  }
}), xn = "subtract", Pf = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Rf = /* @__PURE__ */ ee(xn, Pf, (e) => {
  var {
    typed: n,
    matrix: t,
    equalScalar: i,
    subtractScalar: r,
    unaryMinus: a,
    DenseMatrix: o,
    concat: l
  } = e, c = ua({
    typed: n
  }), h = Rr({
    typed: n
  }), s = vf({
    typed: n,
    equalScalar: i
  }), u = oa({
    typed: n,
    DenseMatrix: o
  }), f = Pr({
    typed: n,
    DenseMatrix: o
  }), d = Mr({
    typed: n,
    matrix: t,
    concat: l
  });
  return n(xn, {
    "any, any": r
  }, d({
    elop: r,
    SS: s,
    DS: c,
    SD: h,
    Ss: f,
    sS: u
  }));
}), Uf = "matAlgo07xSSf", Vf = ["typed", "DenseMatrix"], Kr = /* @__PURE__ */ ee(Uf, Vf, (e) => {
  var {
    typed: n,
    DenseMatrix: t
  } = e;
  return function(a, o, l) {
    var c = a._size, h = a._datatype, s = o._size, u = o._datatype;
    if (c.length !== s.length)
      throw new Fe(c.length, s.length);
    if (c[0] !== s[0] || c[1] !== s[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + s + ")");
    var f = c[0], d = c[1], D, v = 0, m = l;
    typeof h == "string" && h === u && (D = h, v = n.convert(0, D), m = n.find(l, [D, D]));
    var p, w, g = [];
    for (p = 0; p < f; p++)
      g[p] = [];
    var A = [], F = [], y = [], C = [];
    for (w = 0; w < d; w++) {
      var b = w + 1;
      for (i(a, w, y, A, b), i(o, w, C, F, b), p = 0; p < f; p++) {
        var E = y[p] === b ? A[p] : v, S = C[p] === b ? F[p] : v;
        g[p][w] = m(E, S);
      }
    }
    return new t({
      data: g,
      size: [f, d],
      datatype: D
    });
  };
  function i(r, a, o, l, c) {
    for (var h = r._values, s = r._index, u = r._ptr, f = u[a], d = u[a + 1]; f < d; f++) {
      var D = s[f];
      o[D] = c, l[D] = h[f];
    }
  }
}), Nn = "conj", Zf = ["typed"], Gf = /* @__PURE__ */ ee(Nn, Zf, (e) => {
  var {
    typed: n
  } = e;
  return n(Nn, {
    "number | BigNumber | Fraction": (t) => t,
    Complex: (t) => t.conjugate(),
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), Bn = "im", Yf = ["typed"], Jf = /* @__PURE__ */ ee(Bn, Yf, (e) => {
  var {
    typed: n
  } = e;
  return n(Bn, {
    number: () => 0,
    "BigNumber | Fraction": (t) => t.mul(0),
    Complex: (t) => t.im,
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), _n = "re", Qf = ["typed"], Xf = /* @__PURE__ */ ee(_n, Qf, (e) => {
  var {
    typed: n
  } = e;
  return n(_n, {
    "number | BigNumber | Fraction": (t) => t,
    Complex: (t) => t.re,
    "Array | Matrix": n.referToSelf((t) => (i) => er(i, t))
  });
}), zn = "concat", Hf = ["typed", "matrix", "isInteger"], Kf = /* @__PURE__ */ ee(zn, Hf, (e) => {
  var {
    typed: n,
    matrix: t,
    isInteger: i
  } = e;
  return n(zn, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function(a) {
      var o, l = a.length, c = -1, h, s = !1, u = [];
      for (o = 0; o < l; o++) {
        var f = a[o];
        if (_e(f) && (s = !0), Le(f) || Re(f)) {
          if (o !== l - 1)
            throw new Error("Dimension must be specified as last argument");
          if (h = c, c = f.valueOf(), !i(c))
            throw new TypeError("Integer number expected for dimension");
          if (c < 0 || o > 0 && c > h)
            throw new br(c, h + 1);
        } else {
          var d = Ce(f).valueOf(), D = $e(d);
          if (u[o] = d, h = c, c = D.length - 1, o > 0 && c !== h)
            throw new Fe(h + 1, c + 1);
        }
      }
      if (u.length === 0)
        throw new SyntaxError("At least one matrix expected");
      for (var v = u.shift(); u.length; )
        v = Ni(v, u.shift(), c);
      return s ? t(v) : v;
    },
    "...string": function(a) {
      return a.join("");
    }
  });
}), Tn = "column", Wf = ["typed", "Index", "matrix", "range"], kf = /* @__PURE__ */ ee(Tn, Wf, (e) => {
  var {
    typed: n,
    Index: t,
    matrix: i,
    range: r
  } = e;
  return n(Tn, {
    "Matrix, number": a,
    "Array, number": function(l, c) {
      return a(i(Ce(l)), c).valueOf();
    }
  });
  function a(o, l) {
    if (o.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Be(l, o.size()[1]);
    var c = r(0, o.size()[0]), h = new t(c, l), s = o.subset(h);
    return _e(s) ? s : i([[s]]);
  }
}), In = "diag", jf = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], ec = /* @__PURE__ */ ee(In, jf, (e) => {
  var {
    typed: n,
    matrix: t,
    DenseMatrix: i,
    SparseMatrix: r
  } = e;
  return n(In, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function(h) {
      return a(h, 0, $e(h), null);
    },
    "Array, number": function(h, s) {
      return a(h, s, $e(h), null);
    },
    "Array, BigNumber": function(h, s) {
      return a(h, s.toNumber(), $e(h), null);
    },
    "Array, string": function(h, s) {
      return a(h, 0, $e(h), s);
    },
    "Array, number, string": function(h, s, u) {
      return a(h, s, $e(h), u);
    },
    "Array, BigNumber, string": function(h, s, u) {
      return a(h, s.toNumber(), $e(h), u);
    },
    Matrix: function(h) {
      return a(h, 0, h.size(), h.storage());
    },
    "Matrix, number": function(h, s) {
      return a(h, s, h.size(), h.storage());
    },
    "Matrix, BigNumber": function(h, s) {
      return a(h, s.toNumber(), h.size(), h.storage());
    },
    "Matrix, string": function(h, s) {
      return a(h, 0, h.size(), s);
    },
    "Matrix, number, string": function(h, s, u) {
      return a(h, s, h.size(), u);
    },
    "Matrix, BigNumber, string": function(h, s, u) {
      return a(h, s.toNumber(), h.size(), u);
    }
  });
  function a(c, h, s, u) {
    if (!ze(h))
      throw new TypeError("Second parameter in function diag must be an integer");
    var f = h > 0 ? h : 0, d = h < 0 ? -h : 0;
    switch (s.length) {
      case 1:
        return o(c, h, u, s[0], d, f);
      case 2:
        return l(c, h, u, s, d, f);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function o(c, h, s, u, f, d) {
    var D = [u + f, u + d];
    if (s && s !== "sparse" && s !== "dense")
      throw new TypeError("Unknown matrix type ".concat(s, '"'));
    var v = s === "sparse" ? r.diagonal(D, c, h) : i.diagonal(D, c, h);
    return s !== null ? v : v.valueOf();
  }
  function l(c, h, s, u, f, d) {
    if (_e(c)) {
      var D = c.diagonal(h);
      return s !== null ? s !== D.storage() ? t(D, s) : D : D.valueOf();
    }
    for (var v = Math.min(u[0] - f, u[1] - d), m = [], p = 0; p < v; p++)
      m[p] = c[p + f][p + d];
    return s !== null ? t(m) : m;
  }
}), On = "flatten", rc = ["typed", "matrix"], tc = /* @__PURE__ */ ee(On, rc, (e) => {
  var {
    typed: n,
    matrix: t
  } = e;
  return n(On, {
    Array: function(r) {
      return $t(r);
    },
    Matrix: function(r) {
      var a = $t(r.toArray());
      return t(a);
    }
  });
}), Ln = "getMatrixDataType", nc = ["typed"], ic = /* @__PURE__ */ ee(Ln, nc, (e) => {
  var {
    typed: n
  } = e;
  return n(Ln, {
    Array: function(i) {
      return Jr(i, lr);
    },
    Matrix: function(i) {
      return i.getDataType();
    }
  });
}), $n = "identity", ac = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], uc = /* @__PURE__ */ ee($n, ac, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    BigNumber: r,
    DenseMatrix: a,
    SparseMatrix: o
  } = e;
  return n($n, {
    "": function() {
      return t.matrix === "Matrix" ? i([]) : [];
    },
    string: function(s) {
      return i(s);
    },
    "number | BigNumber": function(s) {
      return c(s, s, t.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function(s, u) {
      return c(s, s, u);
    },
    "number | BigNumber, number | BigNumber": function(s, u) {
      return c(s, u, t.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function(s, u, f) {
      return c(s, u, f);
    },
    Array: function(s) {
      return l(s);
    },
    "Array, string": function(s, u) {
      return l(s, u);
    },
    Matrix: function(s) {
      return l(s.valueOf(), s.storage());
    },
    "Matrix, string": function(s, u) {
      return l(s.valueOf(), u);
    }
  });
  function l(h, s) {
    switch (h.length) {
      case 0:
        return s ? i(s) : [];
      case 1:
        return c(h[0], h[0], s);
      case 2:
        return c(h[0], h[1], s);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function c(h, s, u) {
    var f = Re(h) || Re(s) ? r : null;
    if (Re(h) && (h = h.toNumber()), Re(s) && (s = s.toNumber()), !ze(h) || h < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!ze(s) || s < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var d = f ? new r(1) : 1, D = f ? new f(0) : 0, v = [h, s];
    if (u) {
      if (u === "sparse")
        return o.diagonal(v, d, 0, D);
      if (u === "dense")
        return a.diagonal(v, d, 0, D);
      throw new TypeError('Unknown matrix type "'.concat(u, '"'));
    }
    for (var m = ft([], v, D), p = h < s ? h : s, w = 0; w < p; w++)
      m[w][w] = d;
    return m;
  }
});
function sa() {
  throw new Error('No "bignumber" implementation available');
}
function oc() {
  throw new Error('No "fraction" implementation available');
}
function fa() {
  throw new Error('No "matrix" implementation available');
}
var qn = "range", sc = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], fc = /* @__PURE__ */ ee(qn, sc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    bignumber: r,
    smaller: a,
    smallerEq: o,
    larger: l,
    largerEq: c,
    add: h,
    isPositive: s
  } = e;
  return n(qn, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: f,
    "string, boolean": f,
    "number, number": function(m, p) {
      return u(d(m, p, 1, !1));
    },
    "number, number, number": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "number, number, boolean": function(m, p, w) {
      return u(d(m, p, 1, w));
    },
    "number, number, number, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    },
    "BigNumber, BigNumber": function(m, p) {
      var w = m.constructor;
      return u(d(m, p, new w(1), !1));
    },
    "BigNumber, BigNumber, BigNumber": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "BigNumber, BigNumber, boolean": function(m, p, w) {
      var g = m.constructor;
      return u(d(m, p, new g(1), w));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    },
    "Unit, Unit, Unit": function(m, p, w) {
      return u(d(m, p, w, !1));
    },
    "Unit, Unit, Unit, boolean": function(m, p, w, g) {
      return u(d(m, p, w, g));
    }
  });
  function u(v) {
    return t.matrix === "Matrix" ? i ? i(v) : fa() : v;
  }
  function f(v, m) {
    var p = D(v);
    if (!p)
      throw new SyntaxError('String "' + v + '" is no valid range');
    return t.number === "BigNumber" ? (r === void 0 && sa(), u(d(r(p.start), r(p.end), r(p.step)))) : u(d(p.start, p.end, p.step, m));
  }
  function d(v, m, p, w) {
    for (var g = [], A = s(p) ? w ? o : a : w ? c : l, F = v; A(F, m); )
      g.push(F), F = h(F, p);
    return g;
  }
  function D(v) {
    var m = v.split(":"), p = m.map(function(g) {
      return Number(g);
    }), w = p.some(function(g) {
      return isNaN(g);
    });
    if (w)
      return null;
    switch (p.length) {
      case 2:
        return {
          start: p[0],
          end: p[1],
          step: 1
        };
      case 3:
        return {
          start: p[0],
          end: p[2],
          step: p[1]
        };
      default:
        return null;
    }
  }
}), Pn = "reshape", cc = ["typed", "isInteger", "matrix"], lc = /* @__PURE__ */ ee(Pn, cc, (e) => {
  var {
    typed: n,
    isInteger: t
  } = e;
  return n(Pn, {
    "Matrix, Array": function(r, a) {
      return r.reshape(a, !0);
    },
    "Array, Array": function(r, a) {
      return a.forEach(function(o) {
        if (!t(o))
          throw new TypeError("Invalid size for dimension: " + o);
      }), Qt(r, a);
    }
  });
}), Rn = "size", hc = ["typed", "config", "?matrix"], vc = /* @__PURE__ */ ee(Rn, hc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i
  } = e;
  return n(Rn, {
    Matrix: function(a) {
      return a.create(a.size());
    },
    Array: $e,
    string: function(a) {
      return t.matrix === "Array" ? [a.length] : i([a.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function(a) {
      return t.matrix === "Array" ? [] : i ? i([]) : fa();
    }
  });
}), Un = "squeeze", dc = ["typed", "matrix"], pc = /* @__PURE__ */ ee(Un, dc, (e) => {
  var {
    typed: n,
    matrix: t
  } = e;
  return n(Un, {
    Array: function(r) {
      return ln(Ce(r));
    },
    Matrix: function(r) {
      var a = ln(r.toArray());
      return Array.isArray(a) ? t(a) : a;
    },
    any: function(r) {
      return Ce(r);
    }
  });
}), Vn = "subset", mc = ["typed", "matrix", "zeros", "add"], gc = /* @__PURE__ */ ee(Vn, mc, (e) => {
  var {
    typed: n,
    matrix: t,
    zeros: i,
    add: r
  } = e;
  return n(Vn, {
    // get subset
    "Matrix, Index": function(l, c) {
      return Lr(c) ? t() : (st(l, c), l.subset(c));
    },
    "Array, Index": n.referTo("Matrix, Index", function(o) {
      return function(l, c) {
        var h = o(t(l), c);
        return c.isScalar() ? h : h.valueOf();
      };
    }),
    "Object, Index": yc,
    "string, Index": Dc,
    // set subset
    "Matrix, Index, any, any": function(l, c, h, s) {
      return Lr(c) ? l : (st(l, c), l.clone().subset(c, a(h, c), s));
    },
    "Array, Index, any, any": n.referTo("Matrix, Index, any, any", function(o) {
      return function(l, c, h, s) {
        var u = o(t(l), c, h, s);
        return u.isMatrix ? u.valueOf() : u;
      };
    }),
    "Array, Index, any": n.referTo("Matrix, Index, any, any", function(o) {
      return function(l, c, h) {
        return o(t(l), c, h, void 0).valueOf();
      };
    }),
    "Matrix, Index, any": n.referTo("Matrix, Index, any, any", function(o) {
      return function(l, c, h) {
        return o(l, c, h, void 0);
      };
    }),
    "string, Index, string": Zn,
    "string, Index, string, string": Zn,
    "Object, Index, any": wc
  });
  function a(o, l) {
    if (typeof o == "string")
      throw new Error("can't boradcast a string");
    if (l._isScalar)
      return o;
    var c = l.size();
    if (c.every((h) => h > 0))
      try {
        return r(o, i(c));
      } catch {
        return o;
      }
    else
      return o;
  }
});
function Dc(e, n) {
  if (!wt(n))
    throw new TypeError("Index expected");
  if (Lr(n))
    return "";
  if (st(Array.from(e), n), n.size().length !== 1)
    throw new Fe(n.size().length, 1);
  var t = e.length;
  Be(n.min()[0], t), Be(n.max()[0], t);
  var i = n.dimension(0), r = "";
  return i.forEach(function(a) {
    r += e.charAt(a);
  }), r;
}
function Zn(e, n, t, i) {
  if (!n || n.isIndex !== !0)
    throw new TypeError("Index expected");
  if (Lr(n))
    return e;
  if (st(Array.from(e), n), n.size().length !== 1)
    throw new Fe(n.size().length, 1);
  if (i !== void 0) {
    if (typeof i != "string" || i.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    i = " ";
  var r = n.dimension(0), a = r.size()[0];
  if (a !== t.length)
    throw new Fe(r.size()[0], t.length);
  var o = e.length;
  Be(n.min()[0]), Be(n.max()[0]);
  for (var l = [], c = 0; c < o; c++)
    l[c] = e.charAt(c);
  if (r.forEach(function(u, f) {
    l[u] = t.charAt(f[0]);
  }), l.length > o)
    for (var h = o - 1, s = l.length; h < s; h++)
      l[h] || (l[h] = i);
  return l.join("");
}
function yc(e, n) {
  if (!Lr(n)) {
    if (n.size().length !== 1)
      throw new Fe(n.size(), 1);
    var t = n.dimension(0);
    if (typeof t != "string")
      throw new TypeError("String expected as index to retrieve an object property");
    return Bi(e, t);
  }
}
function wc(e, n, t) {
  if (Lr(n))
    return e;
  if (n.size().length !== 1)
    throw new Fe(n.size(), 1);
  var i = n.dimension(0);
  if (typeof i != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var r = Ce(e);
  return _i(r, i, t), r;
}
var Gn = "transpose", Ac = ["typed", "matrix"], Ec = /* @__PURE__ */ ee(Gn, Ac, (e) => {
  var {
    typed: n,
    matrix: t
  } = e;
  return n(Gn, {
    Array: (o) => i(t(o)).valueOf(),
    Matrix: i,
    any: Ce
    // scalars
  });
  function i(o) {
    var l = o.size(), c;
    switch (l.length) {
      case 1:
        c = o.clone();
        break;
      case 2:
        {
          var h = l[0], s = l[1];
          if (s === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Oe(l) + ")");
          switch (o.storage()) {
            case "dense":
              c = r(o, h, s);
              break;
            case "sparse":
              c = a(o, h, s);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Oe(l) + ")");
    }
    return c;
  }
  function r(o, l, c) {
    for (var h = o._data, s = [], u, f = 0; f < c; f++) {
      u = s[f] = [];
      for (var d = 0; d < l; d++)
        u[d] = Ce(h[d][f]);
    }
    return o.createDenseMatrix({
      data: s,
      size: [c, l],
      datatype: o._datatype
    });
  }
  function a(o, l, c) {
    for (var h = o._values, s = o._index, u = o._ptr, f = h ? [] : void 0, d = [], D = [], v = [], m = 0; m < l; m++)
      v[m] = 0;
    var p, w, g;
    for (p = 0, w = s.length; p < w; p++)
      v[s[p]]++;
    for (var A = 0, F = 0; F < l; F++)
      D.push(A), A += v[F], v[F] = D[F];
    for (D.push(A), g = 0; g < c; g++)
      for (var y = u[g], C = u[g + 1], b = y; b < C; b++) {
        var E = v[s[b]]++;
        d[E] = g, h && (f[E] = Ce(h[b]));
      }
    return o.createSparseMatrix({
      values: f,
      index: d,
      ptr: D,
      size: [c, l],
      datatype: o._datatype
    });
  }
}), Yn = "ctranspose", Fc = ["typed", "transpose", "conj"], Cc = /* @__PURE__ */ ee(Yn, Fc, (e) => {
  var {
    typed: n,
    transpose: t,
    conj: i
  } = e;
  return n(Yn, {
    any: function(a) {
      return i(t(a));
    }
  });
}), Jn = "zeros", bc = ["typed", "config", "matrix", "BigNumber"], Mc = /* @__PURE__ */ ee(Jn, bc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    BigNumber: r
  } = e;
  return n(Jn, {
    "": function() {
      return t.matrix === "Array" ? a([]) : a([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function(h) {
      var s = h[h.length - 1];
      if (typeof s == "string") {
        var u = h.pop();
        return a(h, u);
      } else
        return t.matrix === "Array" ? a(h) : a(h, "default");
    },
    Array: a,
    Matrix: function(h) {
      var s = h.storage();
      return a(h.valueOf(), s);
    },
    "Array | Matrix, string": function(h, s) {
      return a(h.valueOf(), s);
    }
  });
  function a(c, h) {
    var s = o(c), u = s ? new r(0) : 0;
    if (l(c), h) {
      var f = i(h);
      return c.length > 0 ? f.resize(c, u) : f;
    } else {
      var d = [];
      return c.length > 0 ? ft(d, c, u) : d;
    }
  }
  function o(c) {
    var h = !1;
    return c.forEach(function(s, u, f) {
      Re(s) && (h = !0, f[u] = s.toNumber());
    }), h;
  }
  function l(c) {
    c.forEach(function(h) {
      if (typeof h != "number" || !ze(h) || h < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), Sc = "numeric", xc = ["number", "?bignumber", "?fraction"], Nc = /* @__PURE__ */ ee(Sc, xc, (e) => {
  var {
    number: n,
    bignumber: t,
    fraction: i
  } = e, r = {
    string: !0,
    number: !0,
    BigNumber: !0,
    Fraction: !0
  }, a = {
    number: (o) => n(o),
    BigNumber: t ? (o) => t(o) : sa,
    Fraction: i ? (o) => i(o) : oc
  };
  return function(l) {
    var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", h = arguments.length > 2 ? arguments[2] : void 0;
    if (h !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var s = lr(l);
    if (!(s in r))
      throw new TypeError("Cannot convert " + l + ' of type "' + s + '"; valid input types are ' + Object.keys(r).join(", "));
    if (!(c in a))
      throw new TypeError("Cannot convert " + l + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
    return c === s ? l : a[c](l);
  };
}), Qn = "divideScalar", Bc = ["typed", "numeric"], _c = /* @__PURE__ */ ee(Qn, Bc, (e) => {
  var {
    typed: n,
    numeric: t
  } = e;
  return n(Qn, {
    "number, number": function(r, a) {
      return r / a;
    },
    "Complex, Complex": function(r, a) {
      return r.div(a);
    },
    "BigNumber, BigNumber": function(r, a) {
      return r.div(a);
    },
    "Fraction, Fraction": function(r, a) {
      return r.div(a);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (i, r) => i.divide(r),
    "number | Fraction | Complex | BigNumber, Unit": (i, r) => r.divideInto(i)
  });
}), Xn = "pow", zc = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], Tc = /* @__PURE__ */ ee(Xn, zc, (e) => {
  var {
    typed: n,
    config: t,
    identity: i,
    multiply: r,
    matrix: a,
    inv: o,
    number: l,
    fraction: c,
    Complex: h
  } = e;
  return n(Xn, {
    "number, number": s,
    "Complex, Complex": function(D, v) {
      return D.pow(v);
    },
    "BigNumber, BigNumber": function(D, v) {
      return v.isInteger() || D >= 0 || t.predictable ? D.pow(v) : new h(D.toNumber(), 0).pow(v.toNumber(), 0);
    },
    "Fraction, Fraction": function(D, v) {
      var m = D.pow(v);
      if (m != null)
        return m;
      if (t.predictable)
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      return s(D.valueOf(), v.valueOf());
    },
    "Array, number": u,
    "Array, BigNumber": function(D, v) {
      return u(D, v.toNumber());
    },
    "Matrix, number": f,
    "Matrix, BigNumber": function(D, v) {
      return f(D, v.toNumber());
    },
    "Unit, number | BigNumber": function(D, v) {
      return D.pow(v);
    }
  });
  function s(d, D) {
    if (t.predictable && !ze(D) && d < 0)
      try {
        var v = c(D), m = l(v);
        if ((D === m || Math.abs((D - m) / D) < 1e-14) && v.d % 2 === 1)
          return (v.n % 2 === 0 ? 1 : -1) * Math.pow(-d, D);
      } catch {
      }
    return t.predictable && (d < -1 && D === 1 / 0 || d > -1 && d < 0 && D === -1 / 0) ? NaN : ze(D) || d >= 0 || t.predictable ? ra(d, D) : d * d < 1 && D === 1 / 0 || d * d > 1 && D === -1 / 0 ? 0 : new h(d, 0).pow(D, 0);
  }
  function u(d, D) {
    if (!ze(D))
      throw new TypeError("For A^b, b must be an integer (value is " + D + ")");
    var v = $e(d);
    if (v.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + v.length + " dimensions)");
    if (v[0] !== v[1])
      throw new Error("For A^b, A must be square (size is " + v[0] + "x" + v[1] + ")");
    if (D < 0)
      try {
        return u(o(d), -D);
      } catch (w) {
        throw w.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + D + ")") : w;
      }
    for (var m = i(v[0]).valueOf(), p = d; D >= 1; )
      (D & 1) === 1 && (m = r(p, m)), D >>= 1, p = r(p, p);
    return m;
  }
  function f(d, D) {
    return a(u(d.valueOf(), D));
  }
});
function St(e) {
  var {
    DenseMatrix: n
  } = e;
  return function(i, r, a) {
    var o = i.size();
    if (o.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Oe(o) + ")");
    var l = o[0], c = o[1];
    if (l !== c)
      throw new RangeError("Matrix must be square (size: " + Oe(o) + ")");
    var h = [];
    if (_e(r)) {
      var s = r.size(), u = r._data;
      if (s.length === 1) {
        if (s[0] !== l)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var f = 0; f < l; f++)
          h[f] = [u[f]];
        return new n({
          data: h,
          size: [l, 1],
          datatype: r._datatype
        });
      }
      if (s.length === 2) {
        if (s[0] !== l || s[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (mi(r)) {
          if (a) {
            h = [];
            for (var d = 0; d < l; d++)
              h[d] = [u[d][0]];
            return new n({
              data: h,
              size: [l, 1],
              datatype: r._datatype
            });
          }
          return r;
        }
        if (gi(r)) {
          for (var D = 0; D < l; D++)
            h[D] = [0];
          for (var v = r._values, m = r._index, p = r._ptr, w = p[1], g = p[0]; g < w; g++) {
            var A = m[g];
            h[A][0] = v[g];
          }
          return new n({
            data: h,
            size: [l, 1],
            datatype: r._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Me(r)) {
      var F = $e(r);
      if (F.length === 1) {
        if (F[0] !== l)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var y = 0; y < l; y++)
          h[y] = [r[y]];
        return new n({
          data: h,
          size: [l, 1]
        });
      }
      if (F.length === 2) {
        if (F[0] !== l || F[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var C = 0; C < l; C++)
          h[C] = [r[C][0]];
        return new n({
          data: h,
          size: [l, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Hn = "lsolve", Ic = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Oc = /* @__PURE__ */ ee(Hn, Ic, (e) => {
  var {
    typed: n,
    matrix: t,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: l
  } = e, c = St({
    DenseMatrix: l
  });
  return n(Hn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return h(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = t(f), v = h(D, d);
      return v.valueOf();
    }
  });
  function h(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], v = u._size[1], m = [], p = u._data, w = 0; w < v; w++) {
      var g = d[w][0] || 0, A = void 0;
      if (o(g, 0))
        A = 0;
      else {
        var F = p[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = i(g, F);
        for (var y = w + 1; y < D; y++)
          d[y] = [a(d[y][0] || 0, r(A, p[y][w]))];
      }
      m[w] = [A];
    }
    return new l({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], v = u._size[1], m = u._values, p = u._index, w = u._ptr, g = [], A = 0; A < v; A++) {
      var F = d[A][0] || 0;
      if (o(F, 0))
        g[A] = [0];
      else {
        for (var y = 0, C = [], b = [], E = w[A], S = w[A + 1], M = E; M < S; M++) {
          var x = p[M];
          x === A ? y = m[M] : x > A && (C.push(m[M]), b.push(x));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var I = i(F, y), T = 0, O = b.length; T < O; T++) {
          var B = b[T];
          d[B] = [a(d[B][0] || 0, r(I, C[T]))];
        }
        g[A] = [I];
      }
    }
    return new l({
      data: g,
      size: [D, 1]
    });
  }
}), Kn = "usolve", Lc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], $c = /* @__PURE__ */ ee(Kn, Lc, (e) => {
  var {
    typed: n,
    matrix: t,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: l
  } = e, c = St({
    DenseMatrix: l
  });
  return n(Kn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return h(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = t(f), v = h(D, d);
      return v.valueOf();
    }
  });
  function h(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], v = u._size[1], m = [], p = u._data, w = v - 1; w >= 0; w--) {
      var g = d[w][0] || 0, A = void 0;
      if (o(g, 0))
        A = 0;
      else {
        var F = p[w][w];
        if (o(F, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        A = i(g, F);
        for (var y = w - 1; y >= 0; y--)
          d[y] = [a(d[y][0] || 0, r(A, p[y][w]))];
      }
      m[w] = [A];
    }
    return new l({
      data: m,
      size: [D, 1]
    });
  }
  function s(u, f) {
    f = c(u, f, !0);
    for (var d = f._data, D = u._size[0], v = u._size[1], m = u._values, p = u._index, w = u._ptr, g = [], A = v - 1; A >= 0; A--) {
      var F = d[A][0] || 0;
      if (o(F, 0))
        g[A] = [0];
      else {
        for (var y = 0, C = [], b = [], E = w[A], S = w[A + 1], M = S - 1; M >= E; M--) {
          var x = p[M];
          x === A ? y = m[M] : x < A && (C.push(m[M]), b.push(x));
        }
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var I = i(F, y), T = 0, O = b.length; T < O; T++) {
          var B = b[T];
          d[B] = [a(d[B][0], r(I, C[T]))];
        }
        g[A] = [I];
      }
    }
    return new l({
      data: g,
      size: [D, 1]
    });
  }
}), Wn = "usolveAll", qc = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Pc = /* @__PURE__ */ ee(Wn, qc, (e) => {
  var {
    typed: n,
    matrix: t,
    divideScalar: i,
    multiplyScalar: r,
    subtractScalar: a,
    equalScalar: o,
    DenseMatrix: l
  } = e, c = St({
    DenseMatrix: l
  });
  return n(Wn, {
    "SparseMatrix, Array | Matrix": function(f, d) {
      return s(f, d);
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      return h(f, d);
    },
    "Array, Array | Matrix": function(f, d) {
      var D = t(f), v = h(D, d);
      return v.map((m) => m.valueOf());
    }
  });
  function h(u, f) {
    for (var d = [c(u, f, !0)._data.map((b) => b[0])], D = u._data, v = u._size[0], m = u._size[1], p = m - 1; p >= 0; p--)
      for (var w = d.length, g = 0; g < w; g++) {
        var A = d[g];
        if (o(D[p][p], 0))
          if (o(A[p], 0)) {
            if (g === 0) {
              var y = [...A];
              y[p] = 1;
              for (var C = p - 1; C >= 0; C--)
                y[C] = a(y[C], D[C][p]);
              d.push(y);
            }
          } else {
            if (g === 0)
              return [];
            d.splice(g, 1), g -= 1, w -= 1;
          }
        else {
          A[p] = i(A[p], D[p][p]);
          for (var F = p - 1; F >= 0; F--)
            A[F] = a(A[F], r(A[p], D[F][p]));
        }
      }
    return d.map((b) => new l({
      data: b.map((E) => [E]),
      size: [v, 1]
    }));
  }
  function s(u, f) {
    for (var d = [c(u, f, !0)._data.map((K) => K[0])], D = u._size[0], v = u._size[1], m = u._values, p = u._index, w = u._ptr, g = v - 1; g >= 0; g--)
      for (var A = d.length, F = 0; F < A; F++) {
        for (var y = d[F], C = [], b = [], E = w[g], S = w[g + 1], M = 0, x = S - 1; x >= E; x--) {
          var I = p[x];
          I === g ? M = m[x] : I < g && (C.push(m[x]), b.push(I));
        }
        if (o(M, 0))
          if (o(y[g], 0)) {
            if (F === 0) {
              var G = [...y];
              G[g] = 1;
              for (var $ = 0, z = b.length; $ < z; $++) {
                var V = b[$];
                G[V] = a(G[V], C[$]);
              }
              d.push(G);
            }
          } else {
            if (F === 0)
              return [];
            d.splice(F, 1), F -= 1, A -= 1;
          }
        else {
          y[g] = i(y[g], M);
          for (var T = 0, O = b.length; T < O; T++) {
            var B = b[T];
            y[B] = a(y[B], r(y[g], C[T]));
          }
        }
      }
    return d.map((K) => new l({
      data: K.map((P) => [P]),
      size: [D, 1]
    }));
  }
}), pt = "equal", Rc = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Uc = /* @__PURE__ */ ee(pt, Rc, (e) => {
  var {
    typed: n,
    matrix: t,
    equalScalar: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: n
  }), l = Kr({
    typed: n,
    DenseMatrix: r
  }), c = Pr({
    typed: n,
    DenseMatrix: r
  }), h = Mr({
    typed: n,
    matrix: t,
    concat: a
  });
  return n(pt, Vc({
    typed: n,
    equalScalar: i
  }), h({
    elop: i,
    SS: l,
    DS: o,
    Ss: c
  }));
}), Vc = ee(pt, ["typed", "equalScalar"], (e) => {
  var {
    typed: n,
    equalScalar: t
  } = e;
  return n(pt, {
    "any, any": function(r, a) {
      return r === null ? a === null : a === null ? r === null : r === void 0 ? a === void 0 : a === void 0 ? r === void 0 : t(r, a);
    }
  });
}), mt = "smaller", Zc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Gc = /* @__PURE__ */ ee(mt, Zc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: n
  }), l = Kr({
    typed: n,
    DenseMatrix: r
  }), c = Pr({
    typed: n,
    DenseMatrix: r
  }), h = Mr({
    typed: n,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: n
  });
  return n(mt, Yc({
    typed: n,
    config: t
  }), {
    "boolean, boolean": (u, f) => u < f,
    "BigNumber, BigNumber": function(f, d) {
      return f.lt(d) && !Xr(f, d, t.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === -1,
    "Complex, Complex": function(f, d) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, h({
    SS: l,
    DS: o,
    Ss: c
  }));
}), Yc = /* @__PURE__ */ ee(mt, ["typed", "config"], (e) => {
  var {
    typed: n,
    config: t
  } = e;
  return n(mt, {
    "number, number": function(r, a) {
      return r < a && !yr(r, a, t.epsilon);
    }
  });
}), gt = "smallerEq", Jc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Qc = /* @__PURE__ */ ee(gt, Jc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: n
  }), l = Kr({
    typed: n,
    DenseMatrix: r
  }), c = Pr({
    typed: n,
    DenseMatrix: r
  }), h = Mr({
    typed: n,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: n
  });
  return n(gt, Xc({
    typed: n,
    config: t
  }), {
    "boolean, boolean": (u, f) => u <= f,
    "BigNumber, BigNumber": function(f, d) {
      return f.lte(d) || Xr(f, d, t.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, h({
    SS: l,
    DS: o,
    Ss: c
  }));
}), Xc = /* @__PURE__ */ ee(gt, ["typed", "config"], (e) => {
  var {
    typed: n,
    config: t
  } = e;
  return n(gt, {
    "number, number": function(r, a) {
      return r <= a || yr(r, a, t.epsilon);
    }
  });
}), Dt = "larger", Hc = ["typed", "config", "matrix", "DenseMatrix", "concat"], Kc = /* @__PURE__ */ ee(Dt, Hc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: n
  }), l = Kr({
    typed: n,
    DenseMatrix: r
  }), c = Pr({
    typed: n,
    DenseMatrix: r
  }), h = Mr({
    typed: n,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: n
  });
  return n(Dt, Wc({
    typed: n,
    config: t
  }), {
    "boolean, boolean": (u, f) => u > f,
    "BigNumber, BigNumber": function(f, d) {
      return f.gt(d) && !Xr(f, d, t.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) === 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, h({
    SS: l,
    DS: o,
    Ss: c
  }));
}), Wc = /* @__PURE__ */ ee(Dt, ["typed", "config"], (e) => {
  var {
    typed: n,
    config: t
  } = e;
  return n(Dt, {
    "number, number": function(r, a) {
      return r > a && !yr(r, a, t.epsilon);
    }
  });
}), yt = "largerEq", kc = ["typed", "config", "matrix", "DenseMatrix", "concat"], jc = /* @__PURE__ */ ee(yt, kc, (e) => {
  var {
    typed: n,
    config: t,
    matrix: i,
    DenseMatrix: r,
    concat: a
  } = e, o = Rr({
    typed: n
  }), l = Kr({
    typed: n,
    DenseMatrix: r
  }), c = Pr({
    typed: n,
    DenseMatrix: r
  }), h = Mr({
    typed: n,
    matrix: i,
    concat: a
  }), s = Hr({
    typed: n
  });
  return n(yt, el({
    typed: n,
    config: t
  }), {
    "boolean, boolean": (u, f) => u >= f,
    "BigNumber, BigNumber": function(f, d) {
      return f.gte(d) || Xr(f, d, t.epsilon);
    },
    "Fraction, Fraction": (u, f) => u.compare(f) !== -1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, s, h({
    SS: l,
    DS: o,
    Ss: c
  }));
}), el = /* @__PURE__ */ ee(yt, ["typed", "config"], (e) => {
  var {
    typed: n,
    config: t
  } = e;
  return n(yt, {
    "number, number": function(r, a) {
      return r >= a || yr(r, a, t.epsilon);
    }
  });
}), rl = "ImmutableDenseMatrix", tl = ["smaller", "DenseMatrix"], nl = /* @__PURE__ */ ee(rl, tl, (e) => {
  var {
    smaller: n,
    DenseMatrix: t
  } = e;
  function i(r, a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (a && !tr(a))
      throw new Error("Invalid datatype: " + a);
    if (_e(r) || Me(r)) {
      var o = new t(r, a);
      this._data = o._data, this._size = o._size, this._datatype = o._datatype, this._min = null, this._max = null;
    } else if (r && Me(r.data) && Me(r.size))
      this._data = r.data, this._size = r.size, this._datatype = r.datatype, this._min = typeof r.min < "u" ? r.min : null, this._max = typeof r.max < "u" ? r.max : null;
    else {
      if (r)
        throw new TypeError("Unsupported type of data (" + lr(r) + ")");
      this._data = [], this._size = [0], this._datatype = a, this._min = null, this._max = null;
    }
  }
  return i.prototype = new t(), i.prototype.type = "ImmutableDenseMatrix", i.prototype.isImmutableDenseMatrix = !0, i.prototype.subset = function(r) {
    switch (arguments.length) {
      case 1: {
        var a = t.prototype.subset.call(this, r);
        return _e(a) ? new i({
          data: a._data,
          size: a._size,
          datatype: a._datatype
        }) : a;
      }
      case 2:
      case 3:
        throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, i.prototype.set = function() {
    throw new Error("Cannot invoke set on an Immutable Matrix instance");
  }, i.prototype.resize = function() {
    throw new Error("Cannot invoke resize on an Immutable Matrix instance");
  }, i.prototype.reshape = function() {
    throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
  }, i.prototype.clone = function() {
    return new i({
      data: Ce(this._data),
      size: Ce(this._size),
      datatype: this._datatype
    });
  }, i.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, i.fromJSON = function(r) {
    return new i(r);
  }, i.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, i.prototype.min = function() {
    if (this._min === null) {
      var r = null;
      this.forEach(function(a) {
        (r === null || n(a, r)) && (r = a);
      }), this._min = r !== null ? r : void 0;
    }
    return this._min;
  }, i.prototype.max = function() {
    if (this._max === null) {
      var r = null;
      this.forEach(function(a) {
        (r === null || n(r, a)) && (r = a);
      }), this._max = r !== null ? r : void 0;
    }
    return this._max;
  }, i;
}, {
  isClass: !0
}), il = "Index", al = ["ImmutableDenseMatrix", "getMatrixDataType"], ul = /* @__PURE__ */ ee(il, al, (e) => {
  var {
    ImmutableDenseMatrix: n,
    getMatrixDataType: t
  } = e;
  function i(a) {
    if (!(this instanceof i))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = !0;
    for (var o = 0, l = arguments.length; o < l; o++) {
      var c = arguments[o], h = Me(c), s = _e(c), u = null;
      if (Di(c))
        this._dimensions.push(c), this._isScalar = !1;
      else if (h || s) {
        var f = void 0;
        t(c) === "boolean" ? (h && (f = r(kn(c).valueOf())), s && (f = r(kn(c._data).valueOf())), u = c.valueOf().length) : f = r(c.valueOf()), this._dimensions.push(f);
        var d = f.size();
        (d.length !== 1 || d[0] !== 1 || u !== null) && (this._isScalar = !1);
      } else if (typeof c == "number")
        this._dimensions.push(r([c]));
      else if (typeof c == "string")
        this._dimensions.push(c);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(u);
    }
  }
  i.prototype.type = "Index", i.prototype.isIndex = !0;
  function r(a) {
    for (var o = 0, l = a.length; o < l; o++)
      if (typeof a[o] != "number" || !ze(a[o]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new n(a);
  }
  return i.prototype.clone = function() {
    var a = new i();
    return a._dimensions = Ce(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
  }, i.create = function(a) {
    var o = new i();
    return i.apply(o, a), o;
  }, i.prototype.size = function() {
    for (var a = [], o = 0, l = this._dimensions.length; o < l; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? 1 : c.size()[0];
    }
    return a;
  }, i.prototype.max = function() {
    for (var a = [], o = 0, l = this._dimensions.length; o < l; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.max();
    }
    return a;
  }, i.prototype.min = function() {
    for (var a = [], o = 0, l = this._dimensions.length; o < l; o++) {
      var c = this._dimensions[o];
      a[o] = typeof c == "string" ? c : c.min();
    }
    return a;
  }, i.prototype.forEach = function(a) {
    for (var o = 0, l = this._dimensions.length; o < l; o++)
      a(this._dimensions[o], o, this);
  }, i.prototype.dimension = function(a) {
    return this._dimensions[a] || null;
  }, i.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, i.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, i.prototype.isScalar = function() {
    return this._isScalar;
  }, i.prototype.toArray = function() {
    for (var a = [], o = 0, l = this._dimensions.length; o < l; o++) {
      var c = this._dimensions[o];
      a.push(typeof c == "string" ? c : c.toArray());
    }
    return a;
  }, i.prototype.valueOf = i.prototype.toArray, i.prototype.toString = function() {
    for (var a = [], o = 0, l = this._dimensions.length; o < l; o++) {
      var c = this._dimensions[o];
      typeof c == "string" ? a.push(JSON.stringify(c)) : a.push(c.toString());
    }
    return "[" + a.join(", ") + "]";
  }, i.prototype.toJSON = function() {
    return {
      mathjs: "Index",
      dimensions: this._dimensions
    };
  }, i.fromJSON = function(a) {
    return i.create(a.dimensions);
  }, i;
}, {
  isClass: !0
});
function kn(e) {
  var n = [];
  return e.forEach((t, i) => {
    t && n.push(i);
  }), n;
}
var ol = "FibonacciHeap", sl = ["smaller", "larger"], fl = /* @__PURE__ */ ee(ol, sl, (e) => {
  var {
    smaller: n,
    larger: t
  } = e, i = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  r.prototype.type = "FibonacciHeap", r.prototype.isFibonacciHeap = !0, r.prototype.insert = function(s, u) {
    var f = {
      key: s,
      value: u,
      degree: 0
    };
    if (this._minimum) {
      var d = this._minimum;
      f.left = d, f.right = d.right, d.right = f, f.right.left = f, n(s, d.key) && (this._minimum = f);
    } else
      f.left = f, f.right = f, this._minimum = f;
    return this._size++, f;
  }, r.prototype.size = function() {
    return this._size;
  }, r.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, r.prototype.isEmpty = function() {
    return this._size === 0;
  }, r.prototype.extractMinimum = function() {
    var s = this._minimum;
    if (s === null)
      return s;
    for (var u = this._minimum, f = s.degree, d = s.child; f > 0; ) {
      var D = d.right;
      d.left.right = d.right, d.right.left = d.left, d.left = u, d.right = u.right, u.right = d, d.right.left = d, d.parent = null, d = D, f--;
    }
    return s.left.right = s.right, s.right.left = s.left, s === s.right ? u = null : (u = s.right, u = h(u, this._size)), this._size--, this._minimum = u, s;
  }, r.prototype.remove = function(s) {
    this._minimum = a(this._minimum, s, -1), this.extractMinimum();
  };
  function a(s, u, f) {
    u.key = f;
    var d = u.parent;
    return d && n(u.key, d.key) && (o(s, u, d), l(s, d)), n(u.key, s.key) && (s = u), s;
  }
  function o(s, u, f) {
    u.left.right = u.right, u.right.left = u.left, f.degree--, f.child === u && (f.child = u.right), f.degree === 0 && (f.child = null), u.left = s, u.right = s.right, s.right = u, u.right.left = u, u.parent = null, u.mark = !1;
  }
  function l(s, u) {
    var f = u.parent;
    f && (u.mark ? (o(s, u, f), l(f)) : u.mark = !0);
  }
  var c = function(u, f) {
    u.left.right = u.right, u.right.left = u.left, u.parent = f, f.child ? (u.left = f.child, u.right = f.child.right, f.child.right = u, u.right.left = u) : (f.child = u, u.right = u, u.left = u), f.degree++, u.mark = !1;
  };
  function h(s, u) {
    var f = Math.floor(Math.log(u) * i) + 1, d = new Array(f), D = 0, v = s;
    if (v)
      for (D++, v = v.right; v !== s; )
        D++, v = v.right;
    for (var m; D > 0; ) {
      for (var p = v.degree, w = v.right; m = d[p], !!m; ) {
        if (t(v.key, m.key)) {
          var g = m;
          m = v, v = g;
        }
        c(m, v), d[p] = null, p++;
      }
      d[p] = v, v = w, D--;
    }
    s = null;
    for (var A = 0; A < f; A++)
      m = d[A], m && (s ? (m.left.right = m.right, m.right.left = m.left, m.left = s, m.right = s.right, s.right = m, m.right.left = m, n(m.key, s.key) && (s = m)) : s = m);
    return s;
  }
  return r;
}, {
  isClass: !0
}), cl = "Spa", ll = ["addScalar", "equalScalar", "FibonacciHeap"], hl = /* @__PURE__ */ ee(cl, ll, (e) => {
  var {
    addScalar: n,
    equalScalar: t,
    FibonacciHeap: i
  } = e;
  function r() {
    if (!(this instanceof r))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new i();
  }
  return r.prototype.type = "Spa", r.prototype.isSpa = !0, r.prototype.set = function(a, o) {
    if (this._values[a])
      this._values[a].value = o;
    else {
      var l = this._heap.insert(a, o);
      this._values[a] = l;
    }
  }, r.prototype.get = function(a) {
    var o = this._values[a];
    return o ? o.value : 0;
  }, r.prototype.accumulate = function(a, o) {
    var l = this._values[a];
    l ? l.value = n(l.value, o) : (l = this._heap.insert(a, o), this._values[a] = l);
  }, r.prototype.forEach = function(a, o, l) {
    var c = this._heap, h = this._values, s = [], u = c.extractMinimum();
    for (u && s.push(u); u && u.key <= o; )
      u.key >= a && (t(u.value, 0) || l(u.key, u.value, this)), u = c.extractMinimum(), u && s.push(u);
    for (var f = 0; f < s.length; f++) {
      var d = s[f];
      u = c.insert(d.key, d.value), h[u.key] = u;
    }
  }, r.prototype.swap = function(a, o) {
    var l = this._values[a], c = this._values[o];
    if (!l && c)
      l = this._heap.insert(a, c.value), this._heap.remove(c), this._values[a] = l, this._values[o] = void 0;
    else if (l && !c)
      c = this._heap.insert(o, l.value), this._heap.remove(l), this._values[o] = c, this._values[a] = void 0;
    else if (l && c) {
      var h = l.value;
      l.value = c.value, c.value = h;
    }
  }, r;
}, {
  isClass: !0
}), vl = "atan", dl = ["typed"], pl = /* @__PURE__ */ ee(vl, dl, (e) => {
  var {
    typed: n
  } = e;
  return n("atan", {
    number: function(i) {
      return Math.atan(i);
    },
    Complex: function(i) {
      return i.atan();
    },
    BigNumber: function(i) {
      return i.atan();
    }
  });
}), ca = /* @__PURE__ */ ee("trigUnit", ["typed"], (e) => {
  var {
    typed: n
  } = e;
  return {
    Unit: n.referToSelf((t) => (i) => {
      if (!i.hasBase(i.constructor.BASE_UNITS.ANGLE))
        throw new TypeError("Unit in function cot is no angle");
      return n.find(t, i.valueType())(i.value);
    })
  };
}), jn = "cos", ml = ["typed"], gl = /* @__PURE__ */ ee(jn, ml, (e) => {
  var {
    typed: n
  } = e, t = ca({
    typed: n
  });
  return n(jn, {
    number: Math.cos,
    "Complex | BigNumber": (i) => i.cos()
  }, t);
}), ei = "sin", Dl = ["typed"], yl = /* @__PURE__ */ ee(ei, Dl, (e) => {
  var {
    typed: n
  } = e, t = ca({
    typed: n
  });
  return n(ei, {
    number: Math.sin,
    "Complex | BigNumber": (i) => i.sin()
  }, t);
}), ri = "add", wl = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], Al = /* @__PURE__ */ ee(ri, wl, (e) => {
  var {
    typed: n,
    matrix: t,
    addScalar: i,
    equalScalar: r,
    DenseMatrix: a,
    SparseMatrix: o,
    concat: l
  } = e, c = ua({
    typed: n
  }), h = Mf({
    typed: n,
    equalScalar: r
  }), s = oa({
    typed: n,
    DenseMatrix: a
  }), u = Mr({
    typed: n,
    matrix: t,
    concat: l
  });
  return n(ri, {
    "any, any": i,
    "any, any, ...any": n.referToSelf((f) => (d, D, v) => {
      for (var m = f(d, D), p = 0; p < v.length; p++)
        m = f(m, v[p]);
      return m;
    })
  }, u({
    elop: i,
    DS: c,
    SS: h,
    Ss: s
  }));
}), ti = "norm", El = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], Fl = /* @__PURE__ */ ee(ti, El, (e) => {
  var {
    typed: n,
    abs: t,
    add: i,
    pow: r,
    conj: a,
    sqrt: o,
    multiply: l,
    equalScalar: c,
    larger: h,
    smaller: s,
    matrix: u,
    ctranspose: f,
    eigs: d
  } = e;
  return n(ti, {
    number: Math.abs,
    Complex: function(b) {
      return b.abs();
    },
    BigNumber: function(b) {
      return b.abs();
    },
    boolean: function(b) {
      return Math.abs(b);
    },
    Array: function(b) {
      return y(u(b), 2);
    },
    Matrix: function(b) {
      return y(b, 2);
    },
    "Array, number | BigNumber | string": function(b, E) {
      return y(u(b), E);
    },
    "Matrix, number | BigNumber | string": function(b, E) {
      return y(b, E);
    }
  });
  function D(C) {
    var b = 0;
    return C.forEach(function(E) {
      var S = t(E);
      h(S, b) && (b = S);
    }, !0), b;
  }
  function v(C) {
    var b;
    return C.forEach(function(E) {
      var S = t(E);
      (!b || s(S, b)) && (b = S);
    }, !0), b || 0;
  }
  function m(C, b) {
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return D(C);
    if (b === Number.NEGATIVE_INFINITY || b === "-inf")
      return v(C);
    if (b === "fro")
      return y(C, 2);
    if (typeof b == "number" && !isNaN(b)) {
      if (!c(b, 0)) {
        var E = 0;
        return C.forEach(function(S) {
          E = i(r(t(S), b), E);
        }, !0), r(E, 1 / b);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function p(C) {
    var b = 0;
    return C.forEach(function(E, S) {
      b = i(b, l(E, a(E)));
    }), t(o(b));
  }
  function w(C) {
    var b = [], E = 0;
    return C.forEach(function(S, M) {
      var x = M[1], I = i(b[x] || 0, t(S));
      h(I, E) && (E = I), b[x] = I;
    }, !0), E;
  }
  function g(C) {
    var b = C.size();
    if (b[0] !== b[1])
      throw new RangeError("Invalid matrix dimensions");
    var E = f(C), S = l(E, C), M = d(S).values.toArray(), x = M[M.length - 1];
    return t(o(x));
  }
  function A(C) {
    var b = [], E = 0;
    return C.forEach(function(S, M) {
      var x = M[0], I = i(b[x] || 0, t(S));
      h(I, E) && (E = I), b[x] = I;
    }, !0), E;
  }
  function F(C, b) {
    if (b === 1)
      return w(C);
    if (b === Number.POSITIVE_INFINITY || b === "inf")
      return A(C);
    if (b === "fro")
      return p(C);
    if (b === 2)
      return g(C);
    throw new Error("Unsupported parameter value " + b);
  }
  function y(C, b) {
    var E = C.size();
    if (E.length === 1)
      return m(C, b);
    if (E.length === 2) {
      if (E[0] && E[1])
        return F(C, b);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), ni = "dot", Cl = ["typed", "addScalar", "multiplyScalar", "conj", "size"], bl = /* @__PURE__ */ ee(ni, Cl, (e) => {
  var {
    typed: n,
    addScalar: t,
    multiplyScalar: i,
    conj: r,
    size: a
  } = e;
  return n(ni, {
    "Array | DenseMatrix, Array | DenseMatrix": l,
    "SparseMatrix, SparseMatrix": c
  });
  function o(s, u) {
    var f = h(s), d = h(u), D, v;
    if (f.length === 1)
      D = f[0];
    else if (f.length === 2 && f[1] === 1)
      D = f[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + f.join(", ") + ")");
    if (d.length === 1)
      v = d[0];
    else if (d.length === 2 && d[1] === 1)
      v = d[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + d.join(", ") + ")");
    if (D !== v)
      throw new RangeError("Vectors must have equal length (" + D + " != " + v + ")");
    if (D === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return D;
  }
  function l(s, u) {
    var f = o(s, u), d = _e(s) ? s._data : s, D = _e(s) ? s._datatype : void 0, v = _e(u) ? u._data : u, m = _e(u) ? u._datatype : void 0, p = h(s).length === 2, w = h(u).length === 2, g = t, A = i;
    if (D && m && D === m && typeof D == "string") {
      var F = D;
      g = n.find(t, [F, F]), A = n.find(i, [F, F]);
    }
    if (!p && !w) {
      for (var y = A(r(d[0]), v[0]), C = 1; C < f; C++)
        y = g(y, A(r(d[C]), v[C]));
      return y;
    }
    if (!p && w) {
      for (var b = A(r(d[0]), v[0][0]), E = 1; E < f; E++)
        b = g(b, A(r(d[E]), v[E][0]));
      return b;
    }
    if (p && !w) {
      for (var S = A(r(d[0][0]), v[0]), M = 1; M < f; M++)
        S = g(S, A(r(d[M][0]), v[M]));
      return S;
    }
    if (p && w) {
      for (var x = A(r(d[0][0]), v[0][0]), I = 1; I < f; I++)
        x = g(x, A(r(d[I][0]), v[I][0]));
      return x;
    }
  }
  function c(s, u) {
    o(s, u);
    for (var f = s._index, d = s._values, D = u._index, v = u._values, m = 0, p = t, w = i, g = 0, A = 0; g < f.length && A < D.length; ) {
      var F = f[g], y = D[A];
      if (F < y) {
        g++;
        continue;
      }
      if (F > y) {
        A++;
        continue;
      }
      F === y && (m = p(m, w(d[g], v[A])), g++, A++);
    }
    return m;
  }
  function h(s) {
    return _e(s) ? s.size() : a(s);
  }
}), ii = "index", Ml = ["typed", "Index"], Sl = /* @__PURE__ */ ee(ii, Ml, (e) => {
  var {
    typed: n,
    Index: t
  } = e;
  return n(ii, {
    "...number | string | BigNumber | Range | Array | Matrix": function(r) {
      var a = r.map(function(l) {
        return Re(l) ? l.toNumber() : Me(l) || _e(l) ? l.map(function(c) {
          return Re(c) ? c.toNumber() : c;
        }) : l;
      }), o = new t();
      return t.apply(o, a), o;
    }
  });
}), ai = "lup", xl = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], Nl = /* @__PURE__ */ ee(ai, xl, (e) => {
  var {
    typed: n,
    matrix: t,
    abs: i,
    addScalar: r,
    divideScalar: a,
    multiplyScalar: o,
    subtractScalar: l,
    larger: c,
    equalScalar: h,
    unaryMinus: s,
    DenseMatrix: u,
    SparseMatrix: f,
    Spa: d
  } = e;
  return n(ai, {
    DenseMatrix: function(p) {
      return D(p);
    },
    SparseMatrix: function(p) {
      return v(p);
    },
    Array: function(p) {
      var w = t(p), g = D(w);
      return {
        L: g.L.valueOf(),
        U: g.U.valueOf(),
        p: g.p
      };
    }
  });
  function D(m) {
    var p = m._size[0], w = m._size[1], g = Math.min(p, w), A = Ce(m._data), F = [], y = [p, g], C = [], b = [g, w], E, S, M, x = [];
    for (E = 0; E < p; E++)
      x[E] = E;
    for (S = 0; S < w; S++) {
      if (S > 0)
        for (E = 0; E < p; E++) {
          var I = Math.min(E, S), T = 0;
          for (M = 0; M < I; M++)
            T = r(T, o(A[E][M], A[M][S]));
          A[E][S] = l(A[E][S], T);
        }
      var O = S, B = 0, G = 0;
      for (E = S; E < p; E++) {
        var $ = A[E][S], z = i($);
        c(z, B) && (O = E, B = z, G = $);
      }
      if (S !== O && (x[S] = [x[O], x[O] = x[S]][0], u._swapRows(S, O, A)), S < p)
        for (E = S + 1; E < p; E++) {
          var V = A[E][S];
          h(V, 0) || (A[E][S] = a(A[E][S], G));
        }
    }
    for (S = 0; S < w; S++)
      for (E = 0; E < p; E++) {
        if (S === 0 && (E < w && (C[E] = []), F[E] = []), E < S) {
          E < w && (C[E][S] = A[E][S]), S < p && (F[E][S] = 0);
          continue;
        }
        if (E === S) {
          E < w && (C[E][S] = A[E][S]), S < p && (F[E][S] = 1);
          continue;
        }
        E < w && (C[E][S] = 0), S < p && (F[E][S] = A[E][S]);
      }
    var K = new u({
      data: F,
      size: y
    }), P = new u({
      data: C,
      size: b
    }), q = [];
    for (E = 0, g = x.length; E < g; E++)
      q[x[E]] = E;
    return {
      L: K,
      U: P,
      p: q,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
  function v(m) {
    var p = m._size[0], w = m._size[1], g = Math.min(p, w), A = m._values, F = m._index, y = m._ptr, C = [], b = [], E = [], S = [p, g], M = [], x = [], I = [], T = [g, w], O, B, G, $ = [], z = [];
    for (O = 0; O < p; O++)
      $[O] = O, z[O] = O;
    var V = function(q, Z) {
      var ne = z[q], k = z[Z];
      $[ne] = Z, $[k] = q, z[q] = k, z[Z] = ne;
    }, K = function() {
      var q = new d();
      B < p && (E.push(C.length), C.push(1), b.push(B)), I.push(M.length);
      var Z = y[B], ne = y[B + 1];
      for (G = Z; G < ne; G++)
        O = F[G], q.set($[O], A[G]);
      B > 0 && q.forEach(0, B - 1, function(X, J) {
        f._forEachRow(X, C, b, E, function(ue, j) {
          ue > X && q.accumulate(ue, s(o(j, J)));
        });
      });
      var k = B, U = q.get(B), Q = i(U);
      q.forEach(B + 1, p - 1, function(X, J) {
        var ue = i(J);
        c(ue, Q) && (k = X, Q = ue, U = J);
      }), B !== k && (f._swapRows(B, k, S[1], C, b, E), f._swapRows(B, k, T[1], M, x, I), q.swap(B, k), V(B, k)), q.forEach(0, p - 1, function(X, J) {
        X <= B ? (M.push(J), x.push(X)) : (J = a(J, U), h(J, 0) || (C.push(J), b.push(X)));
      });
    };
    for (B = 0; B < w; B++)
      K();
    return I.push(M.length), E.push(C.length), {
      L: new f({
        values: C,
        index: b,
        ptr: E,
        size: S
      }),
      U: new f({
        values: M,
        index: x,
        ptr: I,
        size: T
      }),
      p: $,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
}), ui = "qr", Bl = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], _l = /* @__PURE__ */ ee(ui, Bl, (e) => {
  var {
    typed: n,
    matrix: t,
    zeros: i,
    identity: r,
    isZero: a,
    equal: o,
    sign: l,
    sqrt: c,
    conj: h,
    unaryMinus: s,
    addScalar: u,
    divideScalar: f,
    multiplyScalar: d,
    subtractScalar: D,
    complex: v
  } = e;
  return Ir(n(ui, {
    DenseMatrix: function(A) {
      return p(A);
    },
    SparseMatrix: function(A) {
      return w();
    },
    Array: function(A) {
      var F = t(A), y = p(F);
      return {
        Q: y.Q.valueOf(),
        R: y.R.valueOf()
      };
    }
  }), {
    _denseQRimpl: m
  });
  function m(g) {
    var A = g._size[0], F = g._size[1], y = r([A], "dense"), C = y._data, b = g.clone(), E = b._data, S, M, x, I = i([A], "");
    for (x = 0; x < Math.min(F, A); ++x) {
      var T = E[x][x], O = s(o(T, 0) ? 1 : l(T)), B = h(O), G = 0;
      for (S = x; S < A; S++)
        G = u(G, d(E[S][x], h(E[S][x])));
      var $ = d(O, c(G));
      if (!a($)) {
        var z = D(T, $);
        for (I[x] = 1, S = x + 1; S < A; S++)
          I[S] = f(E[S][x], z);
        var V = s(h(f(z, $))), K = void 0;
        for (M = x; M < F; M++) {
          for (K = 0, S = x; S < A; S++)
            K = u(K, d(h(I[S]), E[S][M]));
          for (K = d(K, V), S = x; S < A; S++)
            E[S][M] = d(D(E[S][M], d(I[S], K)), B);
        }
        for (S = 0; S < A; S++) {
          for (K = 0, M = x; M < A; M++)
            K = u(K, d(C[S][M], I[M]));
          for (K = d(K, V), M = x; M < A; ++M)
            C[S][M] = f(D(C[S][M], d(K, h(I[M]))), B);
        }
      }
    }
    return {
      Q: y,
      R: b,
      toString: function() {
        return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
      }
    };
  }
  function p(g) {
    var A = m(g), F = A.R._data;
    if (g._data.length > 0)
      for (var y = F[0][0].type === "Complex" ? v(0) : 0, C = 0; C < F.length; ++C)
        for (var b = 0; b < C && b < (F[0] || []).length; ++b)
          F[C][b] = y;
    return A;
  }
  function w(g) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function zl(e, n, t, i) {
  for (var r = e._values, a = e._index, o = e._ptr, l = e._size, c = e._datatype, h = l[0], s = l[1], u = i && e._values ? [] : null, f = [], d = [], D = 0, v = 0; v < s; v++) {
    d[v] = D;
    for (var m = t ? t[v] : v, p = o[m], w = o[m + 1], g = p; g < w; g++) {
      var A = n ? n[a[g]] : a[g];
      f[D] = A, u && (u[D] = r[g]), D++;
    }
  }
  return d[s] = D, e.createSparseMatrix({
    values: u,
    index: f,
    ptr: d,
    size: [h, s],
    datatype: c
  });
}
function la(e, n, t, i, r, a, o) {
  var l = 0;
  for (t[o] = e; l >= 0; ) {
    var c = t[o + l], h = t[i + c];
    h === -1 ? (l--, a[n++] = c) : (t[i + c] = t[r + h], ++l, t[o + l] = h);
  }
  return n;
}
function Tl(e, n) {
  if (!e)
    return null;
  var t = 0, i, r = [], a = [], o = 0, l = n, c = 2 * n;
  for (i = 0; i < n; i++)
    a[o + i] = -1;
  for (i = n - 1; i >= 0; i--)
    e[i] !== -1 && (a[l + i] = a[o + e[i]], a[o + e[i]] = i);
  for (i = 0; i < n; i++)
    e[i] === -1 && (t = la(i, t, a, o, l, r, c));
  return r;
}
function Il(e, n) {
  if (!e)
    return null;
  var t = e._index, i = e._ptr, r = e._size, a = r[0], o = r[1], l = [], c = [], h = 0, s = o, u, f;
  if (n)
    for (u = 0; u < a; u++)
      c[s + u] = -1;
  for (var d = 0; d < o; d++) {
    l[d] = -1, c[h + d] = -1;
    for (var D = i[d], v = i[d + 1], m = D; m < v; m++) {
      var p = t[m];
      for (u = n ? c[s + p] : p; u !== -1 && u < d; u = f)
        f = c[h + u], c[h + u] = d, f === -1 && (l[u] = d);
      n && (c[s + p] = d);
    }
  }
  return l;
}
function Ol(e, n, t) {
  for (var i = e._values, r = e._index, a = e._ptr, o = e._size, l = o[1], c = 0, h = 0; h < l; h++) {
    var s = a[h];
    for (a[h] = c; s < a[h + 1]; s++)
      n(r[s], h, i ? i[s] : 1, t) && (r[c] = r[s], i && (i[c] = i[s]), c++);
  }
  return a[l] = c, r.splice(c, r.length - c), i && i.splice(c, i.length - c), c;
}
function gr(e) {
  return -e - 2;
}
var Ll = "csAmd", $l = ["add", "multiply", "transpose"], ql = /* @__PURE__ */ ee(Ll, $l, (e) => {
  var {
    add: n,
    multiply: t,
    transpose: i
  } = e;
  return function(s, u) {
    if (!u || s <= 0 || s > 3)
      return null;
    var f = u._size, d = f[0], D = f[1], v = 0, m = Math.max(16, 10 * Math.sqrt(D));
    m = Math.min(D - 2, m);
    var p = r(s, u, d, D, m);
    Ol(p, c, null);
    for (var w = p._index, g = p._ptr, A = g[D], F = [], y = [], C = 0, b = D + 1, E = 2 * (D + 1), S = 3 * (D + 1), M = 4 * (D + 1), x = 5 * (D + 1), I = 6 * (D + 1), T = 7 * (D + 1), O = F, B = a(D, g, y, C, S, O, E, T, b, I, M, x), G = o(D, g, y, x, M, I, m, b, S, O, E), $ = 0, z, V, K, P, q, Z, ne, k, U, Q, X, J, ue, j, se, le; G < D; ) {
      for (K = -1; $ < D && (K = y[S + $]) === -1; $++)
        ;
      y[E + K] !== -1 && (O[y[E + K]] = -1), y[S + $] = y[E + K];
      var pe = y[M + K], De = y[b + K];
      G += De;
      var Ae = 0;
      y[b + K] = -De;
      var he = g[K], be = pe === 0 ? he : A, Ee = be;
      for (P = 1; P <= pe + 1; P++) {
        for (P > pe ? (Z = K, ne = he, k = y[C + K] - pe) : (Z = w[he++], ne = g[Z], k = y[C + Z]), q = 1; q <= k; q++)
          z = w[ne++], !((U = y[b + z]) <= 0) && (Ae += U, y[b + z] = -U, w[Ee++] = z, y[E + z] !== -1 && (O[y[E + z]] = O[z]), O[z] !== -1 ? y[E + O[z]] = y[E + z] : y[S + y[x + z]] = y[E + z]);
        Z !== K && (g[Z] = gr(K), y[I + Z] = 0);
      }
      for (pe !== 0 && (A = Ee), y[x + K] = Ae, g[K] = be, y[C + K] = Ee - be, y[M + K] = -2, B = l(B, v, y, I, D), Q = be; Q < Ee; Q++)
        if (z = w[Q], !((X = y[M + z]) <= 0)) {
          U = -y[b + z];
          var Se = B - U;
          for (he = g[z], J = g[z] + X - 1; he <= J; he++)
            Z = w[he], y[I + Z] >= B ? y[I + Z] -= U : y[I + Z] !== 0 && (y[I + Z] = y[x + Z] + Se);
        }
      for (Q = be; Q < Ee; Q++) {
        for (z = w[Q], J = g[z], ue = J + y[M + z] - 1, j = J, se = 0, le = 0, he = J; he <= ue; he++)
          if (Z = w[he], y[I + Z] !== 0) {
            var Ve = y[I + Z] - B;
            Ve > 0 ? (le += Ve, w[j++] = Z, se += Z) : (g[Z] = gr(K), y[I + Z] = 0);
          }
        y[M + z] = j - J + 1;
        var N = j, _ = J + y[C + z];
        for (he = ue + 1; he < _; he++) {
          V = w[he];
          var L = y[b + V];
          L <= 0 || (le += L, w[j++] = V, se += V);
        }
        le === 0 ? (g[z] = gr(K), U = -y[b + z], Ae -= U, De += U, G += U, y[b + z] = 0, y[M + z] = -1) : (y[x + z] = Math.min(y[x + z], le), w[j] = w[N], w[N] = w[J], w[J] = K, y[C + z] = j - J + 1, se = (se < 0 ? -se : se) % D, y[E + z] = y[T + se], y[T + se] = z, O[z] = se);
      }
      for (y[x + K] = Ae, v = Math.max(v, Ae), B = l(B + v, v, y, I, D), Q = be; Q < Ee; Q++)
        if (z = w[Q], !(y[b + z] >= 0))
          for (se = O[z], z = y[T + se], y[T + se] = -1; z !== -1 && y[E + z] !== -1; z = y[E + z], B++) {
            for (k = y[C + z], X = y[M + z], he = g[z] + 1; he <= g[z] + k - 1; he++)
              y[I + w[he]] = B;
            var R = z;
            for (V = y[E + z]; V !== -1; ) {
              var H = y[C + V] === k && y[M + V] === X;
              for (he = g[V] + 1; H && he <= g[V] + k - 1; he++)
                y[I + w[he]] !== B && (H = 0);
              H ? (g[V] = gr(z), y[b + z] += y[b + V], y[b + V] = 0, y[M + V] = -1, V = y[E + V], y[E + R] = V) : (R = V, V = y[E + V]);
            }
          }
      for (he = be, Q = be; Q < Ee; Q++)
        z = w[Q], !((U = -y[b + z]) <= 0) && (y[b + z] = U, le = y[x + z] + Ae - U, le = Math.min(le, D - G - U), y[S + le] !== -1 && (O[y[S + le]] = z), y[E + z] = y[S + le], O[z] = -1, y[S + le] = z, $ = Math.min($, le), y[x + z] = le, w[he++] = z);
      y[b + K] = De, (y[C + K] = he - be) === 0 && (g[K] = -1, y[I + K] = 0), pe !== 0 && (A = he);
    }
    for (z = 0; z < D; z++)
      g[z] = gr(g[z]);
    for (V = 0; V <= D; V++)
      y[S + V] = -1;
    for (V = D; V >= 0; V--)
      y[b + V] > 0 || (y[E + V] = y[S + g[V]], y[S + g[V]] = V);
    for (Z = D; Z >= 0; Z--)
      y[b + Z] <= 0 || g[Z] !== -1 && (y[E + Z] = y[S + g[Z]], y[S + g[Z]] = Z);
    for (K = 0, z = 0; z <= D; z++)
      g[z] === -1 && (K = la(z, K, y, S, E, F, I));
    return F.splice(F.length - 1, 1), F;
  };
  function r(h, s, u, f, d) {
    var D = i(s);
    if (h === 1 && f === u)
      return n(s, D);
    if (h === 2) {
      for (var v = D._index, m = D._ptr, p = 0, w = 0; w < u; w++) {
        var g = m[w];
        if (m[w] = p, !(m[w + 1] - g > d))
          for (var A = m[w + 1]; g < A; g++)
            v[p++] = v[g];
      }
      return m[u] = p, s = i(D), t(D, s);
    }
    return t(D, s);
  }
  function a(h, s, u, f, d, D, v, m, p, w, g, A) {
    for (var F = 0; F < h; F++)
      u[f + F] = s[F + 1] - s[F];
    u[f + h] = 0;
    for (var y = 0; y <= h; y++)
      u[d + y] = -1, D[y] = -1, u[v + y] = -1, u[m + y] = -1, u[p + y] = 1, u[w + y] = 1, u[g + y] = 0, u[A + y] = u[f + y];
    var C = l(0, 0, u, w, h);
    return u[g + h] = -2, s[h] = -1, u[w + h] = 0, C;
  }
  function o(h, s, u, f, d, D, v, m, p, w, g) {
    for (var A = 0, F = 0; F < h; F++) {
      var y = u[f + F];
      if (y === 0)
        u[d + F] = -2, A++, s[F] = -1, u[D + F] = 0;
      else if (y > v)
        u[m + F] = 0, u[d + F] = -1, A++, s[F] = gr(h), u[m + h]++;
      else {
        var C = u[p + y];
        C !== -1 && (w[C] = F), u[g + F] = u[p + y], u[p + y] = F;
      }
    }
    return A;
  }
  function l(h, s, u, f, d) {
    if (h < 2 || h + s < 0) {
      for (var D = 0; D < d; D++)
        u[f + D] !== 0 && (u[f + D] = 1);
      h = 2;
    }
    return h;
  }
  function c(h, s) {
    return h !== s;
  }
});
function Pl(e, n, t, i, r, a, o) {
  var l, c, h = 0, s;
  if (e <= n || t[i + n] <= t[r + e])
    return -1;
  t[r + e] = t[i + n];
  var u = t[a + e];
  if (t[a + e] = n, u === -1)
    h = 1, s = e;
  else {
    for (h = 2, s = u; s !== t[o + s]; s = t[o + s])
      ;
    for (l = u; l !== s; l = c)
      c = t[o + l], t[o + l] = s;
  }
  return {
    jleaf: h,
    q: s
  };
}
var Rl = "csCounts", Ul = ["transpose"], Vl = /* @__PURE__ */ ee(Rl, Ul, (e) => {
  var {
    transpose: n
  } = e;
  return function(t, i, r, a) {
    if (!t || !i || !r)
      return null;
    var o = t._size, l = o[0], c = o[1], h, s, u, f, d, D, v, m = 4 * c + (a ? c + l + 1 : 0), p = [], w = 0, g = c, A = 2 * c, F = 3 * c, y = 4 * c, C = 5 * c + 1;
    for (u = 0; u < m; u++)
      p[u] = -1;
    var b = [], E = n(t), S = E._index, M = E._ptr;
    for (u = 0; u < c; u++)
      for (s = r[u], b[s] = p[F + s] === -1 ? 1 : 0; s !== -1 && p[F + s] === -1; s = i[s])
        p[F + s] = u;
    if (a) {
      for (u = 0; u < c; u++)
        p[r[u]] = u;
      for (h = 0; h < l; h++) {
        for (u = c, D = M[h], v = M[h + 1], d = D; d < v; d++)
          u = Math.min(u, p[S[d]]);
        p[C + h] = p[y + u], p[y + u] = h;
      }
    }
    for (h = 0; h < c; h++)
      p[w + h] = h;
    for (u = 0; u < c; u++) {
      for (s = r[u], i[s] !== -1 && b[i[s]]--, f = a ? p[y + u] : s; f !== -1; f = a ? p[C + f] : -1)
        for (d = M[f]; d < M[f + 1]; d++) {
          h = S[d];
          var x = Pl(h, s, p, F, g, A, w);
          x.jleaf >= 1 && b[s]++, x.jleaf === 2 && b[x.q]--;
        }
      i[s] !== -1 && (p[w + s] = i[s]);
    }
    for (s = 0; s < c; s++)
      i[s] !== -1 && (b[i[s]] += b[s]);
    return b;
  };
}), Zl = "csSqr", Gl = ["add", "multiply", "transpose"], Yl = /* @__PURE__ */ ee(Zl, Gl, (e) => {
  var {
    add: n,
    multiply: t,
    transpose: i
  } = e, r = ql({
    add: n,
    multiply: t,
    transpose: i
  }), a = Vl({
    transpose: i
  });
  return function(c, h, s) {
    var u = h._ptr, f = h._size, d = f[1], D, v = {};
    if (v.q = r(c, h), c && !v.q)
      return null;
    if (s) {
      var m = c ? zl(h, null, v.q, 0) : h;
      v.parent = Il(m, 1);
      var p = Tl(v.parent, d);
      if (v.cp = a(m, v.parent, p, 1), m && v.parent && v.cp && o(m, v))
        for (v.unz = 0, D = 0; D < d; D++)
          v.unz += v.cp[D];
    } else
      v.unz = 4 * u[d] + d, v.lnz = v.unz;
    return v;
  };
  function o(l, c) {
    var h = l._ptr, s = l._index, u = l._size, f = u[0], d = u[1];
    c.pinv = [], c.leftmost = [];
    var D = c.parent, v = c.pinv, m = c.leftmost, p = [], w = 0, g = f, A = f + d, F = f + 2 * d, y, C, b, E, S;
    for (C = 0; C < d; C++)
      p[g + C] = -1, p[A + C] = -1, p[F + C] = 0;
    for (y = 0; y < f; y++)
      m[y] = -1;
    for (C = d - 1; C >= 0; C--)
      for (E = h[C], S = h[C + 1], b = E; b < S; b++)
        m[s[b]] = C;
    for (y = f - 1; y >= 0; y--)
      v[y] = -1, C = m[y], C !== -1 && (p[F + C]++ === 0 && (p[A + C] = y), p[w + y] = p[g + C], p[g + C] = y);
    for (c.lnz = 0, c.m2 = f, C = 0; C < d; C++)
      if (y = p[g + C], c.lnz++, y < 0 && (y = c.m2++), v[y] = C, !(--F[C] <= 0)) {
        c.lnz += p[F + C];
        var M = D[C];
        M !== -1 && (p[F + M] === 0 && (p[A + M] = p[A + C]), p[w + p[A + C]] = p[g + M], p[g + M] = p[w + y], p[F + M] += p[F + C]);
      }
    for (y = 0; y < f; y++)
      v[y] < 0 && (v[y] = C++);
    return !0;
  }
});
function Gt(e, n) {
  return e[n] < 0;
}
function ha(e, n) {
  e[n] = gr(e[n]);
}
function oi(e) {
  return e < 0 ? gr(e) : e;
}
function Jl(e, n, t, i, r) {
  var a = n._index, o = n._ptr, l = n._size, c = l[1], h, s, u, f = 0;
  for (i[0] = e; f >= 0; ) {
    e = i[f];
    var d = r ? r[e] : e;
    Gt(o, e) || (ha(o, e), i[c + f] = d < 0 ? 0 : oi(o[d]));
    var D = 1;
    for (s = i[c + f], u = d < 0 ? 0 : oi(o[d + 1]); s < u; s++)
      if (h = a[s], !Gt(o, h)) {
        i[c + f] = s, i[++f] = h, D = 0;
        break;
      }
    D && (f--, i[--t] = e);
  }
  return t;
}
function Ql(e, n, t, i, r) {
  var a = e._ptr, o = e._size, l = n._index, c = n._ptr, h = o[1], s, u, f, d = h;
  for (u = c[t], f = c[t + 1], s = u; s < f; s++) {
    var D = l[s];
    Gt(a, D) || (d = Jl(D, e, d, i, r));
  }
  for (s = d; s < h; s++)
    ha(a, i[s]);
  return d;
}
var Xl = "csSpsolve", Hl = ["divideScalar", "multiply", "subtract"], Kl = /* @__PURE__ */ ee(Xl, Hl, (e) => {
  var {
    divideScalar: n,
    multiply: t,
    subtract: i
  } = e;
  return function(a, o, l, c, h, s, u) {
    var f = a._values, d = a._index, D = a._ptr, v = a._size, m = v[1], p = o._values, w = o._index, g = o._ptr, A, F, y, C, b = Ql(a, o, l, c, s);
    for (A = b; A < m; A++)
      h[c[A]] = 0;
    for (F = g[l], y = g[l + 1], A = F; A < y; A++)
      h[w[A]] = p[A];
    for (var E = b; E < m; E++) {
      var S = c[E], M = s ? s[S] : S;
      if (!(M < 0))
        for (F = D[M], y = D[M + 1], h[S] = n(h[S], f[u ? F : y - 1]), A = u ? F + 1 : F, C = u ? y : y - 1; A < C; A++) {
          var x = d[A];
          h[x] = i(h[x], t(f[A], h[S]));
        }
    }
    return b;
  };
}), Wl = "csLu", kl = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], jl = /* @__PURE__ */ ee(Wl, kl, (e) => {
  var {
    abs: n,
    divideScalar: t,
    multiply: i,
    subtract: r,
    larger: a,
    largerEq: o,
    SparseMatrix: l
  } = e, c = Kl({
    divideScalar: t,
    multiply: i,
    subtract: r
  });
  return function(s, u, f) {
    if (!s)
      return null;
    var d = s._size, D = d[1], v, m = 100, p = 100;
    u && (v = u.q, m = u.lnz || m, p = u.unz || p);
    var w = [], g = [], A = [], F = new l({
      values: w,
      index: g,
      ptr: A,
      size: [D, D]
    }), y = [], C = [], b = [], E = new l({
      values: y,
      index: C,
      ptr: b,
      size: [D, D]
    }), S = [], M, x, I = [], T = [];
    for (M = 0; M < D; M++)
      I[M] = 0, S[M] = -1, A[M + 1] = 0;
    m = 0, p = 0;
    for (var O = 0; O < D; O++) {
      A[O] = m, b[O] = p;
      var B = v ? v[O] : O, G = c(F, s, B, T, I, S, 1), $ = -1, z = -1;
      for (x = G; x < D; x++)
        if (M = T[x], S[M] < 0) {
          var V = n(I[M]);
          a(V, z) && (z = V, $ = M);
        } else
          C[p] = S[M], y[p++] = I[M];
      if ($ === -1 || z <= 0)
        return null;
      S[B] < 0 && o(n(I[B]), i(z, f)) && ($ = B);
      var K = I[$];
      for (C[p] = O, y[p++] = K, S[$] = O, g[m] = $, w[m++] = 1, x = G; x < D; x++)
        M = T[x], S[M] < 0 && (g[m] = M, w[m++] = t(I[M], K)), I[M] = 0;
    }
    for (A[D] = m, b[D] = p, x = 0; x < m; x++)
      g[x] = S[g[x]];
    return w.splice(m, w.length - m), g.splice(m, g.length - m), y.splice(p, y.length - p), C.splice(p, C.length - p), {
      L: F,
      U: E,
      pinv: S
    };
  };
}), si = "slu", e0 = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], r0 = /* @__PURE__ */ ee(si, e0, (e) => {
  var {
    typed: n,
    abs: t,
    add: i,
    multiply: r,
    transpose: a,
    divideScalar: o,
    subtract: l,
    larger: c,
    largerEq: h,
    SparseMatrix: s
  } = e, u = Yl({
    add: i,
    multiply: r,
    transpose: a
  }), f = jl({
    abs: t,
    divideScalar: o,
    multiply: r,
    subtract: l,
    larger: c,
    largerEq: h,
    SparseMatrix: s
  });
  return n(si, {
    "SparseMatrix, number, number": function(D, v, m) {
      if (!ze(v) || v < 0 || v > 3)
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      if (m < 0 || m > 1)
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      var p = u(v, D, !1), w = f(D, p, m);
      return {
        L: w.L,
        U: w.U,
        p: w.pinv,
        q: p.q,
        toString: function() {
          return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
        }
      };
    }
  });
});
function fi(e, n) {
  var t, i = n.length, r = [];
  if (e)
    for (t = 0; t < i; t++)
      r[e[t]] = n[t];
  else
    for (t = 0; t < i; t++)
      r[t] = n[t];
  return r;
}
var ci = "lusolve", t0 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], n0 = /* @__PURE__ */ ee(ci, t0, (e) => {
  var {
    typed: n,
    matrix: t,
    lup: i,
    slu: r,
    usolve: a,
    lsolve: o,
    DenseMatrix: l
  } = e, c = St({
    DenseMatrix: l
  });
  return n(ci, {
    "Array, Array | Matrix": function(f, d) {
      f = t(f);
      var D = i(f), v = s(D.L, D.U, D.p, null, d);
      return v.valueOf();
    },
    "DenseMatrix, Array | Matrix": function(f, d) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, d);
    },
    "SparseMatrix, Array | Matrix": function(f, d) {
      var D = i(f);
      return s(D.L, D.U, D.p, null, d);
    },
    "SparseMatrix, Array | Matrix, number, number": function(f, d, D, v) {
      var m = r(f, D, v);
      return s(m.L, m.U, m.p, m.q, d);
    },
    "Object, Array | Matrix": function(f, d) {
      return s(f.L, f.U, f.p, f.q, d);
    }
  });
  function h(u) {
    if (_e(u))
      return u;
    if (Me(u))
      return t(u);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function s(u, f, d, D, v) {
    u = h(u), f = h(f), d && (v = c(u, v, !0), v._data = fi(d, v._data));
    var m = o(u, v), p = a(f, m);
    return D && (p._data = fi(D, p._data)), p;
  }
}), li = "det", i0 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], a0 = /* @__PURE__ */ ee(li, i0, (e) => {
  var {
    typed: n,
    matrix: t,
    subtractScalar: i,
    multiply: r,
    divideScalar: a,
    isZero: o,
    unaryMinus: l
  } = e;
  return n(li, {
    any: function(s) {
      return Ce(s);
    },
    "Array | Matrix": function(s) {
      var u;
      switch (_e(s) ? u = s.size() : Array.isArray(s) ? (s = t(s), u = s.size()) : u = [], u.length) {
        case 0:
          return Ce(s);
        case 1:
          if (u[0] === 1)
            return Ce(s.valueOf()[0]);
          if (u[0] === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Oe(u) + ")");
        case 2: {
          var f = u[0], d = u[1];
          if (f === d)
            return c(s.clone().valueOf(), f);
          if (d === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Oe(u) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Oe(u) + ")");
      }
    }
  });
  function c(h, s, u) {
    if (s === 1)
      return Ce(h[0][0]);
    if (s === 2)
      return i(r(h[0][0], h[1][1]), r(h[1][0], h[0][1]));
    for (var f = !1, d = new Array(s).fill(0).map((C, b) => b), D = 0; D < s; D++) {
      var v = d[D];
      if (o(h[v][D])) {
        var m = void 0;
        for (m = D + 1; m < s; m++)
          if (!o(h[d[m]][D])) {
            v = d[m], d[m] = d[D], d[D] = v, f = !f;
            break;
          }
        if (m === s)
          return h[v][D];
      }
      for (var p = h[v][D], w = D === 0 ? 1 : h[d[D - 1]][D - 1], g = D + 1; g < s; g++)
        for (var A = d[g], F = D + 1; F < s; F++)
          h[A][F] = a(i(r(h[A][F], p), r(h[A][D], h[v][F])), w);
    }
    var y = h[d[s - 1]][s - 1];
    return f ? l(y) : y;
  }
}), hi = "inv", u0 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], o0 = /* @__PURE__ */ ee(hi, u0, (e) => {
  var {
    typed: n,
    matrix: t,
    divideScalar: i,
    addScalar: r,
    multiply: a,
    unaryMinus: o,
    det: l,
    identity: c,
    abs: h
  } = e;
  return n(hi, {
    "Array | Matrix": function(f) {
      var d = _e(f) ? f.size() : $e(f);
      switch (d.length) {
        case 1:
          if (d[0] === 1)
            return _e(f) ? t([i(1, f.valueOf()[0])]) : [i(1, f[0])];
          throw new RangeError("Matrix must be square (size: " + Oe(d) + ")");
        case 2: {
          var D = d[0], v = d[1];
          if (D === v)
            return _e(f) ? t(s(f.valueOf(), D, v), f.storage()) : s(f, D, v);
          throw new RangeError("Matrix must be square (size: " + Oe(d) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Oe(d) + ")");
      }
    },
    any: function(f) {
      return i(1, f);
    }
  });
  function s(u, f, d) {
    var D, v, m, p, w;
    if (f === 1) {
      if (p = u[0][0], p === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(1, p)]];
    } else if (f === 2) {
      var g = l(u);
      if (g === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[i(u[1][1], g), i(o(u[0][1]), g)], [i(o(u[1][0]), g), i(u[0][0], g)]];
    } else {
      var A = u.concat();
      for (D = 0; D < f; D++)
        A[D] = A[D].concat();
      for (var F = c(f).valueOf(), y = 0; y < d; y++) {
        var C = h(A[y][y]), b = y;
        for (D = y + 1; D < f; )
          h(A[D][y]) > C && (C = h(A[D][y]), b = D), D++;
        if (C === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        D = b, D !== y && (w = A[y], A[y] = A[D], A[D] = w, w = F[y], F[y] = F[D], F[D] = w);
        var E = A[y], S = F[y];
        for (D = 0; D < f; D++) {
          var M = A[D], x = F[D];
          if (D !== y) {
            if (M[y] !== 0) {
              for (m = i(o(M[y]), E[y]), v = y; v < d; v++)
                M[v] = r(M[v], a(m, E[v]));
              for (v = 0; v < d; v++)
                x[v] = r(x[v], a(m, S[v]));
            }
          } else {
            for (m = E[y], v = y; v < d; v++)
              M[v] = i(M[v], m);
            for (v = 0; v < d; v++)
              x[v] = i(x[v], m);
          }
        }
      }
      return F;
    }
  }
});
function s0(e) {
  var {
    addScalar: n,
    subtract: t,
    flatten: i,
    multiply: r,
    multiplyScalar: a,
    divideScalar: o,
    sqrt: l,
    abs: c,
    bignumber: h,
    diag: s,
    size: u,
    reshape: f,
    inv: d,
    qr: D,
    usolve: v,
    usolveAll: m,
    equal: p,
    complex: w,
    larger: g,
    smaller: A,
    matrixFromColumns: F,
    dot: y
  } = e;
  function C(P, q, Z, ne) {
    var k = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, U = b(P, q, Z, ne, k);
    E(P, q, Z, ne, k, U);
    var {
      values: Q,
      C: X
    } = S(P, q, Z, ne, k);
    if (k) {
      var J = M(P, q, X, U, Q, Z, ne);
      return {
        values: Q,
        eigenvectors: J
      };
    }
    return {
      values: Q
    };
  }
  function b(P, q, Z, ne, k) {
    var U = ne === "BigNumber", Q = ne === "Complex", X = U ? h(0) : 0, J = U ? h(1) : Q ? w(1) : 1, ue = U ? h(1) : 1, j = U ? h(10) : 2, se = a(j, j), le;
    k && (le = Array(q).fill(J));
    for (var pe = !1; !pe; ) {
      pe = !0;
      for (var De = 0; De < q; De++) {
        for (var Ae = X, he = X, be = 0; be < q; be++)
          De !== be && (Ae = n(Ae, c(P[be][De])), he = n(he, c(P[De][be])));
        if (!p(Ae, 0) && !p(he, 0)) {
          for (var Ee = ue, Se = Ae, Ve = o(he, j), N = a(he, j); A(Se, Ve); )
            Se = a(Se, se), Ee = a(Ee, j);
          for (; g(Se, N); )
            Se = o(Se, se), Ee = o(Ee, j);
          var _ = A(o(n(Se, he), Ee), a(n(Ae, he), 0.95));
          if (_) {
            pe = !1;
            for (var L = o(1, Ee), R = 0; R < q; R++)
              De !== R && (P[De][R] = a(P[De][R], L), P[R][De] = a(P[R][De], Ee));
            k && (le[De] = a(le[De], L));
          }
        }
      }
    }
    return k ? s(le) : null;
  }
  function E(P, q, Z, ne, k, U) {
    var Q = ne === "BigNumber", X = ne === "Complex", J = Q ? h(0) : X ? w(0) : 0;
    Q && (Z = h(Z));
    for (var ue = 0; ue < q - 2; ue++) {
      for (var j = 0, se = J, le = ue + 1; le < q; le++) {
        var pe = P[le][ue];
        A(c(se), c(pe)) && (se = pe, j = le);
      }
      if (!A(c(se), Z)) {
        if (j !== ue + 1) {
          var De = P[j];
          P[j] = P[ue + 1], P[ue + 1] = De;
          for (var Ae = 0; Ae < q; Ae++) {
            var he = P[Ae][j];
            P[Ae][j] = P[Ae][ue + 1], P[Ae][ue + 1] = he;
          }
          if (k) {
            var be = U[j];
            U[j] = U[ue + 1], U[ue + 1] = be;
          }
        }
        for (var Ee = ue + 2; Ee < q; Ee++) {
          var Se = o(P[Ee][ue], se);
          if (Se !== 0) {
            for (var Ve = 0; Ve < q; Ve++)
              P[Ee][Ve] = t(P[Ee][Ve], a(Se, P[ue + 1][Ve]));
            for (var N = 0; N < q; N++)
              P[N][ue + 1] = n(P[N][ue + 1], a(Se, P[N][Ee]));
            if (k)
              for (var _ = 0; _ < q; _++)
                U[Ee][_] = t(U[Ee][_], a(Se, U[ue + 1][_]));
          }
        }
      }
    }
    return U;
  }
  function S(P, q, Z, ne, k) {
    var U = ne === "BigNumber", Q = ne === "Complex", X = U ? h(1) : Q ? w(1) : 1;
    U && (Z = h(Z));
    for (var J = Ce(P), ue = [], j = q, se = [], le = k ? s(Array(q).fill(X)) : void 0, pe = k ? s(Array(j).fill(X)) : void 0, De = 0; De <= 100; ) {
      De += 1;
      for (var Ae = J[j - 1][j - 1], he = 0; he < j; he++)
        J[he][he] = t(J[he][he], Ae);
      var {
        Q: be,
        R: Ee
      } = D(J);
      J = r(Ee, be);
      for (var Se = 0; Se < j; Se++)
        J[Se][Se] = n(J[Se][Se], Ae);
      if (k && (pe = r(pe, be)), j === 1 || A(c(J[j - 1][j - 2]), Z)) {
        De = 0, ue.push(J[j - 1][j - 1]), k && (se.unshift([[1]]), T(pe, q), le = r(le, pe), j > 1 && (pe = s(Array(j - 1).fill(X)))), j -= 1, J.pop();
        for (var Ve = 0; Ve < j; Ve++)
          J[Ve].pop();
      } else if (j === 2 || A(c(J[j - 2][j - 3]), Z)) {
        De = 0;
        var N = x(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1]);
        ue.push(...N), k && (se.unshift(I(J[j - 2][j - 2], J[j - 2][j - 1], J[j - 1][j - 2], J[j - 1][j - 1], N[0], N[1], Z, ne)), T(pe, q), le = r(le, pe), j > 2 && (pe = s(Array(j - 2).fill(X)))), j -= 2, J.pop(), J.pop();
        for (var _ = 0; _ < j; _++)
          J[_].pop(), J[_].pop();
      }
      if (j === 0)
        break;
    }
    if (ue.sort((H, Y) => +t(c(H), c(Y))), De > 100) {
      var L = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + ue.join(", "));
      throw L.values = ue, L.vectors = [], L;
    }
    var R = k ? r(le, O(se, q)) : void 0;
    return {
      values: ue,
      C: R
    };
  }
  function M(P, q, Z, ne, k, U, Q) {
    var X = d(Z), J = r(X, P, Z), ue = Q === "BigNumber", j = Q === "Complex", se = ue ? h(0) : j ? w(0) : 0, le = ue ? h(1) : j ? w(1) : 1, pe = [], De = [];
    for (var Ae of k) {
      var he = B(pe, Ae, p);
      he === -1 ? (pe.push(Ae), De.push(1)) : De[he] += 1;
    }
    for (var be = [], Ee = pe.length, Se = Array(q).fill(se), Ve = s(Array(q).fill(le)), N = function() {
      var R = pe[_], H = t(J, r(R, Ve)), Y = m(H, Se);
      for (Y.shift(); Y.length < De[_]; ) {
        var ae = G(H, q, Y, U, Q);
        if (ae === null)
          break;
        Y.push(ae);
      }
      var te = r(d(ne), Z);
      Y = Y.map((ie) => r(te, ie)), be.push(...Y.map((ie) => ({
        value: R,
        vector: i(ie)
      })));
    }, _ = 0; _ < Ee; _++)
      N();
    return be;
  }
  function x(P, q, Z, ne) {
    var k = n(P, ne), U = t(a(P, ne), a(q, Z)), Q = a(k, 0.5), X = a(l(t(a(k, k), a(4, U))), 0.5);
    return [n(Q, X), t(Q, X)];
  }
  function I(P, q, Z, ne, k, U, Q, X) {
    var J = X === "BigNumber", ue = X === "Complex", j = J ? h(0) : ue ? w(0) : 0, se = J ? h(1) : ue ? w(1) : 1;
    if (A(c(Z), Q))
      return [[se, j], [j, se]];
    if (g(c(t(k, U)), Q))
      return [[t(k, ne), t(U, ne)], [Z, Z]];
    var le = t(P, k), pe = t(ne, k);
    return A(c(q), Q) && A(c(pe), Q) ? [[le, se], [Z, j]] : [[q, j], [pe, se]];
  }
  function T(P, q) {
    for (var Z = 0; Z < P.length; Z++)
      P[Z].push(...Array(q - P[Z].length).fill(0));
    for (var ne = P.length; ne < q; ne++)
      P.push(Array(q).fill(0)), P[ne][ne] = 1;
    return P;
  }
  function O(P, q) {
    for (var Z = [], ne = 0; ne < q; ne++)
      Z[ne] = Array(q).fill(0);
    var k = 0;
    for (var U of P) {
      for (var Q = U.length, X = 0; X < Q; X++)
        for (var J = 0; J < Q; J++)
          Z[k + X][k + J] = U[X][J];
      k += Q;
    }
    return Z;
  }
  function B(P, q, Z) {
    for (var ne = 0; ne < P.length; ne++)
      if (Z(P[ne], q))
        return ne;
    return -1;
  }
  function G(P, q, Z, ne, k) {
    for (var U = k === "BigNumber" ? h(1e3) : 1e3, Q, X = 0; X < 5; ++X) {
      Q = $(q, Z, k);
      try {
        Q = v(P, Q);
      } catch {
        continue;
      }
      if (g(V(Q), U))
        break;
    }
    if (X >= 5)
      return null;
    for (X = 0; ; ) {
      var J = v(P, Q);
      if (A(V(z(Q, [J])), ne))
        break;
      if (++X >= 10)
        return null;
      Q = K(J);
    }
    return Q;
  }
  function $(P, q, Z) {
    var ne = Z === "BigNumber", k = Z === "Complex", U = Array(P).fill(0).map((Q) => 2 * Math.random() - 1);
    return ne && (U = U.map((Q) => h(Q))), k && (U = U.map((Q) => w(Q))), U = z(U, q), K(U, Z);
  }
  function z(P, q) {
    var Z = u(P);
    for (var ne of q)
      ne = f(ne, Z), P = t(P, r(o(y(ne, P), y(ne, ne)), ne));
    return P;
  }
  function V(P) {
    return c(l(y(P, P)));
  }
  function K(P, q) {
    var Z = q === "BigNumber", ne = q === "Complex", k = Z ? h(1) : ne ? w(1) : 1;
    return r(o(k, V(P)), P);
  }
  return C;
}
function f0(e) {
  var {
    config: n,
    addScalar: t,
    subtract: i,
    abs: r,
    atan: a,
    cos: o,
    sin: l,
    multiplyScalar: c,
    inv: h,
    bignumber: s,
    multiply: u,
    add: f
  } = e;
  function d(E, S) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : n.epsilon, x = arguments.length > 3 ? arguments[3] : void 0, I = arguments.length > 4 ? arguments[4] : void 0;
    if (x === "number")
      return D(E, M, I);
    if (x === "BigNumber")
      return v(E, M, I);
    throw TypeError("Unsupported data type: " + x);
  }
  function D(E, S, M) {
    var x = E.length, I = Math.abs(S / x), T, O;
    if (M) {
      O = new Array(x);
      for (var B = 0; B < x; B++)
        O[B] = Array(x).fill(0), O[B][B] = 1;
    }
    for (var G = y(E); Math.abs(G[1]) >= Math.abs(I); ) {
      var $ = G[0][0], z = G[0][1];
      T = m(E[$][$], E[z][z], E[$][z]), E = F(E, T, $, z), M && (O = w(O, T, $, z)), G = y(E);
    }
    for (var V = Array(x).fill(0), K = 0; K < x; K++)
      V[K] = E[K][K];
    return b(Ce(V), O, M);
  }
  function v(E, S, M) {
    var x = E.length, I = r(S / x), T, O;
    if (M) {
      O = new Array(x);
      for (var B = 0; B < x; B++)
        O[B] = Array(x).fill(0), O[B][B] = 1;
    }
    for (var G = C(E); r(G[1]) >= r(I); ) {
      var $ = G[0][0], z = G[0][1];
      T = p(E[$][$], E[z][z], E[$][z]), E = A(E, T, $, z), M && (O = g(O, T, $, z)), G = C(E);
    }
    for (var V = Array(x).fill(0), K = 0; K < x; K++)
      V[K] = E[K][K];
    return b(Ce(V), O, M);
  }
  function m(E, S, M) {
    var x = S - E;
    return Math.abs(x) <= n.epsilon ? Math.PI / 4 : 0.5 * Math.atan(2 * M / (S - E));
  }
  function p(E, S, M) {
    var x = i(S, E);
    return r(x) <= n.epsilon ? s(-1).acos().div(4) : c(0.5, a(u(2, M, h(x))));
  }
  function w(E, S, M, x) {
    for (var I = E.length, T = Math.cos(S), O = Math.sin(S), B = Array(I).fill(0), G = Array(I).fill(0), $ = 0; $ < I; $++)
      B[$] = T * E[$][M] - O * E[$][x], G[$] = O * E[$][M] + T * E[$][x];
    for (var z = 0; z < I; z++)
      E[z][M] = B[z], E[z][x] = G[z];
    return E;
  }
  function g(E, S, M, x) {
    for (var I = E.length, T = o(S), O = l(S), B = Array(I).fill(s(0)), G = Array(I).fill(s(0)), $ = 0; $ < I; $++)
      B[$] = i(c(T, E[$][M]), c(O, E[$][x])), G[$] = t(c(O, E[$][M]), c(T, E[$][x]));
    for (var z = 0; z < I; z++)
      E[z][M] = B[z], E[z][x] = G[z];
    return E;
  }
  function A(E, S, M, x) {
    for (var I = E.length, T = s(o(S)), O = s(l(S)), B = c(T, T), G = c(O, O), $ = Array(I).fill(s(0)), z = Array(I).fill(s(0)), V = u(s(2), T, O, E[M][x]), K = t(i(c(B, E[M][M]), V), c(G, E[x][x])), P = f(c(G, E[M][M]), V, c(B, E[x][x])), q = 0; q < I; q++)
      $[q] = i(c(T, E[M][q]), c(O, E[x][q])), z[q] = t(c(O, E[M][q]), c(T, E[x][q]));
    E[M][M] = K, E[x][x] = P, E[M][x] = s(0), E[x][M] = s(0);
    for (var Z = 0; Z < I; Z++)
      Z !== M && Z !== x && (E[M][Z] = $[Z], E[Z][M] = $[Z], E[x][Z] = z[Z], E[Z][x] = z[Z]);
    return E;
  }
  function F(E, S, M, x) {
    for (var I = E.length, T = Math.cos(S), O = Math.sin(S), B = T * T, G = O * O, $ = Array(I).fill(0), z = Array(I).fill(0), V = B * E[M][M] - 2 * T * O * E[M][x] + G * E[x][x], K = G * E[M][M] + 2 * T * O * E[M][x] + B * E[x][x], P = 0; P < I; P++)
      $[P] = T * E[M][P] - O * E[x][P], z[P] = O * E[M][P] + T * E[x][P];
    E[M][M] = V, E[x][x] = K, E[M][x] = 0, E[x][M] = 0;
    for (var q = 0; q < I; q++)
      q !== M && q !== x && (E[M][q] = $[q], E[q][M] = $[q], E[x][q] = z[q], E[q][x] = z[q]);
    return E;
  }
  function y(E) {
    for (var S = E.length, M = 0, x = [0, 1], I = 0; I < S; I++)
      for (var T = I + 1; T < S; T++)
        Math.abs(M) < Math.abs(E[I][T]) && (M = Math.abs(E[I][T]), x = [I, T]);
    return [x, M];
  }
  function C(E) {
    for (var S = E.length, M = 0, x = [0, 1], I = 0; I < S; I++)
      for (var T = I + 1; T < S; T++)
        r(M) < r(E[I][T]) && (M = r(E[I][T]), x = [I, T]);
    return [x, M];
  }
  function b(E, S, M) {
    var x = E.length, I = Array(x), T;
    if (M) {
      T = Array(x);
      for (var O = 0; O < x; O++)
        T[O] = Array(x);
    }
    for (var B = 0; B < x; B++) {
      for (var G = 0, $ = E[0], z = 0; z < E.length; z++)
        r(E[z]) < r($) && (G = z, $ = E[G]);
      if (I[B] = E.splice(G, 1)[0], M)
        for (var V = 0; V < x; V++)
          T[B][V] = S[V][G], S[V].splice(G, 1);
    }
    if (!M)
      return {
        values: I
      };
    var K = T.map((P, q) => ({
      value: I[q],
      vector: P
    }));
    return {
      values: I,
      eigenvectors: K
    };
  }
  return d;
}
var c0 = "eigs", l0 = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], h0 = /* @__PURE__ */ ee(c0, l0, (e) => {
  var {
    config: n,
    typed: t,
    matrix: i,
    addScalar: r,
    subtract: a,
    equal: o,
    abs: l,
    atan: c,
    cos: h,
    sin: s,
    multiplyScalar: u,
    divideScalar: f,
    inv: d,
    bignumber: D,
    multiply: v,
    add: m,
    larger: p,
    column: w,
    flatten: g,
    number: A,
    complex: F,
    sqrt: y,
    diag: C,
    size: b,
    reshape: E,
    qr: S,
    usolve: M,
    usolveAll: x,
    im: I,
    re: T,
    smaller: O,
    matrixFromColumns: B,
    dot: G
  } = e, $ = f0({
    config: n,
    addScalar: r,
    subtract: a,
    column: w,
    flatten: g,
    equal: o,
    abs: l,
    atan: c,
    cos: h,
    sin: s,
    multiplyScalar: u,
    inv: d,
    bignumber: D,
    complex: F,
    multiply: v,
    add: m
  }), z = s0({
    config: n,
    addScalar: r,
    subtract: a,
    multiply: v,
    multiplyScalar: u,
    flatten: g,
    divideScalar: f,
    sqrt: y,
    abs: l,
    bignumber: D,
    diag: C,
    size: b,
    reshape: E,
    qr: S,
    inv: d,
    usolve: M,
    usolveAll: x,
    equal: o,
    complex: F,
    larger: p,
    smaller: O,
    matrixFromColumns: B,
    dot: G
  });
  return t("eigs", {
    // The conversion to matrix in the first two implementations,
    // just to convert back to an array right away in
    // computeValuesAndVectors, is unfortunate, and should perhaps be
    // streamlined. It is done because the Matrix object carries some
    // type information about its entries, and so constructing the matrix
    // is a roundabout way of doing type detection.
    Array: function(U) {
      return V(i(U));
    },
    "Array, number|BigNumber": function(U, Q) {
      return V(i(U), {
        precision: Q
      });
    },
    "Array, Object"(k, U) {
      return V(i(k), U);
    },
    Matrix: function(U) {
      return V(U, {
        matricize: !0
      });
    },
    "Matrix, number|BigNumber": function(U, Q) {
      return V(U, {
        precision: Q,
        matricize: !0
      });
    },
    "Matrix, Object": function(U, Q) {
      var X = {
        matricize: !0
      };
      return Ir(X, Q), V(U, X);
    }
  });
  function V(k) {
    var U, Q = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = "eigenvectors" in Q ? Q.eigenvectors : !0, J = (U = Q.precision) !== null && U !== void 0 ? U : n.epsilon, ue = K(k, J, X);
    return Q.matricize && (ue.values = i(ue.values), X && (ue.eigenvectors = ue.eigenvectors.map((j) => {
      var {
        value: se,
        vector: le
      } = j;
      return {
        value: se,
        vector: i(le)
      };
    }))), X && Object.defineProperty(ue, "vectors", {
      enumerable: !1,
      // to make sure that the eigenvectors can still be
      // converted to string.
      get: () => {
        throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
      }
    }), ue;
  }
  function K(k, U, Q) {
    var X = k.toArray(), J = k.size();
    if (J.length !== 2 || J[0] !== J[1])
      throw new RangeError("Matrix must be square (size: ".concat(Oe(J), ")"));
    var ue = J[0];
    if (q(X, ue, U) && (Z(X, ue), P(X, ue, U))) {
      var j = ne(k, X, ue);
      return $(X, ue, U, j, Q);
    }
    var se = ne(k, X, ue);
    return z(X, ue, U, se, Q);
  }
  function P(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = X; J < U; J++)
        if (p(D(l(a(k[X][J], k[J][X]))), Q))
          return !1;
    return !0;
  }
  function q(k, U, Q) {
    for (var X = 0; X < U; X++)
      for (var J = 0; J < U; J++)
        if (p(D(l(I(k[X][J]))), Q))
          return !1;
    return !0;
  }
  function Z(k, U) {
    for (var Q = 0; Q < U; Q++)
      for (var X = 0; X < U; X++)
        k[Q][X] = T(k[Q][X]);
  }
  function ne(k, U, Q) {
    var X = k.datatype();
    if (X === "number" || X === "BigNumber" || X === "Complex")
      return X;
    for (var J = !1, ue = !1, j = !1, se = 0; se < Q; se++)
      for (var le = 0; le < Q; le++) {
        var pe = U[se][le];
        if (Le(pe) || Jt(pe))
          J = !0;
        else if (Re(pe))
          ue = !0;
        else if (Yt(pe))
          j = !0;
        else
          throw TypeError("Unsupported type in Matrix: " + lr(pe));
      }
    if (ue && j && console.warn("Complex BigNumbers not supported, this operation will lose precission."), j) {
      for (var De = 0; De < Q; De++)
        for (var Ae = 0; Ae < Q; Ae++)
          U[De][Ae] = F(U[De][Ae]);
      return "Complex";
    }
    if (ue) {
      for (var he = 0; he < Q; he++)
        for (var be = 0; be < Q; be++)
          U[he][be] = D(U[he][be]);
      return "BigNumber";
    }
    if (J) {
      for (var Ee = 0; Ee < Q; Ee++)
        for (var Se = 0; Se < Q; Se++)
          U[Ee][Se] = A(U[Ee][Se]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
}), Wr = /* @__PURE__ */ es({
  config: je
}), xt = /* @__PURE__ */ is({}), Wt = /* @__PURE__ */ ss({}), kt = /* @__PURE__ */ ls({}), Je = /* @__PURE__ */ ds({
  Matrix: kt
}), ce = /* @__PURE__ */ to({
  BigNumber: Wr,
  Complex: xt,
  DenseMatrix: Je,
  Fraction: Wt
}), kr = /* @__PURE__ */ Ks({
  typed: ce
}), Er = /* @__PURE__ */ ks({
  typed: ce
}), v0 = /* @__PURE__ */ pl({
  typed: ce
}), jt = /* @__PURE__ */ Ls({
  BigNumber: Wr,
  typed: ce
}), en = /* @__PURE__ */ Ps({
  Complex: xt,
  typed: ce
}), Nt = /* @__PURE__ */ Gf({
  typed: ce
}), d0 = /* @__PURE__ */ gl({
  typed: ce
}), cr = /* @__PURE__ */ bs({
  config: je,
  typed: ce
}), p0 = /* @__PURE__ */ ic({
  typed: ce
}), m0 = /* @__PURE__ */ Jf({
  typed: ce
}), va = /* @__PURE__ */ ms({
  typed: ce
}), g0 = /* @__PURE__ */ Ds({
  typed: ce
}), da = /* @__PURE__ */ ws({
  typed: ce
}), Fr = /* @__PURE__ */ _f({
  typed: ce
}), rn = /* @__PURE__ */ Ts({
  typed: ce
}), D0 = /* @__PURE__ */ Xf({
  typed: ce
}), y0 = /* @__PURE__ */ Of({
  BigNumber: Wr,
  Fraction: Wt,
  complex: en,
  typed: ce
}), w0 = /* @__PURE__ */ yl({
  typed: ce
}), Ur = /* @__PURE__ */ xs({
  Matrix: kt,
  equalScalar: cr,
  typed: ce
}), Sr = /* @__PURE__ */ ef({
  typed: ce
}), A0 = /* @__PURE__ */ Es({
  typed: ce
}), tn = /* @__PURE__ */ qf({
  Complex: xt,
  config: je,
  typed: ce
}), jr = /* @__PURE__ */ Xs({
  typed: ce
}), pa = /* @__PURE__ */ Vs({
  Fraction: Wt,
  typed: ce
}), we = /* @__PURE__ */ Gs({
  DenseMatrix: Je,
  Matrix: kt,
  SparseMatrix: Ur,
  typed: ce
}), E0 = /* @__PURE__ */ Nc({
  bignumber: jt,
  fraction: pa,
  number: rn
}), F0 = /* @__PURE__ */ lc({
  isInteger: va,
  matrix: we,
  typed: ce
}), et = /* @__PURE__ */ vc({
  matrix: we,
  config: je,
  typed: ce
}), Cr = /* @__PURE__ */ pc({
  matrix: we,
  typed: ce
}), qe = /* @__PURE__ */ Ec({
  matrix: we,
  typed: ce
}), He = /* @__PURE__ */ Mc({
  BigNumber: Wr,
  config: je,
  matrix: we,
  typed: ce
}), xr = /* @__PURE__ */ Kf({
  isInteger: va,
  matrix: we,
  typed: ce
}), C0 = /* @__PURE__ */ Cc({
  conj: Nt,
  transpose: qe,
  typed: ce
}), b0 = /* @__PURE__ */ ec({
  DenseMatrix: Je,
  SparseMatrix: Ur,
  matrix: we,
  typed: ce
}), pr = /* @__PURE__ */ _c({
  numeric: E0,
  typed: ce
}), ma = /* @__PURE__ */ Uc({
  DenseMatrix: Je,
  concat: xr,
  equalScalar: cr,
  matrix: we,
  typed: ce
}), ga = /* @__PURE__ */ tc({
  matrix: we,
  typed: ce
}), rt = /* @__PURE__ */ uc({
  BigNumber: Wr,
  DenseMatrix: Je,
  SparseMatrix: Ur,
  config: je,
  matrix: we,
  typed: ce
}), Da = /* @__PURE__ */ jc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: we,
  typed: ce
}), M0 = /* @__PURE__ */ Oc({
  DenseMatrix: Je,
  divideScalar: pr,
  equalScalar: cr,
  matrix: we,
  multiplyScalar: Fr,
  subtractScalar: Sr,
  typed: ce
}), S0 = /* @__PURE__ */ Js({
  flatten: ga,
  matrix: we,
  size: et,
  typed: ce
}), x0 = /* @__PURE__ */ _l({
  addScalar: Er,
  complex: en,
  conj: Nt,
  divideScalar: pr,
  equal: ma,
  identity: rt,
  isZero: da,
  matrix: we,
  multiplyScalar: Fr,
  sign: y0,
  sqrt: tn,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr,
  zeros: He
}), tt = /* @__PURE__ */ Gc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: we,
  typed: ce
}), nr = /* @__PURE__ */ Rf({
  DenseMatrix: Je,
  concat: xr,
  equalScalar: cr,
  matrix: we,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), ya = /* @__PURE__ */ $c({
  DenseMatrix: Je,
  divideScalar: pr,
  equalScalar: cr,
  matrix: we,
  multiplyScalar: Fr,
  subtractScalar: Sr,
  typed: ce
}), ur = /* @__PURE__ */ Al({
  DenseMatrix: Je,
  SparseMatrix: Ur,
  addScalar: Er,
  concat: xr,
  equalScalar: cr,
  matrix: we,
  typed: ce
}), wa = /* @__PURE__ */ bl({
  addScalar: Er,
  conj: Nt,
  multiplyScalar: Fr,
  size: et,
  typed: ce
}), N0 = /* @__PURE__ */ nl({
  DenseMatrix: Je,
  smaller: tt
}), Aa = /* @__PURE__ */ ul({
  ImmutableDenseMatrix: N0,
  getMatrixDataType: p0
}), Vr = /* @__PURE__ */ Kc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: we,
  typed: ce
}), oe = /* @__PURE__ */ Tf({
  addScalar: Er,
  dot: wa,
  equalScalar: cr,
  matrix: we,
  multiplyScalar: Fr,
  typed: ce
}), B0 = /* @__PURE__ */ r0({
  SparseMatrix: Ur,
  abs: kr,
  add: ur,
  divideScalar: pr,
  larger: Vr,
  largerEq: Da,
  multiply: oe,
  subtract: nr,
  transpose: qe,
  typed: ce
}), ye = /* @__PURE__ */ gc({
  add: ur,
  matrix: we,
  typed: ce,
  zeros: He
}), _0 = /* @__PURE__ */ Pc({
  DenseMatrix: Je,
  divideScalar: pr,
  equalScalar: cr,
  matrix: we,
  multiplyScalar: Fr,
  subtractScalar: Sr,
  typed: ce
}), z0 = /* @__PURE__ */ a0({
  divideScalar: pr,
  isZero: da,
  matrix: we,
  multiply: oe,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), T0 = /* @__PURE__ */ fl({
  larger: Vr,
  smaller: tt
}), ge = /* @__PURE__ */ Sl({
  Index: Aa,
  typed: ce
}), I0 = /* @__PURE__ */ Qc({
  DenseMatrix: Je,
  concat: xr,
  config: je,
  matrix: we,
  typed: ce
}), Tr = /* @__PURE__ */ fc({
  bignumber: jt,
  matrix: we,
  add: ur,
  config: je,
  isPositive: g0,
  larger: Vr,
  largerEq: Da,
  smaller: tt,
  smallerEq: I0,
  typed: ce
}), O0 = /* @__PURE__ */ hl({
  FibonacciHeap: T0,
  addScalar: Er,
  equalScalar: cr
}), L0 = /* @__PURE__ */ kf({
  Index: Aa,
  matrix: we,
  range: Tr,
  typed: ce
}), or = /* @__PURE__ */ o0({
  abs: kr,
  addScalar: Er,
  det: z0,
  divideScalar: pr,
  identity: rt,
  matrix: we,
  multiply: oe,
  typed: ce,
  unaryMinus: jr
}), $0 = /* @__PURE__ */ Nl({
  DenseMatrix: Je,
  Spa: O0,
  SparseMatrix: Ur,
  abs: kr,
  addScalar: Er,
  divideScalar: pr,
  equalScalar: cr,
  larger: Vr,
  matrix: we,
  multiplyScalar: Fr,
  subtractScalar: Sr,
  typed: ce,
  unaryMinus: jr
}), q0 = /* @__PURE__ */ Tc({
  Complex: xt,
  config: je,
  fraction: pa,
  identity: rt,
  inv: or,
  matrix: we,
  multiply: oe,
  number: rn,
  typed: ce
}), P0 = /* @__PURE__ */ n0({
  DenseMatrix: Je,
  lsolve: M0,
  lup: $0,
  matrix: we,
  slu: B0,
  typed: ce,
  usolve: ya
}), R0 = /* @__PURE__ */ h0({
  abs: kr,
  add: ur,
  addScalar: Er,
  atan: v0,
  bignumber: jt,
  column: L0,
  complex: en,
  config: je,
  cos: d0,
  diag: b0,
  divideScalar: pr,
  dot: wa,
  equal: ma,
  flatten: ga,
  im: m0,
  inv: or,
  larger: Vr,
  matrix: we,
  matrixFromColumns: S0,
  multiply: oe,
  multiplyScalar: Fr,
  number: rn,
  qr: x0,
  re: D0,
  reshape: F0,
  sin: w0,
  size: et,
  smaller: tt,
  sqrt: tn,
  subtract: nr,
  typed: ce,
  usolve: ya,
  usolveAll: _0
}), vi = /* @__PURE__ */ Fl({
  abs: kr,
  add: ur,
  conj: Nt,
  ctranspose: C0,
  eigs: R0,
  equalScalar: cr,
  larger: Vr,
  matrix: we,
  multiply: oe,
  pow: q0,
  smaller: tt,
  sqrt: tn,
  typed: ce
});
class U0 {
  /**
   * Node constructor
   * @param label number
   * @param coords coordinates
   * @param bcs boundary conditions {code:string]:boolean}
   */
  constructor(n, t, i = [0, 0, 0], r = []) {
    fe(this, "label");
    // Node number
    fe(this, "domain");
    // domain reference
    fe(this, "coords");
    // ([float,float,float])* coordinates [m]
    //bcs: Set<DofID>; // for each DOF (identified by string id) the bc is applied
    //Note: prescribed values to be specified via boundaryCondition class
    fe(this, "bcs");
    //Node local coordinate system. In this c.s. boundary conditions are applied and results obtained
    /**
     * Triplet defining the local coordinate system in node.
     * Value at position (i,j) represents angle between e'(i) and e(j),
     * where e' is base vector of local coordinate system and e is
     * base vector of global c.s.
     */
    fe(this, "lcs");
    this.label = n.toString(), this.domain = t, this.coords = i, this.bcs = new Set(r), this.lcs = void 0;
  }
  /**
   * Change properties
   * @param label new label
   * @param coords new coordinates
   * @param bcs new dictionary with applied boundary conditions
   */
  change(n, t, i = []) {
    n != null && (this.label = n.toString()), t != null && (this.coords = t), i != null && (this.bcs = new Set(i));
  }
  change2(n) {
    n.label != null && (this.label = n.label.toString()), n.coords != null && (this.coords = n.coords), n.bcs != null && (this.bcs = new Set(n.bcs)), n.lcs != null && this.updateLcs(n.lcs);
  }
  getLocationArray(n) {
    return this.domain.solver.getNodeLocationArray(this.label, n);
  }
  getUnknowns(n, t) {
    const i = this.getLocationArray(t);
    return ye(n.r, ge(i));
  }
  getEigenValueUnknowns(n, t, i) {
    const r = this.getLocationArray(t);
    return ye(n.eigenVectors[i], ge(r));
  }
  /**
   * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
   * @param dofs dofs mask to consider
   */
  getTransformationMtrx(n) {
    const t = n.length;
    if (this.lcs == null)
      return rt(t);
    {
      const i = He([t, t]);
      for (let r = 0; r < t; r++) {
        const a = n[r];
        switch (a) {
          case Pe.Dx:
          case Pe.Dy:
          case Pe.Dz:
            for (let o = 0; o < t; o++) {
              const l = n[o];
              (l == Pe.Dx || l == Pe.Dy || l == Pe.Dz) && (i[r][o] = this.lcs[l][a]);
            }
            break;
          case Pe.Rx:
          case Pe.Ry:
          case Pe.Rz:
            for (let o = 0; o < t; o++) {
              const l = n[o];
              (l == Pe.Rx || l == Pe.Ry || l == Pe.Rz) && (i[r][o] = this.lcs[l - Pe.Rx][a - Pe.Rx]);
            }
            break;
          default:
            throw new TypeError("Unknown DofID: " + a);
        }
      }
      return we(i);
    }
  }
  /**
   * Updates the reciver lcs triplet according to given lcs orientation
   * @param lcs
   */
  updateLcs(n) {
    if (n == null)
      this.lcs = void 0;
    else {
      this.lcs = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      const t = vi(n.locx), i = vi(n.locy);
      for (let r = 0; r < 3; r++)
        this.lcs[0][r] = n.locx[r] / t, this.lcs[1][r] = n.locy[r] / i;
      this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1], this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2], this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
    }
  }
  /**
   * Returns true if receiver has local c.s.
   */
  hasLcs() {
    return this.lcs != null;
  }
  getReactions(n, t = !1) {
    if (t && this.hasLcs()) {
      const i = this.domain.solver.getNodeDofIDs(this.label), r = this.getLocationArray(i), a = [];
      for (let l = 0; l < i.length; l++)
        this.bcs.has(i[l]) ? a.push(ye(n.R, ge([r[l] - this.domain.solver.neq]))) : a.push(0);
      const o = this.getTransformationMtrx(i);
      return {
        dofs: i,
        values: oe(o, a).toArray()
      };
    } else if (this.bcs.size > 0) {
      const i = Array.from(this.bcs), r = this.getLocationArray(i), a = nr(r, this.domain.solver.neq), o = ye(n.R, ge(a));
      return A0(o) === "number" ? { dofs: i, values: [o] } : { dofs: i, values: o };
    } else
      return { dofs: [], values: [] };
  }
}
class V0 {
  // domain reference
  /**
   * Constructor
   * @param label new label
   * @param nodes element nodes
   * @param mat element material number
   * @param cs element cross section number
   */
  constructor(n, t, i, r, a) {
    fe(this, "label");
    //element number
    fe(this, "nodes");
    // element nodes
    fe(this, "mat");
    // material
    fe(this, "cs");
    // cross section
    fe(this, "domain");
    this.label = n.toString(), this.nodes = i.map((o) => o.toString()), this.mat = r.toString(), this.cs = a.toString(), this.domain = t;
  }
  /**
   * Change receiver properties
   * @param label new label
   * @param nodes nodes
   * @param mat new material (number)
   * @param cs new cross section (number)
   */
  change(n, t, i, r) {
    n != null && (this.label = n.toString()), t != null && (this.nodes = t.map((a) => a.toString())), i != null && (this.mat = i.toString()), r != null && (this.cs = r.toString());
  }
  /**
   * Returns Material (object) associated to element
   */
  getMaterial() {
    return this.domain.getMaterial(this.mat);
  }
  /**
   * Returns Cross Section (object) associated to element
   */
  getCS() {
    return this.domain.getCS(this.cs);
  }
  /**
   * Returns array of DOFs for given node
   * @param node node id
   */
  getNodeDofs(n) {
    return [];
  }
  /**
   * Computes global stiffness matrix of element
   */
  computeStiffness() {
  }
  /**
   * Computes global mass matrix of element
   */
  computeMassMatrix() {
  }
  /**
   * Returns element code numbers
   */
  getLocationArray() {
  }
  /**
   * Returns object with element geometry
   */
  computeGeo() {
  }
  /**
   * Returns element transformation matrix frol global to local c.s
   */
  computeT() {
    return we();
  }
}
class Z0 extends V0 {
  /**
   * Constructor
   * @param label element label (num)
   * @param nodes element nodes
   * @param mat element material (num)
   * @param cs element cross section (num)
   * @param hinges array of two boolean values indicating if hinge is present at start or end
   */
  constructor(t, i, r, a, o, l = [!1, !1]) {
    super(t, i, r, a, o);
    fe(this, "hinges");
    // indicates element hinges
    fe(this, "diagonalMassMatrix", !1);
    this.hinges = l;
  }
  getNodeDofs(t) {
    return [Pe.Dx, Pe.Dz, Pe.Ry];
  }
  getLocationArray() {
    let t = Array();
    for (const i of this.nodes)
      t = t.concat(this.domain.solver.getNodeLocationArray(i, [Pe.Dx, Pe.Dz, Pe.Ry]));
    return t;
  }
  // evaluates l, dx, dz
  /**
   * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
   */
  computeGeo() {
    const t = this.domain.getNode(this.nodes[0]).coords, i = this.domain.getNode(this.nodes[1]).coords, r = i[0] - t[0], a = i[2] - t[2];
    return { l: Math.sqrt(r * r + a * a), dx: r, dz: a };
  }
  /**
   * Returns tru if element has start or end hinge (or both)
   */
  hasHinges() {
    return this.hinges[0] || this.hinges[1];
  }
  /**
   * Computes element transformation matrix from local to global (nodal) c.s.
   */
  computeT() {
    const t = this.computeGeo(), i = t.dx / t.l, r = t.dz / t.l;
    let a = we([
      [i, r, 0, 0, 0, 0],
      [-r, i, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, i, r, 0],
      [0, 0, 0, -r, i, 0],
      [0, 0, 0, 0, 0, 1]
    ]);
    if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
      let o = He(6);
      o = ye(
        o,
        ge([0, 1, 2], [0, 1, 2]),
        this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0]))
      ), o = ye(
        o,
        ge([3, 4, 5], [3, 4, 5]),
        this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1]))
      ), a = oe(a, o);
    }
    return a;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalStiffnessMtrx(t = !1) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = r.e * a.a, l = r.e * a.iy, c = i.l, h = c * c, s = h * c, u = 12 * l / (a.k * r.g * a.a * c * c), f = 1 + u, d = we([
      [o / c, 0, 0, -o / c, 0, 0],
      [0, 12 * l / s / f, -6 * l / h / f, 0, -12 * l / s / f, -6 * l / h / f],
      [0, -6 * l / h / f, (4 + u) * l / c / f, 0, 6 * l / h / f, (2 - u) * l / c / f],
      [-o / c, 0, 0, o / c, 0, 0],
      [0, -12 * l / s / f, 6 * l / h / f, 0, 12 * l / s / f, 6 * l / h / f],
      [0, -6 * l / h / f, (2 - u) * l / c / f, 0, 6 * l / h / f, (4 + u) * l / c / f]
    ]);
    if (this.hasHinges()) {
      if (this.hinges[0] && this.hinges[1])
        var D = [0, 1, 3, 4], v = [2, 5];
      else if (this.hinges[0])
        var D = [0, 1, 3, 4, 5], v = [2];
      else if (this.hinges[1])
        var D = [0, 1, 2, 3, 4], v = [5];
      const m = d.subset(ge(D, D)), p = d.subset(ge(D, v)), w = d.subset(ge(v, v)), g = nr(m, oe(oe(p, or(w)), qe(p)));
      let A = He(6, 6);
      return A = ye(A, ge(D, D), g), t ? {
        answer: A,
        a: D,
        b: v,
        kaa: m,
        kab: p,
        kbb: w
      } : { answer: A };
    }
    return { answer: d };
  }
  /**
   * Computes local initial stress matrix
   * @param N normal force
   */
  computeLocalInitialStressMtrx(t) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = i.l, l = o * o, c = t / o, h = 12 * r.e * a.iy / (a.k * r.g * a.a * o * o), s = h * h, u = we([
      [0, 0, 0, 0, 0, 0],
      [0, 6 / 5 + 2 * h + s, -o / 10, 0, -6 / 5 - 2 * h - s, -o / 10],
      [
        0,
        -o / 10,
        2 * l / 15 + l * h / 6 + l * s / 12,
        0,
        o / 10,
        -l / 30 - l * h / 6 - l * s / 12
      ],
      [0, 0, 0, 0, 0, 0],
      [0, -6 / 5 - 2 * h - s, o / 10, 0, 6 / 5 + 2 * h + s, o / 10],
      [
        0,
        -o / 10,
        -l / 30 - l * h / 6 - l * s / 12,
        0,
        o / 10,
        2 * l / 15 + l * h / 6 + l * s / 12
      ]
    ]);
    oe(u, c / (1 + h) / (1 + h));
    const f = Math.min(Math.abs(u[1][1]), Math.abs(u[2][2])) / 1e3;
    if (u[0][0] = f, u[0][3] = -f, u[3][0] = -f, u[3][3] = f, this.hasHinges()) {
      const d = this.computeLocalStiffnessMtrx(!0), D = et(d.a)[0], v = He(6, D);
      ye(v, ge(d.a, Tr(0, D)), rt(D)), ye(
        v,
        ge(d.b, Tr(0, D)),
        oe(oe(or(d.kbb), qe(d.kab)), -1)
      );
      const m = oe(qe(v), oe(u, v)), p = He(6, 6);
      return ye(d.a, ge(d.a, d.a), m), p;
    }
    return u;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalMassMatrix(t = !1) {
    const i = this.computeGeo(), r = this.getMaterial(), a = this.getCS(), o = i.l, l = o * o;
    if (!this.diagonalMassMatrix)
      return oe(
        r.d * a.a * o / 420,
        we([
          [140, 0, 0, 70, 0, 0],
          [0, 156, -22 * o, 0, 54, 13 * o],
          [0, -22 * o, 4 * o * o, 0, -13 * o, -3 * o * o],
          [70, 0, 0, 140, 0, 0],
          [0, 54, -13 * o, 0, 156, 22 * o],
          [0, 13 * o, -3 * o * o, 0, 22 * o, 4 * o * o]
        ])
      );
    const c = 1 / 78;
    return oe(
      r.d * a.a * o,
      we([
        [1 / 2, 0, 0, 0, 0, 0],
        [0, 1 / 2, 0, 0, 0, 0],
        [0, 0, c * l, 0, 0, 0],
        [0, 0, 0, 1 / 2, 0, 0],
        [0, 0, 0, 0, 1 / 2, 0],
        [0, 0, 0, 0, 0, c * l]
      ])
    );
  }
  /**
   * Evaluate element stiffness matrix in global c.s.
   */
  computeStiffness() {
    this.computeGeo();
    const t = this.computeLocalStiffnessMtrx(), i = this.computeT();
    return oe(oe(qe(i), t.answer), i);
  }
  /**
   * Evaluate element mass matrix in global c.s.
   */
  computeMassMatrix() {
    this.computeGeo();
    const t = this.computeLocalMassMatrix(), i = this.computeT();
    return oe(oe(qe(i), t), i);
  }
  /**
   * Evaluates initial stress matrix in global c.s.
   * @param N Element normal force
   */
  computeInitialStressMatrix(t) {
    const i = this.computeLocalInitialStressMtrx(t), r = this.computeT();
    return oe(oe(qe(r), i), r);
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacement(t) {
    const i = this.computeT(), r = this.getLocationArray();
    let a = oe(i, ye(t.r, ge(r)));
    if (this.hasHinges()) {
      const o = this.computeLocalStiffnessMtrx(!0);
      let l = He(6);
      for (const c of t.getElementLoadsOnElement(this.label))
        l = ur(l, c.getLoadVectorForClampedBeam());
      this.hasHinges() && (a = ye(
        a,
        ge(o.b),
        oe(
          or(o.kbb),
          oe(
            ur(
              ye(l, ge(o.b)),
              Cr(oe(qe(o.kab), ye(a, ge(o.a))))
            ),
            -1
          )
        )
      ));
    }
    return a;
  }
  /**
   * Computes element end forces (in element local c.s.)
   * @param lc load case reference
   */
  computeEndForces(t) {
    const i = this.computeT(), r = this.getLocationArray(), a = oe(i, ye(t.r, ge(r))), o = this.computeLocalStiffnessMtrx(!0);
    let l = oe(o.answer, a), c = He(6);
    for (const h of t.getElementLoadsOnElement(this.label))
      c = ur(c, h.getLoadVectorForClampedBeam());
    if (this.hasHinges()) {
      const h = oe(o.kab, or(o.kbb));
      if (o.b.length == 1) {
        const s = c.get(o.b);
        for (let u = 0; u < o.a.length; u++)
          l.set([o.a[u]], l.get([o.a[u]]) + c.get([o.a[u]]) - h.get([u, 0]) * s);
      } else {
        const s = nr(
          ye(c, ge(o.a)),
          oe(h, ye(c, ge(o.b)))
        );
        l = ur(l, ye(l, ge(o.a), s));
      }
    } else
      l = ur(l, c);
    return l;
  }
  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalDefl(t, i) {
    const r = this.computeEndDisplacement(t), a = [], o = [], c = this.computeGeo().l, h = t.getElementLoadsOnElement(this.label);
    for (let s = 0; s <= i; s++) {
      const u = s / i;
      let f = (1 - 3 * u * u + 2 * u * u * u) * r.get([1]) + c * (-u + 2 * u * u - u * u * u) * r.get([2]) + (3 * u * u - 2 * u * u * u) * r.get([4]) + c * (u * u - u * u * u) * r.get([5]), d = (1 - u) * r.get([0]) + u * r.get([3]);
      for (const D of h) {
        const v = D.computeBeamDeflectionContrib(u);
        f += v.w, d += v.u;
      }
      a.push(d), o.push(f);
    }
    return { u: a, w: o };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalDefl(t, i) {
    const r = this.computeLocalDefl(t, i), a = this.computeGeo(), o = a.dx / a.l, l = a.dz / a.l, c = [], h = [];
    for (let s = 0; s <= i; s++)
      c.push(r.u[s] * o - r.w[s] * l), h.push(r.w[s] * o + r.u[s] * l);
    return { u: c, w: h };
  }
  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacementEigenMode(t, i) {
    const r = this.computeT(), a = this.getLocationArray();
    let o = oe(r, ye(t.eigenVectors[i], ge(a)));
    if (this.hasHinges()) {
      const l = this.computeLocalStiffnessMtrx(!0), c = He(6);
      this.hasHinges() && (o = ye(
        o,
        ge(l.b),
        oe(
          or(l.kbb),
          oe(
            ur(
              ye(c, ge(l.b)),
              Cr(oe(qe(l.kab), ye(o, ge(l.a))))
            ),
            -1
          )
        )
      ));
    }
    return o;
  }
  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalEigenMode(t, i, r) {
    const a = this.computeEndDisplacementEigenMode(t, i), o = [], l = [], h = this.computeGeo().l;
    for (let s = 0; s <= r; s++) {
      const u = s / r, f = (1 - 3 * u * u + 2 * u * u * u) * a.get([1]) + h * (-u + 2 * u * u - u * u * u) * a.get([2]) + (3 * u * u - 2 * u * u * u) * a.get([4]) + h * (u * u - u * u * u) * a.get([5]), d = (1 - u) * a.get([0]) + u * a.get([3]);
      o.push(d), l.push(f);
    }
    return { u: o, w: l };
  }
  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param ntheig n-th eigen value
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalEigenMode(t, i, r) {
    const a = this.computeLocalEigenMode(t, i, r), o = this.computeGeo(), l = o.dx / o.l, c = o.dz / o.l, h = [], s = [];
    for (let u = 0; u <= r; u++)
      h.push(a.u[u] * l - a.w[u] * c), s.push(a.w[u] * l + a.u[u] * c);
    return { u: h, w: s };
  }
  /**
   * Computes the values of normal force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeNormalForce(t, i) {
    const r = this.computeEndForces(t), a = this.computeGeo(), o = [], l = [], c = t.getElementLoadsOnElement(this.label);
    for (let h = 0; h <= i; h++) {
      const s = a.l * h / i;
      let u = -r.get([0]);
      for (const f of c)
        u += f.computeBeamNContrib(s);
      o.push(s), l.push(u);
    }
    return { x: o, N: l };
  }
  computeNormalForceAt(t, i) {
    const r = this.computeEndForces(t), a = t.getElementLoadsOnElement(this.label);
    let o = -r.get([0]);
    for (const l of a)
      o += l.computeBeamNContrib(i);
    return o;
  }
  /**
   * Computes the values of shear force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeShearForce(t, i) {
    const r = this.computeEndForces(t), a = this.computeGeo(), o = [], l = [], c = t.getElementLoadsOnElement(this.label);
    for (let h = 0; h <= i; h++) {
      const s = a.l * h / i;
      let u = -r.get([1]);
      for (const f of c)
        u += f.computeBeamVContrib(s);
      o.push(s), l.push(u);
    }
    return { x: o, V: l };
  }
  computeShearForceAt(t, i) {
    const r = this.computeEndForces(t), a = t.getElementLoadsOnElement(this.label);
    let o = -r.get([1]);
    for (const l of a)
      o += l.computeBeamVContrib(i);
    return o;
  }
  /**
   * Computes the values of bending moment along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeBendingMoment(t, i) {
    const r = this.computeEndForces(t), a = this.computeGeo(), o = [], l = [], c = t.getElementLoadsOnElement(this.label);
    for (let h = 0; h <= i; h++) {
      const s = a.l * h / i;
      let u = -r.get([2]) - r.get([1]) * s;
      for (const f of c)
        u += f.computeBeamMContrib(s);
      o.push(s), l.push(u);
    }
    return { x: o, M: l };
  }
  computeBendingMomentAt(t, i) {
    const r = this.computeEndForces(t), a = t.getElementLoadsOnElement(this.label);
    let o = -r.get([2]) - r.get([1]) * i;
    for (const l of a)
      o += l.computeBeamMContrib(i);
    return o;
  }
}
class Ea {
  /**
   * Returns load vector for clamped beam
   * @param elem element number
   */
  constructor(n, t) {
    fe(this, "target");
    // component number the target is applied
    fe(this, "domain");
    this.target = n.toString(), this.domain = t;
  }
  /**
   * Evaluates the contribution to the load vector
   */
  getLoadVector() {
    return [];
  }
  /**
   * Returns load code numbers
   */
  getLocationArray() {
    return [];
  }
}
class G0 extends Ea {
  constructor(t, i, r = {}) {
    super(t, i);
    fe(this, "values");
    this.values = r;
  }
  change(t, i) {
    this.target = t.toString(), this.values = i;
  }
  getLoadVector() {
    const t = this.domain.solver.getNodeDofIDs(this.target), i = Array();
    for (const r of t)
      r in this.values ? i.push(this.values[r]) : i.push(0);
    return i;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
class Bt extends Ea {
  getLoadVectorForClampedBeam() {
    return [];
  }
  computeBeamDeflectionContrib(n) {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(n) {
    return 0;
  }
  computeBeamVContrib(n) {
    return 0;
  }
  computeBeamMContrib(n) {
    return 0;
  }
}
class Y0 extends Bt {
  constructor(t, i, r, a) {
    super(t, i);
    fe(this, "values");
    // Fx, Fz, My, distance x
    fe(this, "lcs");
    this.values = r, this.lcs = a;
  }
  change(t, i, r) {
    this.target = t.toString(), this.values = i, this.lcs = r;
  }
  getGlobalIntensities() {
    const t = this.values[0], i = this.values[1];
    if (this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return { fx: t * a - i * o, fz: t * o + i * a, my: 0 };
    } else
      return { fx: t, fz: i, my: 0 };
  }
  getLocalIntensities() {
    const t = this.values[0], i = this.values[1], r = this.domain.getElement(this.target).computeGeo(), a = r.l, o = r.dx, l = r.dz, c = o / a, h = l / a;
    return this.lcs ? { fx: t, fz: i } : {
      fx: t * c + i * h,
      fz: -t * h + i * c
    };
  }
  getLoadVectorForClampedBeam() {
    const t = this.domain.getElement(this.target).computeGeo(), i = this.getLocalIntensities(), r = i.fx, a = i.fz, o = t.l, l = this.values[3], c = o - l;
    return [
      -c / o * r,
      c / o * (l * (l - c) / o / o - 1) * a,
      l * c * c / o / o * a,
      -l / o * r,
      l / o * (c * (c - l) / o / o - 1) * a,
      -l * l * c / o / o * a
    ];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const t = this.domain.getElement(this.target), i = t.computeT(), r = this.getLoadVectorForClampedBeam();
    if (t.hasHinges()) {
      const a = t.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const l = oe(a.kab, or(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let h = 0; h < a.a.length; h++)
          o[a.a[h]] = r[a.a[h]] - l.get([h, 0]) * c;
        return oe(oe(qe(i), o), -1).toArray();
      } else {
        const c = nr(
          ye(r, ge(a.a)),
          oe(l, ye(r, ge(a.b)))
        );
        return o = ye(o, ge(a.a), c), oe(oe(qe(i), o), -1).toArray();
      }
    } else
      return oe(oe(qe(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(t) {
    const i = this.getLocalIntensities(), o = this.domain.elements.get(this.target).computeGeo().l, l = i.fx, c = i.fz, h = this.domain.getElement(this.target).getMaterial().e, s = this.domain.getElement(this.target).getCS().a, u = this.domain.getElement(this.target).getCS().iy, f = this.values[3], d = o - f, D = d / o * (f * (f - d) / o / o - 1) * c, v = f * d * d / o / o * c, m = h * u, p = h * s, w = t * o;
    let g = 0, A = 0;
    return w < f ? g += d / o * l * w / p : g += d / o * l * f / p - f / o * l * (w - f) / p, w > f ? A = (D * Math.pow(w, 3) / 6 + v * Math.pow(w, 2) / 2 + c * Math.pow(w - f, 3) / 6) / m : A = (D * Math.pow(w, 3) / 6 + v * Math.pow(w, 2) / 2) / m, { u: g, w: A };
  }
  computeBeamNContrib(t) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return t < r ? 0 : -i.fx;
  }
  computeBeamVContrib(t) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return t < r ? 0 : -i.fz;
  }
  computeBeamMContrib(t) {
    const i = this.getLocalIntensities(), r = this.values[3];
    return t < r ? 0 : -i.fz * (t - r);
  }
}
class J0 extends Bt {
  // true if values in element local c.s (along length)
  constructor(t, i, r, a) {
    super(t, i);
    fe(this, "values");
    // fx, fz intensities
    fe(this, "lcs");
    this.values = r, this.lcs = a;
  }
  change(t, i, r) {
    this.target = t.toString(), this.values = i, this.lcs = r;
  }
  getGlobalIntensities() {
    const t = this.values[0], i = this.values[1];
    if (this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return { fx: t * a - i * o, fz: t * o + i * a, my: 0 };
    } else
      return { fx: t, fz: i, my: 0 };
  }
  getLocalIntensities() {
    const t = this.values[0], i = this.values[1], r = this.domain.getElement(this.target).computeGeo(), a = r.l, o = r.dx, l = r.dz, c = o / a, h = l / a;
    return this.lcs ? { fx: t, fz: i } : {
      fx: t * c + i * h,
      fz: -t * h + i * c
    };
  }
  // in local c.s
  getLoadVectorForClampedBeam() {
    const t = this.domain.getElement(this.target).computeGeo(), i = this.getLocalIntensities(), r = i.fx, a = i.fz, o = t.l;
    return [-0.5 * o * r, -0.5 * o * a, 1 / 12 * a * o * o, -0.5 * o * r, -0.5 * o * a, -1 / 12 * a * o * o];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const t = this.domain.getElement(this.target), i = t.computeT(), r = this.getLoadVectorForClampedBeam();
    if (t.hasHinges()) {
      const a = t.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const l = oe(a.kab, or(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let h = 0; h < a.a.length; h++)
          o[a.a[h]] = r[a.a[h]] - l.get([h, 0]) * c;
        return oe(oe(qe(i), o), -1).toArray();
      } else {
        const c = nr(
          ye(r, ge(a.a)),
          oe(l, ye(r, ge(a.b)))
        );
        return o = ye(o, ge(a.a), c), oe(oe(qe(i), o), -1).toArray();
      }
    } else
      return oe(oe(qe(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(t) {
    const i = this.getLocalIntensities(), r = this.domain.elements.get(this.target), o = r.computeGeo().l;
    return { u: 0, w: i.fz * o * o * o * o * (t * t * t * t / 24 - t * t * t / 12 + t * t / 24) / (r.getMaterial().e * r.getCS().iy) };
  }
  computeBeamNContrib(t) {
    return -this.getLocalIntensities().fx * t;
  }
  computeBeamVContrib(t) {
    return -this.getLocalIntensities().fz * t;
  }
  computeBeamMContrib(t) {
    return -this.getLocalIntensities().fz * t * t / 2;
  }
}
class Q0 extends Bt {
  // true if values provided in element local c.s.
  constructor(t, i, r, a, o) {
    super(t, i);
    fe(this, "startValues");
    // fx, fz at element start
    fe(this, "endValues");
    // fx, fz at element end
    fe(this, "lcs");
    this.startValues = r, this.endValues = a, this.lcs = o;
  }
  change(t, i, r, a) {
    this.target = t.toString(), this.startValues = i, this.endValues = r, this.lcs = a;
  }
  getGlobalIntensities() {
    const t = { fx: this.startValues[0], fz: this.startValues[1] }, i = { fx: this.endValues[0], fz: this.endValues[1] };
    if (this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return {
        start: { fx: t.fx * a - t.fz * o, fz: t.fx * o + t.fz * a },
        end: { fx: i.fx * a - i.fz * o, fz: i.fx * o + i.fz * a }
      };
    }
    return { start: t, end: i };
  }
  getLocalIntensities() {
    const t = { fx: this.startValues[0], fz: this.startValues[1] }, i = { fx: this.endValues[0], fz: this.endValues[1] };
    if (!this.lcs) {
      const r = this.domain.getElement(this.target).computeGeo(), a = r.dx / r.l, o = r.dz / r.l;
      return {
        start: { fx: t.fx * a + t.fz * o, fz: -t.fx * o + t.fz * a },
        end: { fx: i.fx * a + i.fz * o, fz: -i.fx * o + i.fz * a }
      };
    }
    return { start: t, end: i };
  }
  // load vector in local c.s.
  getLoadVectorForClampedBeam() {
    const i = this.domain.getElement(this.target).computeGeo().l, r = this.getLocalIntensities(), a = r.start.fx, o = r.end.fx, l = r.start.fz, c = r.end.fz, h = -i / 6 * (2 * a + o), s = -i / 6 * (a + 2 * o), u = -i / 20 * (7 * l + 3 * c), f = -i / 20 * (3 * l + 7 * c), d = i * i * (l / 20 + c / 30), D = -i * i * (l / 30 + c / 20);
    return [h, u, d, s, f, D];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const t = this.domain.getElement(this.target), i = t.computeT(), r = this.getLoadVectorForClampedBeam();
    if (t.hasHinges()) {
      const a = t.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const l = oe(a.kab, or(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let h = 0; h < a.a.length; h++)
          o[a.a[h]] = r[a.a[h]] - l.get([h, 0]) * c;
        return oe(oe(qe(i), o), -1).toArray();
      } else {
        const c = nr(
          ye(r, ge(a.a)),
          oe(l, ye(r, ge(a.b)))
        );
        return o = ye(o, ge(a.a), c), oe(oe(qe(i), o), -1).toArray();
      }
    } else
      return oe(oe(qe(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(t) {
    const i = this.domain.getElement(this.target), a = i.computeGeo().l, o = this.getLocalIntensities(), l = o.start.fz, h = o.end.fz - l, s = t, u = Math.pow(s, 4) / 24 - Math.pow(s, 3) / 12 + Math.pow(s, 2) / 24, f = Math.pow(s, 5) / 120 - Math.pow(s, 3) / 40 + Math.pow(s, 2) / 60, d = i.getMaterial().e * i.getCS().iy;
    return { u: 0, w: a ** 4 / d * (l * u + h * f) };
  }
  computeBeamNContrib(t) {
    const i = this.getLocalIntensities(), a = this.domain.getElement(this.target).computeGeo().l, o = i.start.fx, c = i.end.fx - o;
    return -(o * t + 0.5 * c * (t * t) / a);
  }
  computeBeamVContrib(t) {
    const i = this.getLocalIntensities(), a = this.domain.getElement(this.target).computeGeo().l, o = i.start.fz, c = i.end.fz - o;
    return -(o * t + 0.5 * c * (t * t) / a);
  }
  computeBeamMContrib(t) {
    const i = this.getLocalIntensities(), a = this.domain.getElement(this.target).computeGeo().l, o = i.start.fz, c = i.end.fz - o;
    return -(0.5 * o * t * t + c / (6 * a) * t * t * t);
  }
}
class X0 extends Bt {
  // fx, fz intensities
  constructor(t, i, r) {
    super(t, i);
    fe(this, "values");
    this.values = r;
  }
  change(t, i) {
    this.target = t.toString(), this.values = i;
  }
  // in local c.s
  getLoadVectorForClampedBeam() {
    const t = this.domain.getElement(this.target).getMaterial(), i = this.domain.getElement(this.target).getCS(), r = t.e, a = t.alpha, o = i.a, l = i.iy, c = i.h, h = this.values[1] - this.values[2];
    return [
      +r * o * a * this.values[0],
      0,
      +(r * l * a * h) / c,
      -r * o * a * this.values[0],
      0,
      -(r * l * a * h) / c
    ];
  }
  getLocationArray() {
    return this.domain.getElement(this.target).getLocationArray();
  }
  getLoadVector() {
    const t = this.domain.getElement(this.target), i = t.computeT(), r = this.getLoadVectorForClampedBeam();
    if (t.hasHinges()) {
      const a = t.computeLocalStiffnessMtrx(!0);
      let o = [0, 0, 0, 0, 0, 0];
      const l = oe(a.kab, or(a.kbb));
      if (a.b.length == 1) {
        const c = r[a.b[0]];
        for (let h = 0; h < a.a.length; h++)
          o[a.a[h]] = r[a.a[h]] - l.get([h, 0]) * c;
        return oe(oe(qe(i), o), -1).toArray();
      } else {
        const c = nr(
          ye(r, ge(a.a)),
          oe(l, ye(r, ge(a.b)))
        );
        return o = ye(o, ge(a.a), c), oe(oe(qe(i), o), -1).toArray();
      }
    } else
      return oe(oe(qe(i), r), -1).toArray();
  }
  computeBeamDeflectionContrib(t) {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(t) {
    return 0;
  }
  computeBeamVContrib(t) {
    return 0;
  }
  computeBeamMContrib(t) {
    return 0;
  }
}
class H0 {
  /**
   * Constructor
   */
  constructor(n, t, i) {
    fe(this, "target");
    // node (umber) subjected to Prescribed Displacement
    fe(this, "prescribedValues");
    // prescribed values of individual DOFs
    fe(this, "domain");
    this.target = n.toString(), this.prescribedValues = i, this.domain = t;
  }
  getNodePrescribedDisplacementVector() {
    const n = new Array(), t = this.domain.solver.getNodeDofIDs(this.target);
    for (const i of t)
      i in this.prescribedValues ? n.push(this.prescribedValues[i]) : n.push(0);
    return n;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
const K0 = {};
class W0 {
  // torsional stiffness moment [m4]
  /**
   * Constructor
   * @param label string label of receiver
   * @param a cross section area of receiver [m2]. > 0.0
   * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
   * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
   * @param dyz product moment of area with respect to yz axes [m4]
   * @param h height of receiver [m]
   * @param k Timoshenko's shear coefficient [-]
   * @param j torsional stiffness moment [m4]
   */
  constructor(n, t = {}) {
    fe(this, "label");
    // label of receiver
    fe(this, "a");
    // cross section area of receiver [m2]. > 0.0
    fe(this, "iy");
    // area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    fe(this, "iz");
    // area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    fe(this, "dyz");
    // product moment of area with respect to yz axes [m4]
    fe(this, "h");
    // height of receiver [m]
    fe(this, "k");
    // Timoshenko's shear coefficient [-]
    fe(this, "j");
    this.label = n.toString(), t = { ...K0, ...t }, this.a = t.a, this.iy = t.iy, this.iz = t.iz, this.dyz = t.dyz, this.h = t.h, this.k = t.k, this.j = t.j;
  }
  /**
   * Change receiver properties
   * @param a cross section area of receiver [m2]. > 0.0
   * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
   * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
   * @param dyz product moment of area with respect to yz axes [m4]
   * @param h height of receiver [m]
   * @param k Timoshenko's shear coefficient [-]
   * @param j torsional stiffness moment [m4]
   */
  change(n) {
    n.a != null && (this.a = n.a), n.iy != null && (this.iy = n.iy), n.iz != null && (this.iz = n.iz), n.dyz != null && (this.dyz = n.dyz), n.h != null && (this.h = n.h), n.k != null && (this.k = n.k), n.j != null && (this.j = n.j);
  }
}
const k0 = { e: 1, g: 1, alpha: 1, d: 1 };
class j0 {
  // mass density [kg/m3]
  /**
   * @param  label int label of receiver
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  constructor(n, t = {}) {
    fe(this, "label");
    //  label
    fe(this, "e");
    // Young's modulus [Pa]
    fe(this, "g");
    // Shear modulus [Pa]
    fe(this, "alpha");
    // thermal dillatation coefficient [K-1]
    fe(this, "d");
    this.label = n.toString(), t = { ...k0, ...t }, this.e = t.e, this.g = t.g, this.alpha = t.alpha, this.d = t.d;
  }
  /**
   * Change receiver properties
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  change(n) {
    n.e !== void 0 && (this.e = n.e), n.g !== void 0 && (this.g = n.g), n.alpha !== void 0 && (this.alpha = n.alpha), n.d !== void 0 && (this.d = n.d);
  }
}
class eh {
  /**
   * Constructor
   */
  constructor(n) {
    fe(this, "solver");
    fe(this, "nodes", /* @__PURE__ */ new Map());
    fe(this, "elements", /* @__PURE__ */ new Map());
    fe(this, "materials", /* @__PURE__ */ new Map());
    fe(this, "crossSections", /* @__PURE__ */ new Map());
    this.solver = n;
  }
  getNode(n) {
    const t = n.toString();
    if (this.nodes.has(t))
      return this.nodes.get(t);
    throw new RangeError("Node label " + n + " does not exists");
  }
  getElement(n) {
    const t = n.toString();
    if (this.elements.has(t))
      return this.elements.get(t);
    throw new RangeError("Element label " + n + " does not exists");
  }
  getMaterial(n) {
    const t = n.toString();
    if (this.materials.has(t))
      return this.materials.get(t);
    throw new RangeError("Material label " + n + " does not exists");
  }
  getCS(n) {
    const t = n.toString();
    if (this.crossSections.has(t))
      return this.crossSections.get(t);
    throw new RangeError("CrossSection label " + n + " does not exists");
  }
  // class factory
  createNode(n, t = [0, 0, 0], i = []) {
    const r = new U0(n, this, t, i);
    return this.nodes.set(n.toString(), r), r;
  }
  createBeam2D(n, t, i, r, a = [!1, !1]) {
    const o = new Z0(n, this, t, i, r, a);
    return this.elements.set(n.toString(), o), o;
  }
  createMaterial(n, t = {}) {
    const i = new j0(n, t);
    return this.materials.set(n.toString(), i), i;
  }
  createCrossSection(n, t = {}) {
    const i = new W0(n, t);
    return this.crossSections.set(n.toString(), i), i;
  }
}
class rh {
  constructor() {
    fe(this, "domain");
    fe(this, "neq");
    // number of unknowns
    fe(this, "pneq");
    // number of prescribed unknowns
    fe(this, "k");
    fe(this, "m");
    fe(this, "f");
    fe(this, "loadCases", new Array());
    fe(this, "codeNumberGenerated", !1);
    // code numbers assigned to supported as well as free DOFs
    fe(this, "nodeCodeNumbers", /* @__PURE__ */ new Map());
    this.domain = new eh(this), this.loadCases.push(new th("DefaultLC", this.domain));
  }
  getNodeLocationArray(n, t) {
    let i = [];
    for (const r of t)
      i = i.concat(this.nodeCodeNumbers.get(n)[r]);
    return i;
  }
  getNodeDofIDs(n) {
    const t = [];
    for (const i in this.nodeCodeNumbers.get(n))
      t.push(parseInt(i));
    return t;
  }
  generateCodeNumbers() {
    const n = /* @__PURE__ */ new Map();
    for (const [r, a] of this.domain.nodes)
      this.nodeCodeNumbers.set(r, {}), n.set(r, /* @__PURE__ */ new Set());
    for (const [r, a] of this.domain.elements)
      for (const o of a.nodes) {
        const l = a.getNodeDofs(o);
        for (const c of l)
          if (n.has(o))
            n.get(o).add(c);
          else
            throw console.log(o, o in n, n.get(o)), new RangeError("Node label " + o + " does not exists");
      }
    this.neq = 0, this.pneq = 0;
    for (const [r, a] of this.domain.nodes)
      for (const o of n.get(r))
        a.bcs.has(o) ? this.pneq++ : this.neq++;
    let t = 0, i = this.neq;
    for (const [r, a] of this.domain.nodes)
      for (const o of n.get(r))
        a.bcs.has(o) ? this.nodeCodeNumbers.get(r)[o] = i++ : this.nodeCodeNumbers.get(r)[o] = t++;
    this.codeNumberGenerated = !0;
  }
  assembleVecLC(n, t, i, r) {
    for (let a = 0; a < i.length; a++)
      n.set([i[a], r], n.get([i[a], r]) + t[a]);
  }
  assembleVec(n, t, i) {
    for (let r = 0; r < i.length; r++)
      n.set([i[r]], n.get([i[r]]) + t[r]);
  }
}
class ih extends rh {
  assemble() {
    this.k = He(this.neq + this.pneq, this.neq + this.pneq);
    for (const [n, t] of this.domain.elements) {
      const i = t.computeStiffness(), r = t.getLocationArray(), a = et(r)[0];
      for (let o = 0; o < a; o++) {
        const l = r[o];
        for (let c = 0; c < a; c++) {
          const h = r[c];
          this.k.set([l, h], this.k.get([l, h]) + i.get([o, c]));
        }
      }
    }
    this.f = He(this.neq + this.pneq, this.loadCases.length);
    for (let n = 0; n < this.loadCases.length; n++) {
      this.loadCases[n].r = He(this.neq + this.pneq);
      const t = this.loadCases[n];
      for (const i of t.nodalLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), n);
      for (const i of t.elementLoadList)
        this.assembleVecLC(this.f, i.getLoadVector(), i.getLocationArray(), n);
      for (const i of t.prescribedBC)
        this.assembleVec(t.r, i.getNodePrescribedDisplacementVector(), i.getLocationArray());
    }
  }
  solve() {
    const n = /* @__PURE__ */ new Date();
    this.codeNumberGenerated || this.generateCodeNumbers();
    const t = Tr(0, this.neq), i = Tr(this.neq, this.neq + this.pneq);
    if (this.assemble(), this.neq > 0)
      for (let o = 0; o < this.loadCases.length; o++) {
        this.loadCases[o].solved = !1;
        const l = ye(this.loadCases[o].r, ge(i)), c = oe(ye(this.k, ge(t, i)), l);
        let h = ye(this.k, ge(t, t));
        typeof h == "number" && (h = we([[h]]));
        let s = ye(this.f, ge(t, [o]));
        typeof s == "number" && (s = we([s]));
        const u = nr(Cr(s), c), f = Cr(P0(h, u));
        this.loadCases[o].r = ye(this.loadCases[o].r, ge(Tr(0, this.neq)), f), this.loadCases[o].R = ye(oe(this.k, this.loadCases[o].r), ge(i)), this.loadCases[o].R = nr(
          this.loadCases[o].R,
          Cr(ye(this.f, ge(i, [o])))
        ), this.loadCases[o].solved = !0;
      }
    else
      for (let o = 0; o < this.loadCases.length; o++)
        this.loadCases[o].R = Cr(oe(this.k, this.loadCases[o].r)), this.loadCases[o].R = nr(
          this.loadCases[o].R,
          Cr(ye(this.f, ge(i, [o])))
        ), this.loadCases[o].solved = !0;
    const a = (/* @__PURE__ */ new Date()).getTime() - n.getTime();
    console.log("Solution took ", Math.round(a * 100) / 100, " [ms]");
  }
}
class th {
  /**
   * Creates a new loadcase
   * @param label load case name
   */
  constructor(n, t) {
    fe(this, "label");
    fe(this, "domain");
    // domain reference
    // dictionary (map), key is node number, value is PrescribedDisplacement object applied
    fe(this, "bcMap", {});
    // Array of loads applied
    fe(this, "nodalLoadList", new Array());
    fe(this, "elementLoadList", new Array());
    fe(this, "prescribedBC", new Array());
    // solution vector
    fe(this, "r", He(0));
    // vector of reactions
    fe(this, "R", He(0));
    // omegas
    fe(this, "eigenNumbers", []);
    fe(this, "eigenVectors", []);
    fe(this, "solved", !1);
    this.label = n, this.domain = t;
  }
  /**
   * Returns list of applied element loads on element with given number
   * param e element number
   */
  getElementLoadsOnElement(n) {
    const t = [];
    for (const i of this.elementLoadList)
      i.target == n && t.push(i);
    return t;
  }
  //class factory
  createNodalLoad(n, t = {}) {
    const i = new G0(n, this.domain, t);
    return this.nodalLoadList.push(i), i;
  }
  createBeamElementUniformEdgeLoad(n, t, i) {
    const r = new J0(n, this.domain, t, i);
    return this.elementLoadList.push(r), r;
  }
  createBeamElementTrapezoidalEdgeLoad(n, t, i, r) {
    const a = new Q0(n, this.domain, t, i, r);
    return this.elementLoadList.push(a), a;
  }
  createBeamConcentratedLoad(n, t, i) {
    const r = new Y0(n, this.domain, t, i);
    return this.elementLoadList.push(r), r;
  }
  createBeamTemperatureLoad(n, t) {
    const i = new X0(n, this.domain, t);
    return this.elementLoadList.push(i), i;
  }
  createPrescribedDisplacement(n, t) {
    const i = new H0(n, this.domain, t);
    return this.prescribedBC.push(i), i;
  }
}
var Pe = /* @__PURE__ */ ((e) => (e[e.Dx = 0] = "Dx", e[e.Dy = 1] = "Dy", e[e.Dz = 2] = "Dz", e[e.Rx = 3] = "Rx", e[e.Ry = 4] = "Ry", e[e.Rz = 5] = "Rz", e))(Pe || {});
export {
  Z0 as Beam2D,
  Y0 as BeamConcentratedLoad,
  Bt as BeamElementLoad,
  Q0 as BeamElementTrapezoidalEdgeLoad,
  J0 as BeamElementUniformEdgeLoad,
  X0 as BeamTemperatureLoad,
  W0 as CrossSection,
  Pe as DofID,
  eh as Domain,
  V0 as Element,
  ih as LinearStaticSolver,
  Ea as Load,
  th as LoadCase,
  j0 as Material,
  G0 as NodalLoad,
  U0 as Node,
  H0 as PrescribedDisplacement,
  rh as Solver
};
