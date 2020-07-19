let MPCCrypto = {

    shuffle: function(objlist, received_from, keypair) {
        var original = [];
        var permutation = [];

        for (let i = 0; i < objlist.length; i++) {
            original.push(i);
            permutation.push(i);
        }

        for(let i = objlist.length — 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = permutation[i];
            permutation[i] = permutation[j];
            permutation[j] = temp;
        }

        var secret_permutations = objlist.map( (obj, index) => {
            const nobj = {
                r: received_from,
                o: index,
                d: permutation[index],
            };

            const sign = Crypto.sign(Utils.to_bigint(nobj), keypair);
            const committed = { obj: nobj, sign };

            return Crypto.encrypt(Utils.to_bigint(committed), sign, keypair);
        });

        return secret_permutations;
    }
