import renderer from 'react-test-renderer';
import Button from '../src/components/button';

it('loads data when clicked', () => {
  const component = renderer.create(
    <Button/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});