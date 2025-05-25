export default {
    template: `
        <div class="container text-center d-flex flex-column align-items-center justify-content-center">
        <img :src= "errorImage" alt="Lost Icon" width="150" class="mb-4">
        <h1 class="text-danger fw-bold">Oops! You're Lost.</h1>
        <p class="lead text-muted">The page you're looking for doesn't seem to exist.</p>

        <router-link id="redirect-btn" to="/" class="btn btn-primary px-4 py-2">Return Home</router-link>
        </div>
    `,
    data() {
        return {
            errorImage: './static/image/error.png',  
        };
    }
};