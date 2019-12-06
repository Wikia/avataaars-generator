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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Avatar, AvatarStyle, OptionContext, allOptions } from 'avataaars';
import { UrlQueryParamTypes, UrlUpdateTypes, addUrlProps } from 'react-url-query';
import { fromPairs } from 'lodash';
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
var Renderer = /** @class */ (function (_super) {
    __extends(Renderer, _super);
    function Renderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.optionContext = new OptionContext(allOptions);
        return _this;
    }
    Renderer.prototype.getChildContext = function () {
        return { optionContext: this.optionContext };
    };
    Renderer.prototype.componentWillReceiveProps = function (nextProps) {
        this.updateOptionContext(nextProps);
    };
    Renderer.prototype.componentWillMount = function () {
        this.updateOptionContext(this.props);
    };
    Renderer.prototype.componentDidMount = function () {
        var anyWindow = window;
        setTimeout(function () {
            anyWindow.prerenderReady = true;
        }, 500);
    };
    Renderer.prototype.render = function () {
        var avatarStyle = this.props.avatarStyle;
        return (React.createElement("main", { role: 'main' }, React.createElement(Avatar, { style: {
                position: 'absolute',
                left: '0',
                right: '0',
                bottom: '0',
                top: '0',
                width: '100%',
                height: '100%'
            }, avatarStyle: avatarStyle })));
    };
    Renderer.prototype.updateOptionContext = function (nextProps) {
        this.optionContext.setData(nextProps);
    };
    Renderer.childContextTypes = {
        optionContext: PropTypes.instanceOf(OptionContext)
    };
    Renderer.defaultProps = {
        avatarStyle: AvatarStyle.Circle
    };
    return Renderer;
}(React.Component));
export { Renderer };
export default addUrlProps({ urlPropsQueryConfig: urlPropsQueryConfig })(Renderer);
//# sourceMappingURL=Renderer.js.map
//# sourceMappingURL=Renderer.js.map