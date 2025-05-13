import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";

interface DialogPrivacyAndPolicyProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogPrivacyAndPolicy({
  open,
  setOpen,
}: DialogPrivacyAndPolicyProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Kebijakan Privasi</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 leading-loose">
            <div>
              <p>Terakhir diperbarui: 15 Maret 2025</p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={"/images/logo.png"}
                alt="Charing Cub"
                width={1155}
                height={404}
                className="max-w-[100px]"
              />
            </div>
            <div>
              <p className="mb-4">
                Kebijakan Privasi ini menjelaskan kebijakan dan prosedur Kami
                mengenai pengumpulan, penggunaan, dan pengungkapan informasi
                Anda saat Anda menggunakan Layanan dan memberitahu Anda tentang
                hak privasi Anda serta bagaimana hukum melindungi Anda.
              </p>
              <p className="mb-4">
                Kami menggunakan Data Pribadi Anda untuk menyediakan dan
                meningkatkan Layanan. Dengan menggunakan Layanan, Anda setuju
                dengan pengumpulan dan penggunaan informasi sesuai dengan
                Kebijakan Privasi ini. Kebijakan Privasi ini dibuat dengan
                bantuan{" "}
                <Link
                  href="https://www.termsfeed.com/privacy-policy-generator/"
                  target="_blank"
                  className="underline font-bold"
                >
                  Privacy Policy Generator
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">Interpretasi dan Definisi</h2>
              <h3 className="font-bold mt-4 mb-2">Interpretasi</h3>
              <p className="mb-4">
                Kata-kata yang huruf awalnya dikapitalisasi memiliki arti yang
                didefinisikan di bawah kondisi berikut. Definisi-definisi
                berikut memiliki arti yang sama, baik dalam bentuk tunggal
                maupun jamak.
              </p>
              <h3 className="font-bold mt-4 mb-2">Definisi</h3>
              <p className="mb-4">Untuk tujuan Kebijakan Privasi ini:</p>
              <ul className="list-disc pl-8 space-y-4">
                <li>
                  <p>
                    <strong>Akun</strong> berarti akun unik yang dibuat untuk
                    Anda mengakses Layanan kami atau bagian dari Layanan kami.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Afiliasi</strong> berarti entitas yang mengontrol,
                    dikontrol oleh, atau berada di bawah kendali bersama dengan
                    suatu pihak, di mana &quot;kendali&quot; berarti kepemilikan
                    50% atau lebih saham, kepentingan ekuitas, atau surat
                    berharga lainnya yang berhak memberikan suara untuk
                    pemilihan direksi atau otoritas pengelola lainnya.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Perusahaan</strong> (disebut sebagai
                    &quot;Perusahaan&quot;, &quot;Kami&quot;, &quot;Kami&quot;,
                    atau &quot;Milik Kami&quot; dalam Perjanjian ini) merujuk
                    pada Charing Cub.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cookies</strong> adalah file kecil yang ditempatkan
                    di komputer, perangkat seluler, atau perangkat lain Anda
                    oleh situs web, yang berisi detail riwayat penjelajahan Anda
                    di situs web tersebut di antara banyak kegunaannya.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Negara</strong> merujuk pada: Indonesia
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Perangkat</strong> berarti perangkat apa pun yang
                    dapat mengakses Layanan seperti komputer, ponsel, atau
                    tablet digital.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Data Pribadi</strong> adalah informasi apa pun yang
                    terkait dengan individu yang teridentifikasi atau dapat
                    diidentifikasi.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Layanan</strong> merujuk pada Situs Web.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Penyedia Layanan</strong> berarti setiap orang atau
                    badan hukum yang memproses data atas nama Perusahaan. Ini
                    merujuk pada perusahaan atau individu pihak ketiga yang
                    dipekerjakan oleh Perusahaan untuk memfasilitasi Layanan,
                    menyediakan Layanan atas nama Perusahaan, melakukan layanan
                    yang terkait dengan Layanan, atau membantu Perusahaan dalam
                    menganalisis bagaimana Layanan digunakan.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Data Penggunaan</strong> merujuk pada data yang
                    dikumpulkan secara otomatis, baik yang dihasilkan oleh
                    penggunaan Layanan atau dari infrastruktur Layanan itu
                    sendiri (misalnya, durasi kunjungan halaman).
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Situs Web</strong> merujuk pada Charing Cub, dapat
                    diakses dari{" "}
                    <a
                      href="https://charingcub.com"
                      rel="external nofollow noopener"
                      target="_blank"
                      className="underline font-bold"
                    >
                      https://charingcub.com
                    </a>
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Anda</strong> berarti individu yang mengakses atau
                    menggunakan Layanan, atau perusahaan, atau badan hukum
                    lainnya yang atas nama individu tersebut mengakses atau
                    menggunakan Layanan, sebagaimana berlaku.
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">
                Pengumpulan dan Penggunaan Data Pribadi Anda
              </h2>
              <h3 className="font-bold mt-4 mb-2">
                Jenis Data yang Dikumpulkan
              </h3>
              <h4 className="text-lg font-bold mt-4 mb-2">Data Pribadi</h4>
              <p className="mb-4">
                Saat menggunakan Layanan Kami, Kami mungkin meminta Anda untuk
                memberikan Kami informasi identitas pribadi tertentu yang dapat
                digunakan untuk menghubungi atau mengidentifikasi Anda.
                Informasi identitas pribadi mungkin termasuk, tetapi tidak
                terbatas pada:
              </p>
              <ul className="list-disc pl-8 space-y-4">
                <li>
                  <p>Alamat email</p>
                </li>
                <li>
                  <p>Nama depan dan nama belakang</p>
                </li>
                <li>
                  <p>Data Penggunaan</p>
                </li>
              </ul>
              <h4 className="text-lg font-bold mt-4 mb-2">Data Penggunaan</h4>
              <p className="mb-4">
                Data Penggunaan dikumpulkan secara otomatis saat menggunakan
                Layanan.
              </p>
              <p className="mb-4">
                Data Penggunaan mungkin termasuk informasi seperti alamat
                Protokol Internet (IP) Perangkat Anda, jenis browser, versi
                browser, halaman Layanan kami yang Anda kunjungi, waktu dan
                tanggal kunjungan Anda, waktu yang dihabiskan di halaman
                tersebut, pengidentifikasi perangkat unik, dan data diagnostik
                lainnya.
              </p>
              <p className="mb-4">
                Saat Anda mengakses Layanan melalui atau melalui perangkat
                seluler, Kami mungkin mengumpulkan informasi tertentu secara
                otomatis, termasuk, tetapi tidak terbatas pada, jenis perangkat
                seluler yang Anda gunakan, ID unik perangkat seluler Anda,
                alamat IP perangkat seluler Anda, sistem operasi seluler Anda,
                jenis browser Internet seluler yang Anda gunakan,
                pengidentifikasi perangkat unik, dan data diagnostik lainnya.
              </p>
              <p className="mb-4">
                Kami juga dapat mengumpulkan informasi yang dikirim oleh browser
                Anda setiap kali Anda mengunjungi Layanan kami atau saat Anda
                mengakses Layanan melalui atau melalui perangkat seluler.
              </p>
              <h4 className="text-lg font-bold mt-4 mb-2">
                Teknologi Pelacakan dan Cookies
              </h4>
              <p className="mb-4">
                Kami menggunakan Cookies dan teknologi pelacakan serupa untuk
                melacak aktivitas di Layanan Kami dan menyimpan informasi
                tertentu. Teknologi pelacakan yang digunakan adalah beacon, tag,
                dan skrip untuk mengumpulkan dan melacak informasi serta untuk
                meningkatkan dan menganalisis Layanan Kami. Teknologi yang Kami
                gunakan mungkin termasuk:
              </p>
              <ul className="list-disc pl-8 space-y-4 mb-6">
                <li>
                  <strong>Cookies atau Browser Cookies.</strong> Cookie adalah
                  file kecil yang ditempatkan di Perangkat Anda. Anda dapat
                  menginstruksikan browser Anda untuk menolak semua Cookies atau
                  untuk menunjukkan kapan Cookie dikirim. Namun, jika Anda tidak
                  menerima Cookies, Anda mungkin tidak dapat menggunakan
                  beberapa bagian dari Layanan kami. Kecuali Anda telah
                  menyesuaikan pengaturan browser Anda sehingga akan menolak
                  Cookies, Layanan kami mungkin menggunakan Cookies.
                </li>
                <li>
                  <strong>Web Beacons.</strong> Bagian tertentu dari Layanan
                  kami dan email kami mungkin mengandung file elektronik kecil
                  yang dikenal sebagai web beacon (juga disebut sebagai gif
                  jernih, tag piksel, dan gif satu piksel) yang memungkinkan
                  Perusahaan, misalnya, untuk menghitung pengguna yang telah
                  mengunjungi halaman tersebut atau membuka email dan untuk
                  statistik situs web terkait lainnya (misalnya, merekam
                  popularitas bagian tertentu dan memverifikasi integritas
                  sistem dan server).
                </li>
              </ul>
              <p className="mb-4">
                Cookies dapat berupa &quot;Persisten&quot; atau
                &quot;Sesi&quot;. Cookies Persisten tetap ada di komputer
                pribadi atau perangkat seluler Anda saat Anda offline, sementara
                Cookies Sesi dihapus segera setelah Anda menutup browser web
                Anda. Anda dapat mempelajari lebih lanjut tentang cookies di
                artikel{" "}
                <Link
                  href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
                  target="_blank"
                  className="underline font-bold"
                >
                  TermsFeed
                </Link>{" "}
                .
              </p>
              <p className="mb-4">
                Kami menggunakan kedua jenis Cookies, baik Sesi maupun
                Persisten, untuk tujuan yang dijelaskan di bawah ini:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-4">
                <li>
                  <p>
                    <strong>Cookies yang Diperlukan / Esensial</strong>
                  </p>
                  <p>Tipe: Cookies Sesi</p>
                  <p>Dikelola oleh: Kami</p>
                  <p>
                    Tujuan: Cookies ini esensial untuk menyediakan Anda layanan
                    yang tersedia melalui Situs Web dan untuk memungkinkan Anda
                    menggunakan beberapa fiturnya. Mereka membantu
                    mengautentikasi pengguna dan mencegah penggunaan curang akun
                    pengguna. Tanpa Cookies ini, layanan yang Anda minta tidak
                    dapat disediakan, dan Kami hanya menggunakan Cookies ini
                    untuk menyediakan Anda layanan tersebut.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>
                      Cookies Kebijakan / Penerimaan Pemberitahuan Cookies
                    </strong>
                  </p>
                  <p>Tipe: Cookies Persisten</p>
                  <p>Dikelola oleh: Kami</p>
                  <p>
                    Tujuan: Cookies ini mengidentifikasi apakah pengguna telah
                    menerima penggunaan cookies di Situs Web.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cookies Fungsi</strong>
                  </p>
                  <p>Tipe: Cookies Persisten</p>
                  <p>Dikelola oleh: Kami</p>
                  <p>
                    Tujuan: Cookies ini memungkinkan kami untuk mengingat
                    pilihan yang Anda buat saat menggunakan Situs Web, seperti
                    mengingat detail login atau preferensi bahasa Anda. Tujuan
                    Cookies ini adalah untuk memberikan Anda pengalaman yang
                    lebih personal dan menghindari Anda harus memasukkan
                    preferensi Anda setiap kali Anda menggunakan Situs Web.
                  </p>
                </li>
              </ul>
              <p className="mb-4">
                Untuk informasi lebih lanjut tentang cookies yang kami gunakan
                dan pilihan Anda terkait cookies, silakan kunjungi Kebijakan
                Cookies kami atau bagian Cookies dari Kebijakan Privasi kami.
              </p>

              <h3 className="font-bold mt-4 mb-2">
                Penggunaan Data Pribadi Anda
              </h3>
              <p className="mb-4">
                Perusahaan dapat menggunakan Data Pribadi untuk tujuan berikut:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-4">
                <li>
                  <p>
                    <strong>
                      Untuk menyediakan dan memelihara Layanan kami
                    </strong>
                    , termasuk untuk memantau penggunaan Layanan kami.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk mengelola Akun Anda:</strong> untuk mengelola
                    pendaftaran Anda sebagai pengguna Layanan. Data Pribadi yang
                    Anda berikan dapat memberi Anda akses ke berbagai fungsi
                    Layanan yang tersedia untuk Anda sebagai pengguna terdaftar.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk pelaksanaan kontrak:</strong> pengembangan,
                    kepatuhan, dan pelaksanaan kontrak pembelian untuk produk,
                    barang, atau layanan yang telah Anda beli atau kontrak lain
                    dengan Kami melalui Layanan.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk menghubungi Anda:</strong> Untuk menghubungi
                    Anda melalui email, panggilan telepon, SMS, atau bentuk
                    komunikasi elektronik setara lainnya, seperti pemberitahuan
                    push aplikasi seluler mengenai pembaruan atau komunikasi
                    informatif yang terkait dengan fungsi, produk, atau layanan
                    yang dikontrak, termasuk pembaruan keamanan, ketika
                    diperlukan atau wajar untuk implementasinya.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk menyediakan Anda</strong> berita, penawaran
                    khusus, dan informasi umum tentang barang, layanan, dan
                    acara lain yang kami tawarkan yang serupa dengan yang telah
                    Anda beli atau tanyakan, kecuali Anda telah memilih untuk
                    tidak menerima informasi tersebut.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk mengelola permintaan Anda:</strong> Untuk
                    menangani dan mengelola permintaan Anda kepada Kami.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk transfer bisnis:</strong> Kami dapat
                    menggunakan informasi Anda untuk mengevaluasi atau melakukan
                    merger, divestasi, restrukturisasi, reorganisasi,
                    pembubaran, atau penjualan atau transfer lainnya dari
                    sebagian atau seluruh aset Kami, baik sebagai kelangsungan
                    usaha atau sebagai bagian dari kebangkrutan, likuidasi, atau
                    proses serupa, di mana Data Pribadi yang dimiliki oleh Kami
                    tentang pengguna Layanan kami termasuk di antara aset yang
                    ditransfer.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Untuk tujuan lain:</strong> Kami dapat menggunakan
                    informasi Anda untuk tujuan lain, seperti analisis data,
                    mengidentifikasi tren penggunaan, menentukan efektivitas
                    kampanye promosi kami, dan untuk mengevaluasi dan
                    meningkatkan Layanan, produk, layanan, pemasaran, dan
                    pengalaman Anda.
                  </p>
                </li>
              </ul>
              <p className="mb-4">
                Kami dapat membagikan informasi pribadi Anda dalam situasi
                berikut:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-4">
                <li>
                  <strong>Dengan Penyedia Layanan:</strong> Kami dapat
                  membagikan informasi pribadi Anda dengan Penyedia Layanan
                  untuk memantau dan menganalisis penggunaan Layanan kami, untuk
                  menghubungi Anda.
                </li>
                <li>
                  <strong>Untuk transfer bisnis:</strong> Kami dapat membagikan
                  atau mentransfer informasi pribadi Anda sehubungan dengan,
                  atau selama negosiasi, merger, penjualan aset Perusahaan,
                  pembiayaan, atau akuisisi seluruh atau sebagian bisnis Kami ke
                  perusahaan lain.
                </li>
                <li>
                  <strong>Dengan Afiliasi:</strong> Kami dapat membagikan
                  informasi Anda dengan Afiliasi Kami, dalam hal ini kami akan
                  meminta Afiliasi tersebut untuk menghormati Kebijakan Privasi
                  ini. Afiliasi termasuk perusahaan induk Kami dan setiap anak
                  perusahaan, mitra usaha patungan, atau perusahaan lain yang
                  Kami kendalikan atau yang berada di bawah kendali bersama
                  dengan Kami.
                </li>
                <li>
                  <strong>Dengan mitra bisnis:</strong> Kami dapat membagikan
                  informasi Anda dengan mitra bisnis Kami untuk menawarkan Anda
                  produk, layanan, atau promosi tertentu.
                </li>
                <li>
                  <strong>Dengan pengguna lain:</strong> ketika Anda membagikan
                  informasi pribadi atau berinteraksi di area publik dengan
                  pengguna lain, informasi tersebut dapat dilihat oleh semua
                  pengguna dan dapat didistribusikan secara publik di luar.
                </li>
                <li>
                  <strong>Dengan persetujuan Anda:</strong> Kami dapat
                  mengungkapkan informasi pribadi Anda untuk tujuan lain dengan
                  persetujuan Anda.
                </li>
              </ul>

              <h3 className="font-bold mt-4 mb-2">
                Penyimpanan Data Pribadi Anda
              </h3>
              <p className="mb-4">
                Perusahaan akan menyimpan Data Pribadi Anda hanya selama
                diperlukan untuk tujuan yang dijelaskan dalam Kebijakan Privasi
                ini. Kami akan menyimpan dan menggunakan Data Pribadi Anda
                sejauh yang diperlukan untuk mematuhi kewajiban hukum kami
                (misalnya, jika kami diharuskan menyimpan data Anda untuk
                mematuhi hukum yang berlaku), menyelesaikan sengketa, dan
                menegakkan perjanjian dan kebijakan hukum kami.
              </p>
              <p className="mb-4">
                Perusahaan juga akan menyimpan Data Penggunaan untuk tujuan
                analisis internal. Data Penggunaan umumnya disimpan untuk
                periode waktu yang lebih singkat, kecuali ketika data ini
                digunakan untuk memperkuat keamanan atau meningkatkan
                fungsionalitas Layanan kami, atau Kami diwajibkan secara hukum
                untuk menyimpan data ini untuk periode waktu yang lebih lama.
              </p>

              <h3 className="font-bold mt-4 mb-2">
                Transfer Data Pribadi Anda
              </h3>
              <p className="mb-4">
                Informasi Anda, termasuk Data Pribadi, diproses di kantor
                operasional Perusahaan dan di tempat lain di mana pihak-pihak
                yang terlibat dalam pemrosesan berada. Ini berarti bahwa
                informasi ini dapat ditransfer ke — dan disimpan di — komputer
                yang berada di luar negara, provinsi, negara bagian, atau
                yurisdiksi pemerintah Anda di mana undang-undang perlindungan
                data mungkin berbeda dari yurisdiksi Anda.
              </p>
              <p className="mb-4">
                Persetujuan Anda terhadap Kebijakan Privasi ini diikuti dengan
                pengiriman informasi tersebut mewakili persetujuan Anda terhadap
                transfer tersebut.
              </p>
              <p className="mb-4">
                Perusahaan akan mengambil semua langkah yang diperlukan secara
                wajar untuk memastikan bahwa data Anda diperlakukan dengan aman
                dan sesuai dengan Kebijakan Privasi ini dan tidak ada transfer
                Data Pribadi Anda yang akan dilakukan ke organisasi atau negara
                kecuali ada kontrol yang memadai termasuk keamanan data dan
                informasi pribadi Anda.
              </p>

              <h3 className="font-bold mt-4 mb-2">Hapus Data Pribadi Anda</h3>
              <p className="mb-4">
                Anda memiliki hak untuk menghapus atau meminta Kami membantu
                menghapus Data Pribadi yang telah Kami kumpulkan tentang Anda.
              </p>
              <p className="mb-4">
                Layanan kami dapat memberi Anda kemampuan untuk menghapus
                informasi tertentu tentang Anda dari dalam Layanan.
              </p>
              <p className="mb-4">
                Anda dapat memperbarui, mengubah, atau menghapus informasi Anda
                kapan saja dengan masuk ke Akun Anda, jika Anda memilikinya, dan
                mengunjungi bagian pengaturan akun yang memungkinkan Anda
                mengelola informasi pribadi Anda. Anda juga dapat menghubungi
                Kami untuk meminta akses, memperbaiki, atau menghapus informasi
                pribadi yang telah Anda berikan kepada Kami.
              </p>
              <p className="mb-4">
                Harap dicatat, bagaimanapun, bahwa Kami mungkin perlu menyimpan
                informasi tertentu ketika kami memiliki kewajiban hukum atau
                dasar hukum untuk melakukannya.
              </p>

              <h3 className="font-bold mt-4 mb-2">
                Pengungkapan Data Pribadi Anda
              </h3>
              <h4 className="text-lg font-bold mt-4 mb-2">Transaksi Bisnis</h4>
              <p className="mb-4">
                Jika Perusahaan terlibat dalam merger, akuisisi, atau penjualan
                aset, Data Pribadi Anda dapat ditransfer. Kami akan memberikan
                pemberitahuan sebelum Data Pribadi Anda ditransfer dan menjadi
                tunduk pada Kebijakan Privasi yang berbeda.
              </p>
              <h4 className="text-lg font-bold mt-4 mb-2">Penegakan Hukum</h4>
              <p className="mb-4">
                Dalam keadaan tertentu, Perusahaan mungkin diharuskan untuk
                mengungkapkan Data Pribadi Anda jika diharuskan oleh hukum atau
                sebagai tanggapan atas permintaan yang sah dari otoritas publik
                (misalnya, pengadilan atau badan pemerintah).
              </p>
              <h4 className="text-lg font-bold mt-4 mb-2">
                Persyaratan Hukum Lainnya
              </h4>
              <p className="mb-4">
                Perusahaan dapat mengungkapkan Data Pribadi Anda dengan
                keyakinan yang tulus bahwa tindakan tersebut diperlukan untuk:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-4">
                <li>Mematuhi kewajiban hukum</li>
                <li>
                  Melindungi dan mempertahankan hak atau properti Perusahaan
                </li>
                <li>
                  Mencegah atau menyelidiki kemungkinan pelanggaran dalam
                  kaitannya dengan Layanan
                </li>
                <li>
                  Melindungi keselamatan pribadi Pengguna Layanan atau publik
                </li>
                <li>Melindungi dari tanggung jawab hukum</li>
              </ul>

              <h3 className="font-bold mt-4 mb-2">
                Keamanan Data Pribadi Anda
              </h3>
              <p className="mb-4">
                Keamanan Data Pribadi Anda penting bagi Kami, tetapi ingat bahwa
                tidak ada metode transmisi melalui Internet atau metode
                penyimpanan elektronik yang 100% aman. Meskipun Kami berusaha
                untuk menggunakan cara yang dapat diterima secara komersial
                untuk melindungi Data Pribadi Anda, Kami tidak dapat menjamin
                keamanan mutlaknya.
              </p>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">Privasi Anak-Anak</h2>
              <p className="mb-4">
                Layanan kami tidak ditujukan untuk siapa pun di bawah usia 13
                tahun. Kami tidak secara sadar mengumpulkan informasi identitas
                pribadi dari siapa pun di bawah usia 13 tahun. Jika Anda adalah
                orang tua atau wali dan Anda menyadari bahwa anak Anda telah
                memberikan Kami Data Pribadi, silakan hubungi Kami. Jika Kami
                menyadari bahwa Kami telah mengumpulkan Data Pribadi dari siapa
                pun di bawah usia 13 tahun tanpa verifikasi persetujuan orang
                tua, Kami mengambil langkah-langkah untuk menghapus informasi
                tersebut dari server Kami.
              </p>
              <p className="mb-4">
                Jika Kami perlu mengandalkan persetujuan sebagai dasar hukum
                untuk memproses informasi Anda dan negara Anda memerlukan
                persetujuan dari orang tua, Kami mungkin memerlukan persetujuan
                orang tua sebelum Kami mengumpulkan dan menggunakan informasi
                tersebut.
              </p>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">Tautan ke Situs Web Lain</h2>
              <p className="mb-4">
                Layanan kami mungkin mengandung tautan ke situs web lain yang
                tidak dioperasikan oleh Kami. Jika Anda mengklik tautan pihak
                ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami
                sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap
                situs yang Anda kunjungi.
              </p>
              <p className="mb-4">
                Kami tidak memiliki kendali atas dan tidak bertanggung jawab
                atas konten, kebijakan privasi, atau praktik situs atau layanan
                pihak ketiga mana pun.
              </p>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">
                Perubahan pada Kebijakan Privasi ini
              </h2>
              <p className="mb-4">
                Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke
                waktu. Kami akan memberi tahu Anda tentang perubahan apa pun
                dengan memposting Kebijakan Privasi baru di halaman ini.
              </p>
              <p className="mb-4">
                Kami akan memberi tahu Anda melalui email dan/atau pemberitahuan
                penting di Layanan kami, sebelum perubahan menjadi efektif dan
                memperbarui tanggal &quot;Terakhir diperbarui&quot; di bagian
                atas Kebijakan Privasi ini.
              </p>
              <p className="mb-4">
                Anda disarankan untuk meninjau Kebijakan Privasi ini secara
                berkala untuk setiap perubahan. Perubahan pada Kebijakan Privasi
                ini efektif ketika diposting di halaman ini.
              </p>
            </div>

            <div>
              <h2 className="font-bold mt-6 mb-4">Hubungi Kami</h2>
              <p className="mb-4">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini,
                Anda dapat menghubungi kami:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-4">
                <li>
                  <p>Melalui email: charingcub@gmail.com</p>
                </li>
                <li>
                  <p>
                    Dengan mengunjungi halaman ini di situs web kami:{" "}
                    <Link
                      href="https://charingcub.com/contact"
                      rel="external nofollow noopener"
                      target="_blank"
                      className="underline font-bold"
                    >
                      https://charingcub.com/contact
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
