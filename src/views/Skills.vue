<script>
import axios from "axios";

export default {
    data() {
        return {
            skills: [],
            editingSkill: null,
            newSkill: { skill_name: "", skill_img: null, skill_percentage: 0 },
        };
    },
    methods: {
        async fetchSkills() {
            const res = await axios.get("http://localhost:5000/api/skills/list");
            this.skills = res.data.details;
        },
        onFileChange(event) {
            this.newSkill.skill_img = event.target.files[0];
        },
        async addSkill() {
            if (!this.newSkill.skill_name || !this.newSkill.skill_img || !this.newSkill.skill_percentage) {
                console.error("Please fill all fields");
                return;
            }

            const formData = new FormData();

            formData.append("skill_name", this.newSkill.skill_name);
            formData.append("skill_percentage", this.newSkill.skill_percentage);
            formData.append("file", this.newSkill.skill_img);
            formData.append("upload_preset", "Skills_Image");

            try {
                const cloudinaryResponse = await axios.post(
                    "https://api.cloudinary.com/v1_1/dazosfdi7/image/upload",
                    formData
                );
                const imageUrl = cloudinaryResponse.data.secure_url;

                await axios.post("http://localhost:5000/api/skills/create", {
                    skill_name: this.newSkill.skill_name,
                    skill_percentage: this.newSkill.skill_percentage,
                    skill_img: imageUrl
                }, {
                    headers: { "Content-Type": "application/json" },
                }).then(response => {
                    console.log("Skill added");
                }).catch(error => {
                    console.log(error.response.data);
                    console.error("Error:", error.response.data);
                });
                this.newSkill = {
                    skill_name: '',
                    skill_img: null,
                    skill_percentage: '',
                }
                this.$refs.fileInput.value = ''
                this.fetchSkills();
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
        },
        async deleteSkill(id) {
            await axios.delete(`http://localhost:5000/api/skills/${id}`);
            this.fetchSkills();
        },
        editSkill(skill) {
            if (!skill) return;
            this.editingSkill = { ...skill };
        },
        cancelEdit() {
            this.editingSkill = null;
        },
        async updateSkill() {
            const formData = new FormData();
            const skillId = this.editingSkill.skill_name;

            formData.append("skill_name", this.editingSkill.skill_name);
            formData.append("skill_percentage", this.editingSkill.skill_percentage);

            if (this.editingSkill.skill_img instanceof File) {
                formData.append("skill_img", this.editingSkill.skill_img);
            }

            try {
                let imageUrl = this.editingSkill.skill_img;
                if (this.editingSkill.skill_img instanceof File) {
                    const imageFormData = new FormData();
                    imageFormData.append("file", this.editingSkill.skill_img);
                    imageFormData.append("upload_preset", "Skills_Image"); // Your Cloudinary upload preset

                    const cloudinaryResponse = await axios.post(
                        "https://api.cloudinary.com/v1_1/dazosfdi7/image/upload",
                        imageFormData
                    );

                    imageUrl = cloudinaryResponse.data.secure_url; // Get new image URL
                }
                formData.append("skill_img", imageUrl);

                await axios.put(`http://localhost:5000/api/skills/edit/${this.editingSkill.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                console.log("Skill updated successfully");
                this.editingSkill = null;
                this.fetchSkills();
            } catch (error) {
                console.error("Error updating skill:", error.response?.data || error.message);
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.newSkill.skill_img = file.name;
            }
        }
    },
    mounted() {
        this.fetchSkills();
    }
};
</script>
<template>
    <div class="app-ecommerce">
        <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
            <div class="d-flex flex-column justify-content-center">
                <h4 class="mb-1">Add Skill</h4>
            </div>
        </div>

        <div class="row">
            <!-- First column-->
            <div class="col-12 col-lg-12">
                <!-- Variants -->
                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Skill</h5>
                    </div>
                    <div class="card-body">
                        <form class="form-repeater" @submit.prevent="addSkill">
                            <div data-repeater-list="group-a">
                                <div data-repeater-item>
                                    <div class="row">
                                        <div class="mb-6 col-12">
                                            <input type="text" v-model="newSkill.skill_name" id="form-repeater-1-2"
                                                class="form-control" placeholder="Enter skill" />
                                        </div>
                                        <div class="mb-6 col-12">
                                            <input type="file" @change="onFileChange" id="form-repeater-1-2"
                                                class="form-control" placeholder="Enter skill" ref="fileInput" />
                                        </div>
                                        <div class="mb-6 col-12">
                                            <input type="number" v-model="newSkill.skill_percentage"
                                                id="form-repeater-1-2" class="form-control"
                                                placeholder="Enter percentage" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary" data-repeater-create>
                                    <i class="ti ti-plus ti-xs me-2"></i>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="card mb-6">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Manage Skills</h5>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Skill Name</th>
                                    <th class="text-center">Image</th>
                                    <th class="text-center">Percentage</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(skill, index) in skills" :key="skill._id">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ skill.SkillName }}</td>
                                    <td class="text-center"><img :src="skill.SkillImage" :alt="skill.SkillName"
                                            width="50" height="50" />
                                    </td>
                                    <td class="text-center">{{ skill.SkillPercentage }}%</td>
                                    <td class="text-center">
                                        <button @click="viewSkill(skill._id)"
                                            class="btn btn-primary mr-px me-3">View</button>
                                        <button type="button" @click="editSkill(skill)" class="btn btn-success me-3"
                                            data-bs-toggle="modal" data-bs-target="#addNewCCModal">
                                            Edit
                                        </button>
                                        <button @click="deleteSkill(skill._id)"
                                            class="btn btn-danger mr-px">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /Inventory -->
            </div>
            <!-- /Second column -->
            <div class="modal fade" id="addNewCCModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered1 modal-simple modal-add-new-cc">
                    <div class="modal-content">
                        <div class="modal-body">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="text-left mb-6">
                                <h4 class="mb-2">Update Skill</h4>
                            </div>
                            <form id="addNewCCForm" class="row g-6" v-if="editingSkill">
                                <div class="col-md-12">
                                    <label class="form-label" for="skill_name">Skill
                                        Name</label>
                                    <input type="text" id="skill_name" v-model="editingSkill.SkillName"
                                        class="form-control" placeholder="Enter a skill" />
                                </div>
                                <div class="col-12 col-md-8">
                                    <div class="row ">
                                        <div class="col-md-4">
                                            <label class="form-label" for="modalAddCardName">Skill Image</label>
                                            <img :src="editingSkill.SkillImage" :alt="editingSkill.SkillName"
                                                width="80" />
                                        </div>
                                        <div class="col-md-12">
                                            <input type="file" @change="onFileChange" id="modalAddCardName"
                                                class="form-control mt-8" placeholder="John Doe" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-12">
                                    <label class="form-label" for="modalAddCardExpiryDate">Skill Percentage</label>
                                    <input type="number" v-model="editingSkill.SkillPercentage"
                                        id="modalAddCardExpiryDate" class="form-control expiry-date-mask"
                                        placeholder="Enter a Percentage(%)" />
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" @click="updateSkill()"
                                        class="btn btn-primary me-3">Submit</button>
                                    <button type="reset" @click="cancelEdit()" class="btn btn-label-secondary btn-reset"
                                        data-bs-dismiss="modal" aria-label="Close">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>