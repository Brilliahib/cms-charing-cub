import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function AboutUsTeam() {
  return (
    <div className="space-y-8">
      <h1 className="text-primary bg-clip-text text-center font-paytone text-4xl">
        Meet Our Team
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 md:gap-6">
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/regina.png"}
              alt="Regina S"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Regina S</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/brilli.png"}
              alt="Muhammad Ahib Ibrilli"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Muhammad Ahib Ibrilli</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/talitha.png"}
              alt="Talitha Zarifah"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Talitha Zarifah</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/dimas.png"}
              alt="Dimas Cahyadi"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Dimas Cahyadi</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/hasna.png"}
              alt="Hasna Nuraini"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Hasna Nuraini</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/maul.png"}
              alt="Maulana Fadullah"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Maulana Fadullah</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={"/images/teams/clarissa.png"}
              alt="Clarissa Wijaya"
              width={2052}
              height={2052}
              loading="lazy"
              className="bg-primary object-cover rounded-full h-[150px] w-[150px]"
            />
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center space-y-4 justify-center">
            <h1 className="font-semibold">Clarissa Wijaya</h1>
            <div className="flex gap-2 items-center">
              <Linkedin className="text-blue-600" />
              <Instagram className="text-pink-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
