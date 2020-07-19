let Crypto = {

    N: 101,
    G: 5,

    get_keypair: () => {
        const x = RNG.Zn_star(Crypto.N-1);
        const H = CMath.square_and_mult(Crypto.G, x);

        return { pk: H, sk: x };
    },

    sign: (msg, keypair) => {
        const { G, N } = Crypto;
        const { pk, sk } = keypair;

        var s = 0;

        while (s === 0) {
            var k = RNG.Zn_star(N-1);
            var r = CMath.square_and_mult(G, k);
            s = CMath.div(Utils.hash(msg) - sk * r, k, N-1);
        }

        return { msg, r, s };
    },

    verify: (signed, keypair) => {
        const { msg, r, s } = signed;

        const p1 = CMath.square_and_mult(Crypto.G, Utils.hash(msg));
        const p2 = CMath.mult(CMath.square_and_mult(keypair.pk, r), CMath.square_and_mult(r, s));

        return p1 === p2;
    },

    encrypt: (msg, nonce, keypair) => {

        const { pk } = keypair;
        const { G } = Crypto;
        const y = nonce;//RNG.Zn();

        var c1, c2;
        if (typeof msg === "number") {
            c1 = G;
            c2 = msg;
        } else {
            c1 = msg.c1;
            c2 = msg.c2;
        }

        const s = CMath.square_and_mult(pk, y);

        c1 = CMath.square_and_mult(c1, y);
        c2 = CMath.mult(c2, s);

        return { c1, c2 };
    },

    decrypt: (msg, keypair) => {
        const { sk } = keypair;
        var { c1, c2 } = msg;

        const s = CMath.square_and_mult(c1, sk);

        return CMath.div(c2, s);
    },

    reveal: (msg, y, keypair) => {
        const { pk } = keypair;
        const c1 = CMath.square_and_mult(msg.c1, CMath.inv(y));
        const c2 = CMath.div(msg.c2, CMath.square_and_mult(pk, y));

        return { c1, c2 };
    }


};
