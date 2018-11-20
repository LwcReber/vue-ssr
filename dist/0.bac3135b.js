webpackJsonp([0],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_6_0_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(40);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_6_0_vue_loader_lib_template_compiler_index_id_data_v_6fdc070f_hasScoped_true_buble_transforms_node_modules_vue_loader_13_6_0_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(43);
function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6fdc070f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_6_0_vue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_6_0_vue_loader_lib_template_compiler_index_id_data_v_6fdc070f_hasScoped_true_buble_transforms_node_modules_vue_loader_13_6_0_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  metaInfo: {
    title: 'Login Page'
  },
  data() {
    return {
      username: '',
      password: '',
      errorMsg: ''
    };
  },
  mouted() {
    console.log('login');
  },
  methods: {
    // ...mapActions(['login']),
    doSubmit(e) {
      // e.preventDefault()
      // if (this.validate()) {
      //   // 调用接口
      //   this.login({
      //     username: this.username,
      //     password: this.password
      //   })
      //     .then(() => {
      //       this.$router.replace('/app')
      //     })
      // }
    },
    validate() {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空';
        return false;
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空';
        return false;
      }
      this.errorMsg = '';
      return true;
    }
  }
});

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(38)("226558ee", content, true, {});

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(37)(undefined);
// imports


// module
exports.push([module.i, ".login-form[data-v-6fdc070f]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;width:350px;margin:0 auto;padding:20px;background-color:#fff}.login-form h1[data-v-6fdc070f]{font-weight:100;color:#3d3d3d}.login-input[data-v-6fdc070f]{padding:0 10px;margin-bottom:20px;border:1px solid #aaa;border-radius:0;-webkit-box-shadow:0 0 0;box-shadow:0 0 0}.login-btn[data-v-6fdc070f],.login-input[data-v-6fdc070f]{-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:30px;width:100%}.login-btn[data-v-6fdc070f]{text-align:center;background-color:#0d60c7;color:#eaeaea;cursor:pointer;border-color:#0d60c7;-webkit-transition:all .3s;transition:all .3s}.login-btn[data-v-6fdc070f]:hover{color:#fff;background-color:#0a4997}.error-msg[data-v-6fdc070f]{font-size:12px;color:red}@media screen and (max-width:600px){.login-form[data-v-6fdc070f]{width:90%}.login-input[data-v-6fdc070f]{line-height:40px}}", ""]);

// exports


/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"login-form",on:{"submit":_vm.doSubmit}},[_c('h1',[_c('span',[_vm._v("Login")]),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.errorMsg),expression:"errorMsg"}],staticClass:"error-msg"},[_vm._v(_vm._s(_vm.errorMsg))])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],staticClass:"login-input",attrs:{"type":"text","placeholder":"User Name"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"login-input",attrs:{"type":"password","placeholder":"Password","autocomplete":"new-password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"login-btn",attrs:{"type":"submit"}},[_vm._v("登 录")])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});