<script>
export default {
    data() {
        return {
            users: [],
            editingUser: {
                name: "Himanshu Chhatrala",
                email: "himanshuchhatrala0493@gmail.com",
                contact: "8780870844",
                address: "Ahmedabad"
            },
        };
    },
    methods: {
        // Load all users from backend
        async fetchUsers() {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        // Open edit form with user details
        editUser(user) {
            this.editingUser = { ...user }; // Clone user object
        },

        // Send update request to backend
        async updateUser() {
            try {
                await axios.put(`http://localhost:5000/api/users/${this.editingUser._id}`, this.editingUser);
                this.editingUser = null;
                this.fetchUsers();
            } catch (error) {
                console.error("Error updating user:", error.response?.data || error.message);
            }
        },

        // Cancel editing
        cancelEdit() {
            this.editingUser = null;
        }
    },
}
</script>
<template>
    <div class="app-ecommerce">
        <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
            <div class="d-flex flex-column justify-content-center">
                <h4 class="mb-1">Update Profile</h4>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-tile mb-0">Contact information</h5>
                    </div>
                    <div class="card-body" v-if="editingUser">
                        <form method="post">
                            <div class="mb-6">
                                <label class="form-label" for="name">Name</label>
                                <input type="text" class="form-control" v-model="editingUser.name" id="name"
                                    placeholder="Name" name="productTitle" />
                            </div>
                            <div class="row mb-6">
                                <div class="col">
                                    <label class="form-label" for="">Email</label>
                                    <input type="email" class="form-control" v-model="editingUser.email" id="email"
                                        placeholder="Email" name="email" />
                                </div>
                                <div class="col">
                                    <label class="form-label" for="contact">Contact</label>
                                    <input type="text" class="form-control" v-model="editingUser.contact"
                                        placeholder="Contact" id="contact" />
                                </div>
                                <div class="col">
                                    <label class="form-label" for="address">Address</label>
                                    <input type="text" class="form-control" v-model="editingUser.address"
                                        placeholder="0123-4567" name="address" />
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary me-4" @click="updateUser()">Save</button>
                                <button class="btn btn-danger" @click="cancelEdit()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>