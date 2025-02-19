import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ArtistSlice`.
 */
export type ArtistSliceProps = SliceComponentProps<Content.ArtistSliceSlice>;

/**
 * Component for "ArtistSlice" Slices.
 */
const ArtistSlice = ({ slice }: ArtistSliceProps): JSX.Element => {
  return (
    <section
    
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    > 
    <div className="w-full max-w-7xl mx-auto h-full lg:h-screen">
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 ">
      {slice.primary.artistlist.map((item, index) => (
        <div  key={index} className="group relative block">
         {isFilled.image(item.imagen_artista) && (
                      <PrismicNextImage
                        field={item.imagen_artista}
                        alt=""
                        className="w-[250px]  object-cover rounded-lg mb-4"
                      />
                    )}
 
  <div className="absolute top-0 w-[250px] h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg">
  <div>
  {isFilled.richText(item.nombre) && (
        <h2 className="text-balance text-center text-white text-4xl font-medium md:text-6xl mb-10" >  
        <PrismicText field={item.nombre} /></h2>
        )}
        </div>
        <div>
        {isFilled.link(item.link) && (
              <PrismicNextLink field={item.link} className="text-blue-500 font-medium hover:underline p-5 bg-white">
                Descobreix
              </PrismicNextLink>
            )}
            </div>
        </div>
  </div>

))}
</div>
</div>
      
    </section>
  );
};

export default ArtistSlice;


