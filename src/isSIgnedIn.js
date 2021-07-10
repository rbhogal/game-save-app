class isSignedIn {
    constructor() {
        this.signedIn = false
    }

    signIn(cb) {
        this.signedIn = true
        cb();
    }

    signOut(cb) {
        this.signedIn = false;
        cb();
    }

    isSignedIn() {
        return this.authenticated;
    }
}

export default new isSignedIn();