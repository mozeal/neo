import Base from './Base.mjs';

/**
 * @class Neo.form.field.CheckBox
 * @extends Neo.form.field.Base
 */
class CheckBox extends Base {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.CheckBox'
         * @protected
         */
        className: 'Neo.form.field.CheckBox',
        /**
         * @member {String} ntype='checkboxfield'
         * @protected
         */
        ntype: 'checkboxfield',
        /**
         * @member {Boolean} checked_=false
         */
        checked_: false,
        /**
         * @member {Array} cls=['neo-checkboxfield']
         */
        cls: ['neo-checkboxfield'],
        /**
         * @member {Boolean} hideLabel_=false
         */
        hideLabel_: false,
        /**
         * @member {Boolean} hideValueLabel_=false
         */
        hideValueLabel_: true,
        /**
         * @member {String} inputType_='checkbox'
         */
        inputType_: 'checkbox',
        /**
         * @member {String} labelText_='LabelText'
         */
        labelText_: 'LabelText',
        /**
         * defaults to px
         * @member {Number|String} labelWidth_=150
         */
        labelWidth_: 150,
        /**
         * @member {String} The name (group) of the input dom node
         */
        name_: '',
        /**
         * @member {String} valueLabelText_='ValueLabel'
         */
        valueLabelText_: 'ValueLabel',
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {cn: [
            {tag: 'label', cls: ['neo-checkbox-label']},
            {tag: 'input', cls: ['neo-checkbox-input']},
            {tag: 'label', cls: ['neo-checkbox-value-label']}
        ]}
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = Neo.clone(me.domListeners, true),
            vdom         = me.vdom,
            inputEl      = vdom.cn[1],
            valueLabel   = vdom.cn[2];

        inputEl.id = valueLabel.for = me.id + '-input';
        me.vdom = vdom;

        domListeners.push({
            change: {
                fn   : me.onInputValueChange,
                scope: me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     *
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetChecked(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[1].checked = value;
        me.vdom = vdom;

        if (oldValue !== undefined) {
            me.fire('change', {
                component: me,
                oldValue : oldValue,
                value    : value
            });
        }
    }

    /**
     * Triggered after the hideLabel config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetHideLabel(value, oldValue) {
        let vdom = this.vdom;

        vdom.cn[0].removeDom = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the hideLabelValue config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetHideValueLabel(value, oldValue) {
        let vdom = this.vdom;

        vdom.cn[2].removeDom = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the inputType config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetInputType(value, oldValue) {
        let vdom = this.vdom;

        vdom.cn[1].type = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the labelText config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetLabelText(value, oldValue) {
        let vdom = this.vdom;

        vdom.cn[0].innerHTML = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the labelWidth config got changed
     * @param {Number|String} value
     * @param {Number|String} oldValue
     * @protected
     */
    afterSetLabelWidth(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        if (!me.hideLabel) {
            vdom.cn[0].width = value;
            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the name config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetName(value, oldValue) {
        let vdom = this.vdom;

        vdom.cn[1].name = value;
        this.vdom = vdom;
    }

    /**
     * Triggered after the value config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetValue(value, oldValue) {
        if (value) {
            let vdom = this.vdom;

            vdom.cn[1].value = value;
            this.vdom = vdom;
        }

        super.afterSetValue(value, oldValue);
    }

    /**
     * Triggered after the valueLabel config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetValueLabelText(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        if (!me.hideValueLabel) {
            vdom.cn[2].innerHTML = value;
            me.vdom = vdom;
        }
    }

    /**
     * Gets triggered when a user checks a checkbox input.
     * @param {Object} data
     */
    onInputValueChange(data) {
        let me      = this,
            checked = data.target.checked;

        me._checked = checked; // silent update

        // keep the vdom & vnode in sync for future updates
        me.vdom.cn[1].checked = checked;
        me.vnode.childNodes[me.hideLabel ? 0 : 1].attributes.checked = checked + '';

        me.fire('change', {
            component: me,
            oldValue : !checked,
            value    : checked
        });
    }
}

Neo.applyClassConfig(CheckBox);

export {CheckBox as default};