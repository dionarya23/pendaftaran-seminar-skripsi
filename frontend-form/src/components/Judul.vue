<template>
  <div class="container">
    <div v-if="!isUpload" class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <h1 class="card-title">
              Pendaftaran Ujian PKL - Seminar - Ujian Skripsi/Artikel Ilmiah
            </h1>
            <span class="required">* Wajib</span>
          </div>
        </div>

        <div
          v-if="jenis_kegiatan == 'Ujian Pkl'"
          class="card"
          style="margin-top:10px"
        >
          <div
            class="card-header"
            style="background-color:rgb(76, 175, 80);color:white"
          >
            Ujian PKL
          </div>
          <div class="card-body">
            <label>Judul PKL <span class="required">*</span></label>
            <input
              type="text"
              name="judul PKL"
              v-model="judul"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div
          v-else-if="jenis_kegiatan == 'Seminar'"
          class="card"
          style="margin-top:10px"
        >
          <div
            class="card-header"
            style="background-color:rgb(76, 175, 80);color:white"
          >
            Seminar
          </div>
          <div class="card-body">
            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-5 pt-0">
                  Jenis Seminar <span class="required">*</span>
                </legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="seminar_hasil"
                      value="Seminar Hasil"
                      v-model="jenis_seminar"
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Seminar Hasil
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="seminar_proposal"
                      value="Seminar Proposal"
                      v-model="jenis_seminar"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Seminar Proposal
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div
          v-else-if="jenis_kegiatan == 'Ujian Skripsi'"
          class="card"
          style="margin-top:10px"
        >
          <div
            class="card-header"
            style="background-color:rgb(76, 175, 80);color:white"
          >
            Ujian Skripsi
          </div>
          <div class="card-body">
            <label>Judul Skripsi <span class="required">*</span></label>
            <input
              type="text"
              name="judul_skripsi"
              v-model="judul"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div
          v-if="jenis_kegiatan == 'Seminar'"
          class="card"
          style="margin-top:10px"
        >
          <div class="card-body">
            <label>Judul Seminar <span class="required">*</span></label>
            <input
              type="text"
              name="judul_skripsi"
              v-model="judul"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>Tgl Pelaksanaan <span class="required">*</span></label>
            <input
              type="date"
              name="tgl_pelaksanaan"
              v-model="tgl_pelaksanaan"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>Jam Ujian <span class="required">*</span></label>
            <input
              type="time"
              name="jam_pelaksanaan"
              v-model="jam"
              class="form-control"
              placeholder="Format Jam:Menit"
            />
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>Syarat-syarat <span class="required">*</span></label>
            <p v-if="jenis_kegiatan === 'Ujian Pkl'">
              Upload file meliputi : Acc Pembimbing, Acc Penguji, KRS, TOEFL.
              File harus bertipe pdf. Total file maksimal 1 MB. (Format nama
              file : namaberkas_nama_npm).
            </p>
            <p v-else-if="jenis_kegiatan === 'Seminar'">
              Upload file meliputi : Acc Pembimbing, FS-4. File harus bertipe
              pdf. Total file maksimal 1 MB. (Format nama file :
              namaberkas_nama_npm).
            </p>
            <p v-else-if="jenis_kegiatan === 'Ujian Skripsi'">
              Upload file meliputi : Acc Pembimbing, Acc Penguji, KRS, Transkrip
              Sementara, FS-2, FS-4, TOEFL, Bebas plagiasi. File harus disatukan
              dan bertipe pdf. Total file maksimal 1 MB. (Format nama file :
              namaberkas_nama_npm).
            </p>
            <input
              v-on:change="inputFile"
              type="file"
              class="form-control-file"
              name="email_mahasiswa"
              ref="syarat"
              accept="application/pdf"
            />
            <p>{{ nameFile }}</p>
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>Program Studi <span class="required">*</span></label>
            <select class="form-control" v-model="program_studi">
              <option value="">Pilih</option>
              <option
                v-for="studi in list_program_studi"
                :key="studi._id"
                :value="`${studi._id}-${studi.nama_program_studi}`"
                >{{ studi.nama_program_studi }}</option
              >
            </select>
          </div>
        </div>
        <button @click="kembali" class="btn btn-light">Kembali</button>
        <button @click="berikutnya" class="btn btn-primary">Berikutnya</button>
      </div>
    </div>

    <div v-else class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
      <p>Upload File...</p>
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
.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>

