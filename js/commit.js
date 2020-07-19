class Commit {
    constructor(value, nonce=null) {
        this.value = value;

        if (nonce === null)
            nonce = RNG.Zn();

        this.nonce = nonce;
    }

    toString() {
        return JSON.stringfy({
            value: this.value,
            nonce: this.nonce
        });
    }

    sign(keypair) {
        return Crypto.sign(this.toString(), keypair);
    }

    verify(sign, keypair) {
        return Crypto.verify(this.toString(), sign, keypair);
    }

    static recover(commit, sign, keypair) {
        const { value, nonce } = JSON.parse(commit);

        c = new Commit(value, nonce);

        if (verify(sign, keypair)) {
            return c;
        }

        alert("ERROR");
        return null;
    }
}
