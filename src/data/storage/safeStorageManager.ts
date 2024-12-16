import Realm from 'realm';
import {Course, Project} from '../../utility';

export async function getRealm() {
  return await Realm.open({
    schema: [Course.courseSchema, Project.projectSchema],
    schemaVersion: 1,
  });
}

export function closeRealm(realm: Realm) {
  if (!realm.isClosed) {
    realm.close();
  }
}

const detachFromRealm = <T extends object>(realmObject: T): T => {
    return JSON.parse(JSON.stringify(realmObject));
};

export async function getSafeCourses() {
    const realm = await getRealm();
    try {
        const realmCourses = realm.objects('Course');
        const courses = Array.from(realmCourses).map(course => {
            const detached = detachFromRealm(course) as unknown as Course;
            return new Course(
                detached.courseName,
                detached.courseCode,
                detached.instructor,
                detached.color,
                new Date(detached.startDate),
                new Date(detached.endDate),
                detached.notes,
                detached.projectIds,
                new Realm.BSON.ObjectId(detached._id.toString()),
            );
        });
        return courses;
    } catch (error) {
        console.error('Error getting courses: ', error);
        throw error;
    } finally {
        closeRealm(realm);
    }
}

export async function getSafeProjects () {
    const realm = await getRealm();
    try {
        const realmProjects = realm.objects('Project');
        const projects = Array.from(realmProjects).map(project => {
            const detached = detachFromRealm(project) as unknown as Project;
            return new Project(
                detached.projectName,
                detached.estimatedHrs,
                new Date(detached.startDate),
                new Date(detached.endDate),
                detached.completed,
                detached.notes,
                detached.courseId
                    ? new Realm.BSON.ObjectId(detached.courseId.toString())
                    : undefined,
                new Realm.BSON.ObjectId(detached._id.toString()),
            );
        });
        return projects;
    } catch (error) {
        console.error('Error getting projects: ', error);
    } finally {
        closeRealm(realm);
    }
}
