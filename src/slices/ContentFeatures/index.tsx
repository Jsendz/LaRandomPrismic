import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `ContentFeatures`.
 */
export type ContentFeaturesProps =
  SliceComponentProps<Content.ContentFeaturesSlice>;

/**
 * Component for "ContentFeatures" Slices.
 */
const ContentFeatures = ({ slice }: ContentFeaturesProps): JSX.Element => {
  const bgColors = [
     'bg-sky-200', 'bg-lime-200', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'
  ];
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
       <div className="relative w-full text min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 xl:px-40 py-16 text-center">
       {isFilled.richText(slice.primary.titulo) && (
                    
                    <div className="text-2xl md:text-6xl font-semibold mb-10 text-slate-800  ">
                      <PrismicRichText field={slice.primary.titulo} />
                    </div>
                  )}
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-6 w-full max-w-7xl ">
        
        {slice.primary.grid.map((item, index) => (
          <div key={index} className={`  shadow-lg rounded-lg group w-full h-[550px] md:h-[450px] transition-all duration-300 md:hover:h-[650px] ${bgColors[index % bgColors.length]}`}>
            {item.imagen && (
              <PrismicNextImage field={item.imagen} className=" w-[100%] h-[70%] object-cover rounded-t-lg" />
            )}
            {item.titulo && (
              <div className="text-xl sm:text-2xl font-bold text-gray-800 p-3 md:p-5  text-left">
                <PrismicRichText field={item.titulo} />
              </div>
            )}
            {item.texto && (
              <div className="text-gray-700 text-md px-2  md:group-hover:px-5  md:group-hover:pb-5 sm:text-lg text-left    md:opacity-100 md:max-h-0 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <PrismicRichText field={item.texto} />
              </div>
            )}
          </div>
        ))}
        
      </div>
      
      {/* Call to Action */}
      <div className="mt-8 sm:mt-12">
        <Link href="/contacte" className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-medium hover:bg-red-700 transition-all">
          Vull informació
        </Link>
      </div>
    </div>
    </section>
  );
};

export default ContentFeatures;
