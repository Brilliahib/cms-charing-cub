import { Handshake, Home, Users, UsersRound } from "lucide-react";

export default function AboutUsIntroduction() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <h1 className="text-primary bg-clip-text text-center font-paytone text-4xl">
          Tentang Kami
        </h1>
        <p className="leading-loose text-center mb-16">
          Charing Cub adalah platform berbasis web yang dirancang untuk
          memastikan penyediaan layanan pengasuhan anak berkualitas tinggi bagi
          anak-anak dari orang tua yang bekerja. Dengan teknologi digital,
          platform ini membantu orang tua menemukan dan mengakses layanan
          pengasuhan yang terpercaya, aman, dan sesuai dengan kebutuhan mereka,
          sehingga mereka dapat bekerja dengan tenang tanpa khawatir tentang
          kesejahteraan anak-anak mereka.
        </p>
      </div>

      <div className="md:flex md:space-y-0 space-y-4 justify-around">
        <div className="flex gap-3">
          <Users className="text-primary h-6 w-6 shrink-0" />
          <div className="max-w-xs">
            <h1 className="text-xl font-bold">150+</h1>
            <p className="text-muted-foreground">
              Pengguna yang sudah bergabung bergabung bersama kami
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <UsersRound className="text-primary h-6 w-6 shrink-0" />
          <div className="max-w-xs">
            <h1 className="text-xl font-bold">40+</h1>
            <p className="text-muted-foreground">
              Nannies yang sudah bergabung bersama kami
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Home className="text-primary h-6 w-6 shrink-0" />
          <div className="max-w-xs">
            <h1 className="text-xl font-bold">50+</h1>
            <p className="text-muted-foreground">
              Daycare yang sudah bergabung bersama kami
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Handshake className="text-primary h-6 w-6 shrink-0" />
          <div className="max-w-xs">
            <h1 className="text-xl font-bold">5+</h1>
            <p className="text-muted-foreground">
              Mitra yang sudah bersedia mendukung kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
