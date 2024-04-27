export default ({ app }, inject) => {
    inject('localStorage', {
        setItem(key, value) {
            if (process.client) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        },

        getItem(key) {
            if (process.client) {
                return localStorage.getItem(key);
            }
            return null;
        },

        removeItem(key) {
            if (process.client) {
                localStorage.removeItem(key);
            }
        },

        setArray(key, array) {
            if (process.client) {
                localStorage.setItem(key, JSON.stringify(array));
            }
        },

        getArray(key) {
            if (process.client) {
                const array = localStorage.getItem(key);
                return array ? JSON.parse(array) : [];
            }
            return [];
        },
        addItemToArray(key, item) {
            if (process.client) {
                const array = this.getArray(key);
                array.push(item);
                this.setArray(key, array);
            }
        },
        removeItemFromArray(key, item) {
            if (process.client) {
                const array = this.getArray(key);
                const index = array.indexOf(item);
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setArray(key, array);
                }
            }
        },
    });
};
