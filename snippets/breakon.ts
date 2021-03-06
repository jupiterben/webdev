
// this is directly from https://github.com/paulmillr/es6-shim

function breakOn(obj: any, propertyName: string, mode: 'read' | 'write', func: any) {
    function getPropertyDescriptor(obj: any, name: string) {
        let property = Object.getOwnPropertyDescriptor(obj, name);
        let proto = Object.getPrototypeOf(obj);
        while (property === undefined && proto !== null) {
            property = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return property;
    }

    function verifyNotWritable() {
        if (mode !== 'read')
            throw "This property is not writable, so only possible mode is 'read'.";
    }

    let enabled = true;
    let originalProperty: any = getPropertyDescriptor(obj, propertyName);
    if (!originalProperty) return;
    const newProperty: any = { enumerable: originalProperty.enumerable };

    // write
    if (originalProperty.set) {// accessor property
        newProperty.set = function (val: any) {
            if (enabled && (!func || func && func(val)))
                debugger;

            originalProperty.set.call(this, val);
        }
    } else if (originalProperty.writable) {// value property
        newProperty.set = function (val: any) {
            if (enabled && (!func || func && func(val)))
                debugger;

            originalProperty.value = val;
        }
    } else {
        verifyNotWritable();
    }

    // read
    newProperty.get = function (val: any) {
        if (enabled && mode === 'read' && (!func || func && func(val)))
            debugger;

        return originalProperty.get ? originalProperty.get.call(this, val) : originalProperty.value;
    }

    Object.defineProperty(obj, propertyName, newProperty);

    return {
        disable: function () {
            enabled = false;
        },

        enable: function () {
            enabled = true;
        }
    };
};