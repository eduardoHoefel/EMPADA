let Utils = {

    gcd: (a, b) => {
        if (!b) return a;

        return Utils.gcd(b, a % b);
    },

    to_hex: (uint8s) => {
        if (typeof uint8s === 'object')
            uint8s = JSON.stringify(uint8s);

        if (typeof uint8s === 'string')
            uint8s = Uint8Array.from(uint8s, z => z.charCodeAt(0));

        return "0x" + Array.prototype.map.call(new Uint8Array(uint8s), x => ('00' + x.toString(16)).slice(-2)).join('');
    },

    to_bigint: (uint8s) => {
        if (typeof uint8s === 'number')
            return new BigInteger(uint8s);

        return new BigInteger(Utils.to_hex(uint8s));
    },

    get_bits: (v) => {
        const repr = [];

        while (v >= 1) {
            repr.unshift(Math.floor(v % 2));
            v /= 2;
        }

        return repr;
    },

    hash: (word) => {
        return Utils.to_bigint(sodium.crypto_generichash(16, new String(word)));
    },

};
