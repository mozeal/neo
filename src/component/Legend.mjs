import Component from './Base.mjs';

/**
 * Convenience class to render a legend with a text.
 * Used inside form.Fieldset
 * @class Neo.component.Legend
 * @extends Neo.component.Base
 */
class Legend extends Component {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.component.Legend'
         * @protected
         */
        className: 'Neo.component.Legend',
        /**
         * @member {String} ntype='legend'
         * @protected
         */
        ntype: 'legend',
        /**
         * @member {String[]} cls=['neo-legend']
         */
        cls: ['neo-legend'],
        /**
         * @member {String} iconCls_='far fa-check'
         */
        iconCls_: 'far fa-check',
        /**
         * @member {String} text_=''
         */
        text_: '',
        /**
         * @member {Boolean} useIcon_=true
         */
        useIcon_: true,
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {tag: 'legend', cn:[
            {vtype: 'text'},
            {vtype: 'text'}
        ]}
    }}

    /**
     * Triggered after the iconCls config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetIconCls(value, oldValue) {
        let vdom = this.vdom;
        vdom.cn[0].html = `<i class="neo-legend-icon ${value}"></i>`;
        this.vdom = vdom;
    }

    /**
     * Triggered after the text config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetText(value, oldValue) {
        let vdom = this.vdom;
        vdom.cn[1].html = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the useIcon config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseIcon(value, oldValue) {
        let vdom = this.vdom;
        vdom.cn[0].removeDom = !value;
        this.vdom = vdom;
    }
}

Neo.applyClassConfig(Legend);

export {Legend as default};
