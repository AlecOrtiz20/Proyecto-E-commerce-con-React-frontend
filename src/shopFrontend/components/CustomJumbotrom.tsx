
interface PropsJumbotrom{
    title: string; 
    description?: string;
};


export function CustomJumbotrom({description, title}: PropsJumbotrom){

    const defaultDescription= "Ropa minimalista de Alec Ortiz";

    return(

        <section className="py-10 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl lg:text-5xl font-montserrat tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground font-montserrat mb-8 max-w-2xl mx-auto">
            {description || defaultDescription}
          </p>
    
        </div>
      </section>

    );
};