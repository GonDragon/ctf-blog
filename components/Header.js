import Link from 'next/link';
import Image from 'next/image';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="tooltip block mx-auto">
        <span className="tooltiptext">Coolcat by Dall-E</span>
        <div className="w-20 h-20 rounded-full block mx-auto mb-4 overflow-hidden">
          <Image
            src="/Dall-E_Cat.png"
            width="500"
            height="500"
            alt="Coolcat by Dall-E"
          />
        </div>
      </div>
      <p className="text-2xl text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
