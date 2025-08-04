import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Eye, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Jane Doe', title: 'Founder & CEO', avatarUrl: 'https://placehold.co/128x128/FBC700/FFF?text=JD' },
  { name: 'John Smith', title: 'Lead Agent', avatarUrl: 'https://placehold.co/128x128/74B7FF/FFF?text=JS' },
  { name: 'Emily White', title: 'Marketing Director', avatarUrl: 'https://placehold.co/128x128/FAFAFA/333?text=EW' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[40vh] flex items-center justify-center text-center text-white bg-secondary">
        <Image
          src="https://placehold.co/1920x1080/000000/FFF?text=Office+Interior"
          alt="Modern office interior"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="office interior"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <div className="z-20 container px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight text-foreground">
            About OnPlan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Redefining real estate through dedication, expertise, and innovation.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Story</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Founded in 2010, OnPlan was born from a desire to create a better real estate experience. We believed that by combining cutting-edge technology with a client-first philosophy, we could simplify the process of buying, selling, and renting properties.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today, we are a leading agency known for our integrity, market knowledge, and commitment to achieving exceptional results for our clients. Whether you're a first-time buyer or a seasoned investor, we're here to guide you every step of the way.
              </p>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Team working together"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="team meeting"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To provide unparalleled service and expert guidance, empowering our clients to make informed real estate decisions with confidence.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To be the most trusted and respected real estate agency, known for our innovation, integrity, and positive impact on the communities we serve.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Client-Centricity, Integrity, Excellence, Innovation, and Collaboration are the pillars of our business and guide our every action.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold">Meet Our Team</h2>
          <p className="mt-2 text-center text-lg text-muted-foreground max-w-2xl mx-auto">The dedicated professionals behind our success.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <Card key={member.name} className="text-center p-6">
                <Avatar className="w-32 h-32 mx-auto border-4 border-primary/50">
                  <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-headline text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
