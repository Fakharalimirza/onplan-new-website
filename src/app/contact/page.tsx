import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <section className="relative h-[40vh] flex items-center justify-center text-center text-white bg-secondary">
         <Image
          src="https://placehold.co/1920x1080/000000/FFF?text=Cityscape"
          alt="Cityscape"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="cityscape skyline"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <div className="z-20 container px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight text-foreground">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We're here to help with all your real estate needs. Reach out to us today!
          </p>
        </div>
      </section>
      
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
              <p className="mt-4 text-muted-foreground">
                Whether you have a question about a property, need an agent, or anything else, our team is ready to answer all your questions.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Our Office</h3>
                    <p className="text-muted-foreground">123 Urban St, Metropolis, NY 10001</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">contact@onplan.com</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

       <section>
          <div className="w-full h-[400px] bg-secondary">
             <Image
                src="https://placehold.co/1920x400.png"
                width={1920}
                height={400}
                alt="Map of office location"
                className="object-cover w-full h-full"
                data-ai-hint="city map"
              />
          </div>
       </section>

    </div>
  );
}
