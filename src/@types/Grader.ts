type Role = 'general' | 'developer' | 'design' | 'creative' | 'admin';

interface Grader {
  name: string;
  roles: Array<Role>;
}

export default Grader;
