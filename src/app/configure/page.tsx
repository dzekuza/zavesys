import { ProductConfigurator } from '@/components/ProductConfigurator';

export const metadata = {
  title: 'Žavesys — Build your collar',
  description: 'Custom dog collar configurator. Choose your colour, charms, size and engraving.',
};

export default function ConfigurePage() {
  return <ProductConfigurator />;
}
