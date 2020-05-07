<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Halaman Dashboard<sup>2</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="/admin/dashboard">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a
        >
      </li>

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <nav
          class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
        >
          <!-- Sidebar Toggle (Topbar) -->
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="mr-2 d-none d-lg-inline text-gray-600 small"
                  >Admin</span
                >
                <img
                  class="img-profile rounded-circle"
                  src="https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg"
                />
              </a>
              <!-- Dropdown - User Information -->
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a
                  class="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i
                    class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                  ></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Page Heading -->
          <div
            class="d-sm-flex align-items-center justify-content-between mb-4"
          >
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>

          <div class="row">
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  List Pelaksanaan
                </h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>NPM</th>
                        <th>Nama Mahasiswa</th>
                        <th>Jenis Kegiatan</th>
                        <th>Tanggal Pelaksanaan</th>
                        <th>Jam</th>
                        <th>Dosen Terlibat</th>
                        <th>Program Studi</th>
                        <th>Syarat</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>NPM</th>
                        <th>Nama Mahasiswa</th>
                        <th>Jenis Kegiatan</th>
                        <th>Tanggal Pelaksanaan</th>
                        <th>Jam</th>
                        <th>Dosen Terlibat</th>
                        <th>Program Studi</th>
                        <th>Syarat</th>
                        <th>Aksi</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr v-for="mhs in list_mahasiswa" :key="mhs._id">
                        <td>{{ mhs.mahasiswa.nim }}</td>
                        <td>{{ mhs.mahasiswa.nama_mahasiswa }}</td>
                        <td>{{ mhs.jenis_kegiatan }}</td>
                        <td>{{ mhs.tgl_pelaksanaan }}</td>
                        <td>{{ mhs.jam }}</td>
                        <td>
                          <span v-if="mhs.dosen_pembimbing_1"
                            >{{ mhs.dosen_pembimbing_1.nama_dosen }} -
                            Pembimbing 1 <br /><br
                          /></span>
                          <span v-if="mhs.dosen_pembimbing_2"
                            >{{ mhs.dosen_pembimbing_2.nama_dosen }} -
                            Pembimbing 2 <br /><br
                          /></span>
                          <span v-if="mhs.dosen_penguji_1"
                            >{{ mhs.dosen_penguji_1.nama_dosen }} - Penguji 1
                            <br /><br
                          /></span>
                          <span v-if="mhs.dosen_penguji_2"
                            >{{ mhs.dosen_penguji_2.nama_dosen }} - Penguji
                            2</span
                          >
                        </td>
                        <td>{{ mhs.program_studi.nama_program_studi }}</td>
                        <td>
                          <button
                            @click="downloadLink(mhs.syarat)"
                            class="btn btn-link"
                          >
                            Download Persyaratan
                          </button>
                        </td>
                        <td>
                          <button
                            data-toggle="modal"
                            :data-target="`#ubahTanggal_${mhs._id}`"
                            class="btn btn-success"
                            @click="tempUbah(mhs)"
                          >
                            Ubah Jadwal
                          </button>
                          <button
                            @click="sendEmail(mhs._id)"
                            class="btn btn-primary"
                          >
                            Kirim Email
                          </button>
                        </td>

                        <!-- Ubah Data Modal -->
                        <div
                          class="modal fade"
                          :id="`ubahTanggal_${mhs._id}`"
                          tabindex="-1"
                          role="dialog"
                          :aria-labelledby="`ubahtanggal_label_${mhs._id}`"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5
                                  class="modal-title"
                                  :id="`ubahtanggal_label_${mhs._id}`"
                                >
                                  Ubah Jadwal
                                </h5>
                                <button
                                  class="close"
                                  type="button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <label>Tgl Pelaksanaan </label>

                                <input
                                  type="date"
                                  name="tgl_pelaksanaan"
                                  v-model="tgl_pelaksanaan"
                                  class="form-control"
                                  placeholder="Jawaban Anda"
                                />
                                <br />
                                <label>Jam Ujian </label>
                                <input
                                  type="time"
                                  name="jam_pelaksanaan"
                                  v-model="jam"
                                  class="form-control"
                                  placeholder="Format Jam:Menit"
                                />
                              </div>
                              <div class="modal-footer">
                                <button
                                  class="btn btn-secondary"
                                  type="button"
                                  data-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  data-dismiss="modal"
                                  class="btn btn-primary"
                                  @click="kirim(mhs)"
                                >
                                  Kirim
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Admin 2020</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            Select "Logout" below if you are ready to end your current session.
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button class="btn btn-primary" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      list_mahasiswa: [],
      tgl_pelaksanaan: "",
      jam: "",
      no_surat: ""
    };
  },
  mounted() {
    this.$http.get("pendaftaran/").then(
      result => {
        this.list_mahasiswa = result.data.data;
      },
      errorCallback => {
        console.log("error callback : ", errorCallback);
      }
    );
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
    },
    downloadLink(link) {
      window.open(link, "_blank");
    },
    tempUbah(mhs) {
      (this.tgl_pelaksanaan = mhs.tgl_pelaksanaan), (this.jam = mhs.jam);
    },
    kirim(mhs) {
      if (this.tgl_pelaksanaan === "" || this.jam === "") {
        this.$swal("peringatan", "harap jangan kosong", "warning");
      } else {
        this.$http
          .put(`pendaftaran/${mhs._id}/`, {
            tgl_pelaksanaan: this.tgl_pelaksanaan,
            jam: this.jam
          })
          .then(
            resultBro => {
              console.log("Result nya : ", resultBro.data);
              this.$swal("Berhasil", "Data Berhasil Di Ubah", "success");
              this.tgl_pelaksanaan = "";
              this.jam = "";
              this.getData();
            },
            errorBro => {
              console.log("ada error");
              this.$swal("Peringatan", "server ngadat", "error");
            }
          );
      }
    },
    sendEmail(_id) {
      var _this = this;
      this.$swal
        .fire({
          title: "Masukan No Surat",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Kirim Email",
          showLoaderOnConfirm: true,
          preConfirm: no_surat => {
            if (no_surat === "".trim()) {
              this.$swal.showValidationMessage(`Tidak Boleh Kosong`);
            } else {
              this.$http.post(
                `pendaftaran/send-email/${_id}/`,
                {
                  no_surat: no_surat
                },
                success => {
                  this.$swal.fire(
                    "Berhasil",
                    "Berhasil Mengirim Email",
                    "success"
                  );
                  setTimeout(function() {
                    _this.getData();
                  }, 3000);
                },
                error_bro => {
                  this.$swal.showValidationMessage(`Ada Kesalahan Pada Server`);
                }
              );
            }
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        .then(result => {
          if (result.value) {
            _this.getData();
            setTimeout(function() {
              _this.getData();
            }, 3000);
            this.$swal.fire("Berhasil", "Berhasil Mengirim Email", "success");
          }
        });
    },
    getData() {
      this.$http.get("pendaftaran/").then(
        result => {
          this.list_mahasiswa = result.data.data;
        },
        errorCallback => {
          console.log("error callback : ", errorCallback);
        }
      );
    }
  }
};
</script>
