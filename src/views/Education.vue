<script>
import "../assets/vendor/css/rtl/core.css"
import "../assets/vendor/css/rtl/theme-default.css"
import axios from "axios";

export default {
    data() {
        return {
            education: [],
            editingEducation: null,
            educations: [
                { degree: "", university: "", startYear: "", endYear: "" },
            ],
        };
    },
    methods: {
        async fetchEducation() {
            const res = await axios.get("http://localhost:5000/api/education/list");
            this.educations = res.data.details;
        },
        removeEducation(index) {
            this.educations.splice(index, 1);
        },
        async addEducation() {
            if (!this.educations.degree || !this.educations.university || !this.educations.startYear || !this.educations.endYear) {
                console.error("Please fill all fields");
                return;
            }

            try {
                await axios.post("http://localhost:5000/api/education/create").then(response => {
                    console.log("Education added");
                }).catch(error => {
                    console.error("Error:", error.response.data);
                });
                this.educations = {
                    degree: '',
                    university: '',
                    startYear: '',
                    endYear: '',
                }
                this.fetchEducation();
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
        },
    },
    mounted() {
        this.fetchEducation();
    }
};
</script>
<template>
    <div class="app-ecommerce">
        <!-- Add Product -->
        <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
            <div class="d-flex flex-column justify-content-center">
                <h4 class="mb-1">Add Education</h4>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-lg-12">
                <!-- Variants -->
                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Education</h5>
                    </div>
                    <div class="card-body">
                        <form class="form-repeater" @submit.prevent="addEducation">
                            <div>
                                <div>
                                    <div class="row">
                                        <div class="mb-6 col-6">
                                            <input type="text" v-model="this.educations.degree" id="form-repeater-1-2"
                                                class="form-control" placeholder="Enter Education" />
                                        </div>
                                        <div class="mb-6 col-6">
                                            <input type="text" v-model="this.educations.university"
                                                id="form-repeater-1-2" class="form-control"
                                                placeholder="Enter University" />
                                        </div>
                                        <div class="mb-6 col-6">
                                            <input type="number" v-model="this.educations.startYear"
                                                id="form-repeater-1-2" class="form-control"
                                                placeholder="Enter Start Year" />
                                        </div>
                                        <div class="mb-6 col-6">
                                            <input type="number" v-model="this.educations.endYear"
                                                id="form-repeater-1-2" class="form-control"
                                                placeholder="Enter End Year" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary" type="submit">
                                    <i class="ti ti-plus ti-xs me-2"></i>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Manage Education</h5>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Degree Name</th>
                                    <th class="text-center">University Name</th>
                                    <th class="text-center">Start Year</th>
                                    <th class="text-center">End Year</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(education, index) in educations" :key="education._id">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ education.degree }}</td>
                                    <td class="text-center">{{ education.university }}</td>
                                    <td class="text-center">{{ education.startYear }}</td>
                                    <td class="text-center">{{ education.endYear }}</td>
                                    <td class="text-center">
                                        <a href="" class="btn btn-success me-3">Edit</a>
                                        <a href="" class="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /Inventory -->
            </div>
            <!-- /Second column -->
        </div>
    </div>
</template>