<script>
import firebase from "firebase";
export default {
  name: "Judul",
  data() {
    return {
      judul: "",
      tgl_pelaksanaan: "",
      jam: "",
      syarat: "",
      program_studi: "",
      list_program_studi: [],
      jenis_seminar: "",
      jenis_kegiatan: "",
      pdf: "",
      isUpload: false,
      nameFile: ""
    };
  },
  mounted() {
     window.onbeforeunload = function() {
      return "Are you sure you want to close the window?";
    };
    this.jenis_kegiatan = localStorage.getItem("jenis_kegiatan");
    this.$http.get("program-studi/").then(
      result => {
        this.list_program_studi = result.data.data;
      },
      error => {
        console.log("Error get teknologi : ", error);
      }
    );

    this.judul = localStorage.getItem("judul")
      ? localStorage.getItem("judul")
      : "";

    this.tgl_pelaksanaan = localStorage.getItem("tgl_pelaksanaan")
      ? localStorage.getItem("tgl_pelaksanaan")
      : "";

    this.jam = localStorage.getItem("jam") ? localStorage.getItem("jam") : "";

    this.program_studi = localStorage.getItem("program_studi")
      ? localStorage.getItem("program_studi")
      : "";

    this.nameFile = localStorage.getItem("namaFile")
      ? localStorage.getItem("namaFile")
      : "";

    if (localStorage.getItem("jenis_seminar")) {
      this.jenis_seminar = localStorage.getItem("jenis_seminar");
      if (this.jenis_seminar === "Seminar Hasil") {
        document
          .getElementById("seminar_hasil")
          .setAttribute("checked", "checked");
      } else if (this.jenis_seminar === "Seminar Proposal") {
        document
          .getElementById("seminar_proposal")
          .setAttribute("checked", "checked");
      }
    }
  },
  methods: {
    berikutnya() {
      if (this.jenis_kegiatan === "Seminar") {
        if (
          this.judul === "" ||
          this.tgl_pelaksanaan === "" ||
          this.jam === "" ||
          this.jenis_seminar === "" ||
          this.program_studi === ""
        ) {
          this.$swal(
            "Peringatan",
            "Harap jangan sampai ada field yang kosong",
            "warning"
          );
        } else {
          localStorage.setItem("judul", this.judul);
          localStorage.setItem("tgl_pelaksanaan", this.tgl_pelaksanaan);
          localStorage.setItem("jam", this.jam);
          localStorage.setItem(
            "jenis_seminar",
            this.jenis_seminar === "" ? null : this.jenis_seminar
          );
          localStorage.setItem("program_studi", this.program_studi);
          // localStorage.setItem("nameFile", this.nameFile)
          this.$router.push({ name: "StepTerakhir" });
        }
      } else {
        if (
          this.judul === "" ||
          this.tgl_pelaksanaan === "" ||
          this.jam === ""
        ) {
          this.$swal(
            "Peringatan",
            "Harap jangan sampai ada field yang kosong",
            "warning"
          );
        } else {
          localStorage.setItem("judul", this.judul);
          localStorage.setItem("tgl_pelaksanaan", this.tgl_pelaksanaan);
          localStorage.setItem("jam", this.jam);
          localStorage.setItem(
            "jenis_seminar",
            this.jenis_seminar === "" ? null : this.jenis_seminar
          );
          localStorage.setItem("program_studi", this.program_studi);
          // localStorage.setItem("nameFile", this.nameFile)

          this.$router.push({ name: "StepTerakhir" });
        }
      }
    },
    kembali() {
      this.$router.push({ name: "Pendaftaran" });
    },
    inputFile() {
      this.isUpload = true;
      var _this = this;
      this.pdf = this.$refs.syarat.files[0];
      this.nameFile = this.pdf.name;


      const storageRef = firebase
        .storage()
        .ref(this.nameFile)
        .put(this.pdf);

      storageRef.on(
        `state_changed`,
        snapshot => {
          // this.uploadValue =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.isUpload = false;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            localStorage.setItem("syarat", url);
            localStorage.setItem("namaeFile", _this.nameFile )
          });
        }
      );
    }
  }
};
</script>
