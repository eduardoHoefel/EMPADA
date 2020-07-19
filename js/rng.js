let RNG = {
    Zn: (n=null) => {
        if (n === null)
            n = Crypto.N;

        return Math.floor(Math.random() * n);
    },

    Zn_star: (n=null) => {
        if (n === null)
            n = Crypto.N;

        let v = 0;
        while (v === 0 || Utils.gcd(n, v) === 1) {
            v = RNG.Zn(n);
        }

        return v;
    }
}
