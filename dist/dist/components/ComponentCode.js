var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { OptionContext, allOptions } from 'avataaars';
var ComponentCode = /** @class */ (function (_super) {
    __extends(ComponentCode, _super);
    function ComponentCode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textArea = null;
        _this.onTextAreaRef = function (ref) {
            _this.textArea = ref;
        };
        _this.onTextAreaClick = function (event) {
            _this.textArea.focus();
            _this.textArea.select();
        };
        _this.onOptionValueChange = function (key, value) {
            _this.forceUpdate();
        };
        return _this;
    }
    Object.defineProperty(ComponentCode.prototype, "optionContext", {
        get: function () {
            return this.context.optionContext;
        },
        enumerable: true,
        configurable: true
    });
    ComponentCode.prototype.componentWillMount = function () {
        this.optionContext.addValueChangeListener(this.onOptionValueChange);
    };
    ComponentCode.prototype.componentWillUnmount = function () {
        this.optionContext.removeValueChangeListener(this.onOptionValueChange);
    };
    ComponentCode.prototype.render = function () {
        var avatarStyle = this.props.avatarStyle;
        var optionContext = this.optionContext;
        var props = [];
        for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
            var option = allOptions_1[_i];
            var state = optionContext.getOptionState(option.key);
            if (!state || !state.available) {
                continue;
            }
            var value = optionContext.getValue(option.key);
            props.push("  " + option.key + "='" + value + "'");
        }
        var propsStr = props.join('\n');
        var code = "<Avatar\n  avatarStyle='" + avatarStyle + "'\n" + propsStr + "\n/>";
        return (React.createElement("div", null, React.createElement("h3", { style: { color: '#6A39D7' } }, "React Code", ' ', React.createElement("a", { href: 'https://github.com/fangpenlin/avataaars', style: { fontSize: '0.8em' }, target: '_blank' }, React.createElement("i", { className: 'fa fa-github' }), " Repo")), React.createElement("p", null, "To use Avataaars in your React app, you need to install the package first. You can do it by running"), React.createElement("pre", null, React.createElement("code", null, "yarn add avataaars")), React.createElement("p", null, "or"), React.createElement("pre", null, React.createElement("code", null, "npm install avataaars --save")), React.createElement("p", null, "if you are using npm. Once you have avataaars package installed, you can copy and paste following code into your React component"), React.createElement("textarea", { readOnly: true, style: { width: '100%', height: '10em' }, value: code, ref: this.onTextAreaRef, onFocus: this.onTextAreaClick })));
    };
    ComponentCode.contextTypes = {
        optionContext: PropTypes.instanceOf(OptionContext)
    };
    return ComponentCode;
}(React.Component));
export default ComponentCode;
//# sourceMappingURL=ComponentCode.js.map
//# sourceMappingURL=ComponentCode.js.map