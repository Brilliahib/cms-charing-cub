import { Card, CardContent } from "@/components/ui/card";
import { Nannies } from "@/types/cub/cub";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

interface CardDaycareNanniesDetailProps {
  data?: Nannies;
}

export default function CardDaycareNanniesDetail({
  data,
}: CardDaycareNanniesDetailProps) {
  return (
    <Card className="border">
      <CardContent className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          <div className="space-y-2">
            <p className="font-semibold">Nama</p>
            <p className="text-muted-foreground">{data?.user.name}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Email</p>
            <p className="text-muted-foreground">{data?.user.email}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Foto Profil</p>
            <Image
              src={`${baseUrl}/${data?.images}`}
              alt={data?.user.name ?? ""}
              width={1000}
              height={1000}
              className="w-[200px] rounded-md"
            />
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Jenis Kelamin</p>
            <p className="text-muted-foreground">
              {data?.gender === "female"
                ? "Perempuan"
                : data?.gender === "male"
                ? "Laki-laki"
                : "-"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Umur</p>
            <p className="text-muted-foreground">{data?.age} Tahun</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Kontak</p>
            <p className="text-muted-foreground">{data?.contact}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Deskripsi Pengalaman</p>
            <p className="text-muted-foreground">
              {data?.experience_description}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Daycare Terkait</p>
            <p className="text-muted-foreground">
              {data?.daycare?.name ?? "Tidak memiliki daycare"}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Bergabung Sejak</p>
            {data?.created_at && (
              <p className="text-muted-foreground">
                {data?.created_at
                  ? format(
                      new Date(data.created_at),
                      "EEEE, d MMMM yyyy HH:mm",
                      { locale: id }
                    )
                  : "Tanggal tidak tersedia"}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Pilihan Harga</p>
            <ol className="list-decimal list-inside">
              {data?.price_lists.map((priceList) => (
                <li key={priceList.id} className="text-muted-foreground">
                  {formatPrice(priceList.price)} - {priceList.name} (
                  {priceList.age_start} - {priceList.age_end})
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
