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
import * as React from 'react';
import { AvatarStyle } from 'avataaars';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
// ref: https://stackoverflow.com/a/1714899/25077
var serializeQuery = function (obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
};
var OptionSelect = /** @class */ (function (_super) {
    __extends(OptionSelect, _super);
    function OptionSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (event) {
            if (_this.props.onChange) {
                _this.props.onChange(event.target.value);
            }
        };
        return _this;
    }
    OptionSelect.prototype.render = function () {
        var _a = this.props, controlId = _a.controlId, label = _a.label, value = _a.value, children = _a.children;
        return (React.createElement(FormGroup, { className: 'row', controlId: controlId }, React.createElement(Col, { componentClass: ControlLabel, sm: 3 }, label), React.createElement(Col, { sm: 9 }, React.createElement(FormControl, { componentClass: 'select', value: value, onChange: this.onChange }, children))));
    };
    return OptionSelect;
}(React.Component));
var AvatarForm = /** @class */ (function (_super) {
    __extends(AvatarForm, _super);
    function AvatarForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeCache = [];
        _this.onAvatarStyleChange = function (event) {
            if (_this.props.onAvatarStyleChange) {
                _this.props.onAvatarStyleChange(event.target.value);
            }
        };
        _this.onDownloadPNG = function (event) {
            event.preventDefault();
            if (_this.props.onDownloadPNG) {
                _this.props.onDownloadPNG();
            }
        };
        _this.onDownloadSVG = function (event) {
            event.preventDefault();
            if (_this.props.onDownloadSVG) {
                _this.props.onDownloadSVG();
            }
        };
        _this.onToggleCode = function (event) {
            event.preventDefault();
            if (_this.props.onToggleCode) {
                _this.props.onToggleCode();
            }
        };
        _this.onToggleImg = function (event) {
            event.preventDefault();
            if (_this.props.onToggleImg) {
                _this.props.onToggleImg();
            }
        };
        return _this;
    }
    AvatarForm.prototype.componentWillMount = function () {
        var _this = this;
        var optionContext = this.props.optionContext;
        optionContext.addStateChangeListener(function () {
            _this.forceUpdate();
        });
        this.onChangeCache = optionContext.options.map(function (option) {
            return _this.onChange.bind(_this, option);
        });
    };
    AvatarForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, optionContext = _a.optionContext, avatarStyle = _a.avatarStyle, displayingImg = _a.displayingImg, displayingCode = _a.displayingCode;
        var selects = optionContext.options.map(function (option, index) {
            var optionState = optionContext.getOptionState(option.key);
            if (optionState.available <= 0) {
                return null;
            }
            var selectOptions = optionState.options.map(function (type) { return (React.createElement("option", { key: type, value: type }, type)); });
            var value = optionContext.getValue(option.key);
            return (React.createElement(OptionSelect, { key: option.key, controlId: option.key, label: option.label, value: value, onChange: _this.onChangeCache[index] }, selectOptions));
        });
        var labelCol = 3;
        var inputCol = 9;
        return (React.createElement(Form, { horizontal: true }, React.createElement(FormGroup, { className: 'row', controlId: 'avatar-style' }, React.createElement(Col, { componentClass: ControlLabel, sm: 3 }, "Avatar Style"), React.createElement(Col, { sm: 9 }, React.createElement("label", null, React.createElement("input", { type: 'radio', id: 'avatar-style-circle', name: 'avatar-style', value: AvatarStyle.Circle, checked: avatarStyle === AvatarStyle.Circle, onChange: this.onAvatarStyleChange }), ' ', "Circle"), ' ', React.createElement("label", null, React.createElement("input", { type: 'radio', id: 'avatar-style-transparent', name: 'avatar-style', value: AvatarStyle.Transparent, checked: avatarStyle === AvatarStyle.Transparent, onChange: this.onAvatarStyleChange }), ' ', "Transparent"))), selects, React.createElement(FormGroup, { className: 'row' }, React.createElement(Col, { className: "offset-sm-" + labelCol, smOffset: labelCol, sm: inputCol }, "More options coming soon,", ' ', React.createElement("a", { href: 'http://eepurl.com/c_7fN9', target: '_blank' }, "subscribe for updates"))), React.createElement(FormGroup, { className: 'row' }, React.createElement(Col, { className: 'offset-sm-' + labelCol, smOffset: labelCol, sm: inputCol }, React.createElement(Button, { bsStyle: 'primary', type: 'submit', onClick: this.onDownloadPNG }, React.createElement("i", { className: 'fa fa-download' }), " PNG"), ' ', React.createElement(Button, { bsStyle: 'secondary', type: 'submit', onClick: this.onDownloadSVG }, React.createElement("i", { className: 'fa fa-download' }), " SVG"), ' ', React.createElement(Button, { bsStyle: 'secondary', type: 'submit', onClick: this.onToggleCode }, React.createElement("i", { className: 'fa fa-code' }), ' ', displayingCode ? 'Hide React' : 'Show React'), ' ', React.createElement(Button, { bsStyle: 'secondary', type: 'submit', onClick: this.onToggleImg }, React.createElement("i", { className: 'fa fa-code' }), ' ', displayingImg ? 'Hide <img>' : 'Show <img>'), React.createElement("div", { style: { marginTop: '10px' } }, React.createElement("iframe", { src: 'https://platform.twitter.com/widgets/tweet_button.html?' +
                serializeQuery({
                    text: 'I just created my avataaars here 😆',
                    url: document.location.href,
                    hashtags: 'avataaars,avatar',
                    size: 'l',
                    lang: 'en'
                }), width: '140', height: '28', title: 'Twitter Tweet Button', style: { border: 0, overflow: 'hidden' } }))))));
    };
    AvatarForm.prototype.onChange = function (option, value) {
        var optionContext = this.props.optionContext;
        optionContext.setValue(option.key, value);
    };
    return AvatarForm;
}(React.Component));
export default AvatarForm;
//# sourceMappingURL=AvatarForm.js.map
//# sourceMappingURL=AvatarForm.js.map