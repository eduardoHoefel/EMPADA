let CMath = {

    mod: (a, n=null) => {
        if (n === null)
            n = Crypto.N;

        while (a < 0) {
            a += n;
        }

        return a % n;
    },

    mult: (a, b, n=null) => {
        if (n === null)
            n = Crypto.N;

        return CMath.mod(a * b, n);
    },

    div: (a, b, n=null) => {
        if (n === null)
            n = Crypto.N;

        return CMath.mult(a, CMath.inv(b), n);
    },

    inv: (a, n=null) => {
        if (n === null)
            n = Crypto.N;

        if (a === 0) return 0;

        for (let i = 0; i < n; i++)
            if (CMath.mult(a, i, n) === 1)
                return i;

        alert("ERROR!");
        return 0;
    },

    square_and_mult: (b, e, n=null) => {
        if (n === null)
            n = Crypto.N;

        const iterations = Utils.get_bits(e);
        let z = 1;

        for (let i = 0; i < iterations.length; i++) {
            z = Math.pow(z, 2);

            if (iterations[i] === 1) {
                z *= b;
            }

            z %= n;
        }

        return z;
    },

}
