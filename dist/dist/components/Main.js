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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import '../assets/App.css';
import * as FileSaver from 'file-saver';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Avatar, AvatarStyle, OptionContext, allOptions } from 'avataaars';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { UrlQueryParamTypes, UrlUpdateTypes, addUrlProps } from 'react-url-query';
import { fromPairs, sample } from 'lodash';
import AvatarForm from './AvatarForm';
import ComponentCode from './ComponentCode';
import ComponentImg from './ComponentImg';
var updateType = UrlUpdateTypes.pushIn;
var urlPropsQueryConfig = __assign(__assign({}, fromPairs(allOptions.map(function (option) {
    return [
        option.key,
        {
            type: UrlQueryParamTypes.string,
            updateType: updateType
        }
    ];
}))), { avatarStyle: {
        type: UrlQueryParamTypes.string,
        updateType: updateType
    } });
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            displayComponentCode: false,
            displayComponentImg: false
        };
        _this.avatarRef = null;
        _this.canvasRef = null;
        _this.optionContext = new OptionContext(allOptions);
        _this.onAvatarRef = function (ref) {
            _this.avatarRef = ref;
        };
        _this.onCanvasRef = function (ref) {
            _this.canvasRef = ref;
        };
        _this.onOptionValueChange = function (key, value) {
            var name = capitalizeFirstLetter(key);
            var handlerName = "onChange" + name;
            var updateHandler = _this.props[handlerName];
            updateHandler(value);
        };
        _this.onAvatarStyleChange = function (avatarStyle) {
            _this.props.onChangeAvatarStyle(avatarStyle);
        };
        _this.onRandom = function () {
            var optionContext = _this.optionContext;
            var values = {
                avatarStyle: _this.props.avatarStyle
            };
            for (var _i = 0, _a = optionContext.options; _i < _a.length; _i++) {
                var option = _a[_i];
                if (option.key in values) {
                    continue;
                }
                var optionState = optionContext.getOptionState(option.key);
                // Notice, when the app just launch and we didn't explore too much
                // options, some of these nested option is not added by the selector
                // yet, so we won't be able to select value for them. But as they
                // keep tapping random button, soon or later we will get all the
                // options. So it should be fine. Ideally we should find a better
                // way to collect all the options, but that's okay to just do it this
                // way for now.
                if (!optionState.options.length) {
                    continue;
                }
                values[option.key] = sample(optionState.options);
            }
            _this.optionContext.setData(values);
            _this.props.onChangeUrlQueryParams(values, UrlUpdateTypes.push);
        };
        _this.onDownloadPNG = function () {
            var svgNode = ReactDOM.findDOMNode(_this.avatarRef);
            var canvas = _this.canvasRef;
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var anyWindow = window;
            var DOMURL = anyWindow.URL || anyWindow.webkitURL || window;
            var data = svgNode.outerHTML;
            var img = new Image();
            var svg = new Blob([data], { type: 'image/svg+xml' });
            var url = DOMURL.createObjectURL(svg);
            img.onload = function () {
                ctx.save();
                ctx.scale(2, 2);
                ctx.drawImage(img, 0, 0);
                ctx.restore();
                DOMURL.revokeObjectURL(url);
                _this.canvasRef.toBlob(function (imageBlob) {
                    _this.triggerDownload(imageBlob, 'avataaars.png');
                });
            };
            img.src = url;
        };
        _this.onDownloadSVG = function () {
            var svgNode = ReactDOM.findDOMNode(_this.avatarRef);
            var data = svgNode.outerHTML;
            var svg = new Blob([data], { type: 'image/svg+xml' });
            _this.triggerDownload(svg, 'avataaars.svg');
        };
        _this.onToggleCode = function () {
            _this.setState(function (state) { return (__assign(__assign({}, state), { displayComponentCode: !state.displayComponentCode, displayComponentImg: false })); });
        };
        _this.onToggleImg = function () {
            _this.setState(function (state) { return (__assign(__assign({}, state), { displayComponentImg: !state.displayComponentImg, displayComponentCode: false })); });
        };
        return _this;
    }
    Main.prototype.getChildContext = function () {
        return { optionContext: this.optionContext };
    };
    Main.prototype.componentWillReceiveProps = function (nextProps) {
        this.updateOptionContext(nextProps);
    };
    Main.prototype.componentWillMount = function () {
        this.optionContext.addValueChangeListener(this.onOptionValueChange);
        this.updateOptionContext(this.props);
    };
    Main.prototype.componentDidMount = function () {
        var anyWindow = window;
        setTimeout(function () {
            anyWindow.prerenderReady = true;
        }, 500);
    };
    Main.prototype.componentWillUnmount = function () {
        this.optionContext.removeValueChangeListener(this.onOptionValueChange);
    };
    Main.prototype.render = function () {
        var avatarStyle = this.props.avatarStyle;
        var _a = this.state, displayComponentCode = _a.displayComponentCode, displayComponentImg = _a.displayComponentImg;
        var title = 'Avataaars Generator - Generate your own avataaars!';
        var imageURL = process.env.REACT_APP_IMG_RENDERER_URL + location.search;
        return (React.createElement("main", { role: 'main' }, React.createElement("header", { className: 'header clearfix' }, React.createElement("h2", { style: { color: '#6A39D7' } }, "avataaars generator", React.createElement(Button, { type: 'submit', bsStyle: 'secondary', style: { marginLeft: '1rem' }, onClick: this.onRandom, className: 'pull-right' }, React.createElement("i", { className: 'fa fa-random' }), " Random"))), React.createElement(Helmet, null, React.createElement("meta", { property: 'og:title', content: title }), React.createElement("meta", { property: 'og:site_name', content: 'Avataaars Generator' }), React.createElement("meta", { property: 'og:url', content: document.location.href }), React.createElement("meta", { property: 'og:image', content: imageURL }), React.createElement("meta", { property: 'og:description', content: 'Avataaars Generator is a free online tool for generating your own avatar' }), React.createElement("meta", { name: 'twitter:card', content: 'photo' }), React.createElement("meta", { name: 'twitter:site', content: 'Avataaars Generator' }), React.createElement("meta", { name: 'twitter:title', content: title }), React.createElement("meta", { name: 'twitter:image', content: imageURL }), React.createElement("meta", { name: 'twitter:url', content: document.location.href })), React.createElement("div", { style: { textAlign: 'center', marginBottom: '1rem' } }, React.createElement(Avatar, { ref: this.onAvatarRef, avatarStyle: avatarStyle })), React.createElement(AvatarForm, { optionContext: this.optionContext, avatarStyle: avatarStyle, displayingCode: displayComponentCode, displayingImg: displayComponentImg, onDownloadPNG: this.onDownloadPNG, onDownloadSVG: this.onDownloadSVG, onAvatarStyleChange: this.onAvatarStyleChange, onToggleCode: this.onToggleCode, onToggleImg: this.onToggleImg }), displayComponentImg ? (React.createElement(ComponentImg, { avatarStyle: avatarStyle })) : null, displayComponentCode ? (React.createElement(ComponentCode, { avatarStyle: avatarStyle })) : null, React.createElement("canvas", { style: { display: 'none' }, width: '528', height: '560', ref: this.onCanvasRef })));
    };
    Main.prototype.updateOptionContext = function (nextProps) {
        this.optionContext.setData(nextProps);
    };
    Main.prototype.triggerDownload = function (imageBlob, fileName) {
        FileSaver.saveAs(imageBlob, fileName);
    };
    Main.childContextTypes = {
        optionContext: PropTypes.instanceOf(OptionContext)
    };
    Main.defaultProps = {
        avatarStyle: AvatarStyle.Circle
    };
    return Main;
}(React.Component));
export { Main };
export default addUrlProps({ urlPropsQueryConfig: urlPropsQueryConfig })(Main);
//# sourceMappingURL=Main.js.map
//# sourceMappingURL=Main.js.map