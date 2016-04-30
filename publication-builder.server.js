import CursorBuilderGenerator from './cursor-builder-generator.server';

PublicationBuilder = {};
PublicationBuilder.set = (params) => new CursorBuilderGenerator(params);
export default PublicationBuilder;
