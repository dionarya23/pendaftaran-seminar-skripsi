<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <h1 class="card-title">
              Pendaftaran Ujian PKL - Seminar - Ujian Skripsi/Artikel Ilmiah
            </h1>
            Fakultas Pertanian UTM <br /><br />
            * Selama bulan Ramadhan, berkas pendafataran ujian/seminar akan
            diproses pada waktu jam kerja. Setiap hari senin-jumat, pukul :
            08.00-15.00 WIB.
            <br /><br />
            <span class="required">* Wajib</span>
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>Email Mahasiswa <span class="required">*</span></label>
            <input
              type="email"
              name="email_mahasiswa"
              v-model="email_mahasiswa"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <label>No. Telp. Mahasiswa <span class="required">*</span></label>
            <input
              type="text"
              name="email_mahasiswa"
              v-model="notelp_mahasiswa"
              class="form-control"
              placeholder="Jawaban Anda"
            />
          </div>
        </div>

        <div class="card" style="margin-top:10px">
          <div class="card-body">
            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-5 pt-0">
                  Jenis Kegiatan <span class="required">*</span>
                </legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="Ujian Pkl"
                      v-model="jenis_kegiatan"
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Ujian Pkl
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="Seminar"
                      v-model="jenis_kegiatan"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Seminar
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="Ujian Skripsi/Artikel Ilmiah"
                      v-model="jenis_kegiatan"
                    />
                    <label class="form-check-label" for="gridRadios3">
                      Ujian Skripsi/Artikel Ilmiah
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <button @click="berikutnya" class="btn btn-primary">Berikutnya</button>
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
  name: "Pendaftaran",
  data() {
    return {
      email_mahasiswa: "",
      notelp_mahasiswa: "",
      jenis_kegiatan: ""
    };
  },
  mounted() {
    this.email_mahasiswa = localStorage.getItem("email_mahasiswa")
      ? localStorage.getItem("email_mahasiswa")
      : "";
    this.notelp_mahasiswa = localStorage.getItem("notelp_mahasiswa")
      ? localStorage.getItem("notelp_mahasiswa")
      : "";
    if (localStorage.getItem("jenis_kegiatan")) {
      this.jenis_kegiatan = localStorage.getItem("jenis_kegiatan");
      if (this.jenis_kegiatan === "Ujian Pkl") {
        document
          .getElementById("gridRadios1")
          .setAttribute("checked", "checked");
      } else if (this.jenis_kegiatan === "Seminar") {
        document
          .getElementById("gridRadios2")
          .setAttribute("checked", "checked");
      } else if (this.jenis_kegiatan === "Ujian Skripsi/Artikel Ilmiah") {
        document
          .getElementById("gridRadios3")
          .setAttribute("checked", "checked");
      }
    }
  },
  methods: {
    berikutnya() {
    
      if (
        this.email_mahasiswa === "" ||
        this.notelp_mahasiswa === "" ||
        this.jenis_kegiatan === ""
      ) {
        this.$swal("Peringatan", "Harap Isi semua", "warning");
      } else {
        localStorage.setItem("email_mahasiswa", this.email_mahasiswa);
        localStorage.setItem("notelp_mahasiswa", this.notelp_mahasiswa);
        localStorage.setItem("jenis_kegiatan", this.jenis_kegiatan);

        this.$router.push({ name: "Judul" });
      }
    }
  }
};
</script>
