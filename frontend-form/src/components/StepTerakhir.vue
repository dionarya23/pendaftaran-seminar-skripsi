<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <h1 class="card-title">
              Pendaftaran Ujian PKL - Seminar - Ujian Skripsi/Artikel Ilmiah
            </h1>
            <span class="required">* Wajib</span>
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div
            class="card-header"
            style="background-color:rgb(76, 175, 80);color:white"
          >
            <h1>{{ jenis_kegiatan }}</h1>
          </div>
          <div class="card-body">
            <label
              >Nama Mahasiswa - {{ program_studi }} {{ jenis_kegiatan }}
              <span class="required">*</span></label
            >
            <select class="form-control" v-model="mahasiswa">
              <option value="">Pilih</option>
              <option
                v-for="mahasiswa in list_mahasiswa"
                :key="mahasiswa._id"
                :value="mahasiswa._id"
                >{{ mahasiswa.nama_mahasiswa }} - {{ mahasiswa.nim }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="is_dosen_pembimbing_1">
          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Dosen Pembimbing 1 - {{ program_studi }} {{ jenis_kegiatan }}
                <span class="required">*</span></label
              >
              <select class="form-control" v-model="dosen_pembimbing_1">
                <option value="">Pilih</option>
                <option
                  v-for="dosen in list_dosen"
                  :key="dosen._id"
                  :value="dosen._id"
                  >{{ dosen.nama_dosen }} - {{ dosen.nip }}
                </option>
              </select>
            </div>
          </div>

          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Email Dosen Pembimbing 1 <span class="required">*</span></label
              >
              <input
                type="text"
                name="email_dosen_pembimbing_1"
                v-model="email_dosen_pembimbing_1"
                class="form-control"
                placeholder="Jawaban Anda"
              />
            </div>
          </div>
        </div>

        <div v-if="is_dosen_pembimbing_2">
          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Dosen Pembimbing 2 - {{ program_studi }} {{ jenis_kegiatan }}
                <span class="required">*</span></label
              >
              <select class="form-control" v-model="dosen_pembimbing_2">
                <option value="">Pilih</option>
                <option
                  v-for="dosen in list_dosen"
                  :key="dosen._id"
                  :value="dosen._id"
                  >{{ dosen.nama_dosen }} - {{ dosen.nip }}
                </option>
              </select>
            </div>
          </div>

          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Email Dosen Pembimbing 2 <span class="required">*</span></label
              >
              <input
                type="text"
                name="email_dosen_pembimbing_2"
                v-model="email_dosen_pembimbing_2"
                class="form-control"
                placeholder="Jawaban Anda"
              />
            </div>
          </div>
        </div>

        <div v-if="is_dosen_penguji_1">
          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Dosen Penguji 1 - {{ program_studi }} {{ jenis_kegiatan }}
                <span class="required">*</span></label
              >
              <select class="form-control" v-model="dosen_penguji_1">
                <option value="">Pilih</option>
                <option
                  v-for="dosen in list_dosen"
                  :key="dosen._id"
                  :value="dosen._id"
                  >{{ dosen.nama_dosen }} - {{ dosen.nip }}
                </option>
              </select>
            </div>
          </div>

          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Email Dosen Penguji 1 <span class="required">*</span></label
              >
              <input
                type="text"
                name="email_dosen_pembimbing_1"
                v-model="email_dosen_penguji_1"
                class="form-control"
                placeholder="Jawaban Anda"
              />
            </div>
          </div>
        </div>

        <div v-if="is_dosen_penguji_2">
          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Dosen Penguji 2 - {{ program_studi }} {{ jenis_kegiatan }}
                <span class="required">*</span></label
              >
              <select class="form-control" v-model="dosen_penguji_2">
                <option value="">Pilih</option>
                <option
                  v-for="dosen in list_dosen"
                  :key="dosen._id"
                  :value="dosen._id"
                  >{{ dosen.nama_dosen }} - {{ dosen.nip }}
                </option>
              </select>
            </div>
          </div>

          <div class="card" style="margin-top:10px">
            <div class="card-body">
              <label
                >Email Dosen Penguji 2 <span class="required">*</span></label
              >
              <input
                type="text"
                name="email_dosen_pembimbing_2"
                v-model="email_dosen_penguji_2"
                class="form-control"
                placeholder="Jawaban Anda"
              />
            </div>
          </div>
        </div>
        <button @click="kembali" class="btn btn-light">Kembali</button>
        <button @click="submit" class="btn btn-primary">Kirim</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.required {
  color: red;
}

.btn {
  margin-top: 20px;
  margin-botom: 20px;
}
</style>

<script>
export default {
  name: "StepTerakhir",
  data() {
    return {
      jenis_kegiatan: "",
      program_studi: "",
      mahasiswa: "",
      list_mahasiswa: [],
      list_dosen: [],
      email_dosen_pembimbing_1: "",
      dosen_pembimbing_1: "",
      email_dosen_pembimbing_2: "",
      dosen_pembimbing_2: "",

      email_dosen_penguji_1: "",
      dosen_penguji_1: "",
      email_dosen_penguji_2: "",
      dosen_penguji_2: "",

      id_program_studi: "",

      is_dosen_penguji_2: false,
      is_dosen_penguji_1: false,
      is_dosen_pembimbing_1: false,
      is_dosen_pembimbing_2: false
    };
  },
  mounted() {
    this.jenis_kegiatan = localStorage.getItem("jenis_kegiatan")
      ? localStorage.getItem("jenis_kegiatan")
      : "";
    this.program_studi = localStorage.getItem("program_studi")
      ? localStorage.getItem("program_studi").split("-")[1]
      : "";

    this.$http.get("mahasiswa/").then(
      result => {
        this.list_mahasiswa = result.data.data;
      },
      erorr => {
        console.log("error : ", error);
      }
    );

    this.mahasiswa = localStorage.getItem("mahasiswa")
      ? localStorage.getItem("mahasiswa")
      : "";

    if (this.jenis_kegiatan === "Ujian Pkl") {
      this.is_dosen_pembimbing_1 = true;
      this.is_dosen_penguji_1 = true;
      this.dosen_pembimbing_1 = localStorage.getItem("dosen_pembimbing_1")
        ? localStorage.getItem("dosen_pembimbing_1")
        : "";
      this.dosen_penguji_1 = localStorage.getItem("dosen_penguji_1")
        ? localStorage.getItem("dosen_penguji_1")
        : "";
    } else if (this.jenis_kegiatan === "Seminar") {
      this.is_dosen_pembimbing_1 = true;
      this.is_dosen_pembimbing_2 = true;
      this.dosen_pembimbing_1 = localStorage.getItem("dosen_pembimbing_1")
        ? localStorage.getItem("dosen_pembimbing_1")
        : "";
      this.dosen_pembimbing_2 = localStorage.getItem("dosen_pembimbing_2")
        ? localStorage.getItem("dosen_pembimbing_2")
        : "";
    } else if (this.jenis_kegiatan === "Ujian Skripsi/Artikel Ilmiah") {
      this.is_dosen_pembimbing_1 = true;
      this.is_dosen_pembimbing_2 = true;
      this.is_dosen_penguji_1 = true;
      this.is_dosen_penguji_2 = true;

      this.dosen_pembimbing_1 = localStorage.getItem("dosen_pembimbing_1")
        ? localStorage.getItem("dosen_pembimbing_1")
        : "";
      this.dosen_penguji_1 = localStorage.getItem("dosen_penguji_1")
        ? localStorage.getItem("dosen_penguji_1")
        : "";
      this.dosen_penguji_2 = localStorage.getItem("dosen_penguji_2")
        ? localStorage.getItem("dosen_penguji_2")
        : "";
      this.dosen_pembimbing_2 = localStorage.getItem("dosen_pembimbing_2")
        ? localStorage.getItem("dosen_pembimbing_2")
        : "";
    }

    this.$http
      .get(
        `dosen/program-studi/${
          localStorage.getItem("program_studi").split("-")[0]
        }/`
      )
      .then(
        response => {
          this.list_dosen = response.data.data;
        },
        erorrResult => {
          console.log("error : ", erorrResult);
        }
      );
  },
  methods: {
    submit() {
      let _this = this;
      if (this.jenis_kegiatan === "Ujian Pkl") {
        if (
          this.dosen_pembimbing_1 === "" ||
          this.dosen_penguji_1 === "" ||
          this.email_dosen_pembimbing_1 === "" ||
          this.email_dosen_penguji_1 === "" ||
          this.mahasiswa === ""
        ) {
          this.$swal(
            "Peringatan",
            "Silahkan Isi Form Yang telah disediakan",
            "warning"
          );
        } else {
          const senData = {
            email_mahasiswa: localStorage.getItem("email_mahasiswa"),
            notelp_mahasiswa: localStorage.getItem("notelp_mahasiswa"),
            tgl_pelaksanaan: localStorage.getItem("tgl_pelaksanaan"),
            judul: localStorage.getItem("judul"),
            syarat: localStorage.getItem("syarat"),
            jam: localStorage.getItem("jam"),
            jenis_kegiatan: this.jenis_kegiatan,
            mahasiswa: this.mahasiswa,
            dosen_pembimbing_1: this.dosen_pembimbing_1,
            dosen_penguji_1: this.dosen_penguji_1,
            email_dosen_pembimbing: [this.email_dosen_pembimbing_1],
            email_dosen_penguji: [this.email_dosen_penguji_1]
          };

          this.$http.post("pendaftaran/", senData).then(
            resultReponse => {
              console.log(resultReponse.data);
              _this.showModal();
            },
            errorSend => {
              console.log("Eror send ", errorSend);
            }
          );
        }
      } else if (this.jenis_kegiatan === "Seminar") {
        if (
          this.dosen_pembimbing_1 === "" ||
          this.dosen_pembimbing_2 === "" ||
          this.email_dosen_pembimbing_1 === "" ||
          this.email_dosen_pembimbing_2 === "" ||
          this.mahasiswa === ""
        ) {
          this.$swal(
            "Peringatan",
            "Silahkan Isi Form Yang telah disediakan",
            "warning"
          );
        } else {
          const senData = {
            email_mahasiswa: localStorage.getItem("email_mahasiswa"),
            notelp_mahasiswa: localStorage.getItem("notelp_mahasiswa"),
            tgl_pelaksanaan: localStorage.getItem("tgl_pelaksanaan"),
            judul: localStorage.getItem("judul"),
            syarat: localStorage.getItem("syarat"),
            jam: localStorage.getItem("jam"),
            jenis_kegiatan: this.jenis_kegiatan,
            mahasiswa: this.mahasiswa,
            dosen_pembimbing_1: this.dosen_pembimbing_1,
            dosen_pembimbing_2: this.dosen_pembimbing_2,
            email_dosen_pembimbing: [
              this.email_dosen_pembimbing_1,
              this.email_dosen_pembimbing_2
            ]
          };

          this.$http.post("pendaftaran/", senData).then(
            resultReponse => {
              console.log(resultReponse.data);
              _this.showModal();
            },
            errorSend => {
              console.log("Eror send ", errorSend);
            }
          );
        }
      } else if (this.jenis_kegiatan === "Ujian Skripsi/Artikel Ilmiah") {
        if (
          this.dosen_pembimbing_1 === "" ||
          this.dosen_pembimbing_2 === "" ||
          this.email_dosen_pembimbing_1 === "" ||
          this.email_dosen_pembimbing_2 === "" ||
          this.dosen_penguji_1 === "" ||
          this.dosen_penguji_2 === "" ||
          this.email_dosen_penguji_1 === "" ||
          this.email_dosen_penguji_2 === "" ||
          this.mahasiswa === ""
        ) {
          this.$swal(
            "Peringatan",
            "Silahkan Isi Form Yang telah disediakan",
            "warning"
          );
        } else {
          const senData = {
            email_mahasiswa: localStorage.getItem("email_mahasiswa"),
            notelp_mahasiswa: localStorage.getItem("notelp_mahasiswa"),
            tgl_pelaksanaan: localStorage.getItem("tgl_pelaksanaan"),
            judul: localStorage.getItem("judul"),
            syarat: localStorage.getItem("syarat"),
            jam: localStorage.getItem("jam"),
            jenis_kegiatan: this.jenis_kegiatan,
            mahasiswa: this.mahasiswa,
            dosen_pembimbing_1: this.dosen_pembimbing_1,
            dosen_penguji_1: this.dosen_penguji_1,
            dosen_pembimbing_2: this.dosen_pembimbing_2,
            dosen_penguji_2: this.dosen_penguji_2,
            email_dosen_pembimbing: [
              this.email_dosen_pembimbing_1,
              this.email_dosen_pembimbing_2
            ],
            email_dosen_penguji: [
              this.email_dosen_penguji_1,
              this.email_dosen_penguji_2
            ]
          };

          this.$http.post("pendaftaran/", senData).then(
            resultReponse => {
              console.log(resultReponse.data);
              _this.showModal();
            },
            errorSend => {
              console.log("Eror send ", errorSend);
            }
          );
        }
      }
    },
    showModal() {
      let timerInterval;
      this.$swal
        .fire({
          title: "Berhasil, Anda Telah Medaftar",
          html: "Terimakasih",
          timer: 4000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            this.$swal.showLoading();
            timerInterval = setInterval(() => {
              const content = Swal.getContent();
              if (content) {
                const b = content.querySelector("b");
                if (b) {
                  b.textContent = Swal.getTimerLeft();
                }
              }
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
            this.reset()
          }
        })
        .then(result => {
          /* Read more about handling dismissals below */
          if (result.dismiss === this.$swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
    },
    reset() {
      localStorage.removeItem("jenis_kegiatan");
      localStorage.removeItem("email_mahasiswa");
      localStorage.removeItem("syarat");
      localStorage.removeItem("jenis_seminar");
      localStorage.removeItem("program_studi");
      localStorage.removeItem("tgl_pelaksanaan");
      localStorage.removeItem("jam");
      localStorage.removeItem("notelp_mahasiswa");
      localStorage.removeItem("namaFile");
      localStorage.removeItem("judul");
      this.$router.push({ name: "Pendaftaran" });
    },
    kembali() {
      this.$router.push({ name: "Judul" });
    }
  }
};
</script>
