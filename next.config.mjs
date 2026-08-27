/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Empacota server + node_modules mínimo em .next/standalone, para a imagem
  // Docker rodar `node server.js` sem instalar dependências no runtime.
  output: "standalone",
};

export default nextConfig;
