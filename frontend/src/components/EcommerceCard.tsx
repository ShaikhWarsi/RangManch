interface EcommerceCardProps {
  ImgSrc: string;
  title: string;
  price?: string;
  artisan?: string;
  location?: string;
}

export const EcommerceCard = ({ ImgSrc, title, price, artisan, location }: EcommerceCardProps) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-4">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-sand/20 shadow-premium transition-all duration-500 group-hover:shadow-premium-hover">
        <img
          src={ImgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Master Weaver Badge */}
        <div className="absolute top-3 left-3 bg-maroon/90 text-ivory text-xs px-2 py-1 rounded">
          Master Weaver
        </div>
        {/* Heart Icon on Hover */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-maroon text-sm">♥</span>
        </div>
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-walnut/0 transition-colors duration-500 group-hover:bg-walnut/5"></div>
      </div>

      {/* Museum Label Style Content */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-heading text-lg text-walnut leading-tight">
            {title}
          </h3>
          <span className="font-ui text-sm font-semibold text-maroon">
            {price || "₹2,499"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-4 h-[1px] bg-gold/50"></span>
          <p className="font-ui text-xs text-walnut/60 uppercase tracking-widest">
            {artisan || "Master Artisan"}
          </p>
        </div>
        
        {/* Artisan Location */}
        <p className="text-xs text-walnut/50">
          {location || "Varanasi, UP"}
        </p>
      </div>
    </div>
  );
};
