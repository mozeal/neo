import Base from '../core/Base.mjs';

/**
 * todo: can probably get removed
 * Mixin to make Components floating (e.g. Windows)
 * @class Neo.util.Floating
 * @extends Neo.core.Base
 */
class Floating extends Base {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Floating'
         * @protected
         */
        className: 'Neo.util.Floating',
        /**
         * @member {String} ntype='mixin-floating'
         * @protected
         */
        ntype: 'mixin-floating',
        /**
         * @member {Boolean} mixin=true
         */
        mixin: true,
        /**
         * @member {String|null} animateTargetId=null
         */
        animateTargetId: null,
        /**
         * @member {Boolean} modal=false
         */
        modal: false
    }}
}

Neo.applyClassConfig(Floating);

export default Floating;