const baseUrl = 'https://wallet-1sqh.onrender.com';

export const WalletAPI = {
    setup: async function (name, balance) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "balance": balance
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(baseUrl + "/setup", requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
    },
    transact: async function (id, amount, description) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "amount": amount,
            "description": description
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(baseUrl + `/transact/${id}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
    },
    transactions: async function (id, skip, limit) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch(baseUrl + `/transactions?walletId=${id}&skip=${skip}&limit=${limit}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}