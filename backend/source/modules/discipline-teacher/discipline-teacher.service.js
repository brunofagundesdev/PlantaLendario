import disciplineTeacherRepository from "./discipline-teacher.repository.js";
import disciplineRepository from "../discipline/discipline.repository.js";
import teacherRepository from "../teacher/teacher.repository.js";

import * as DisciplineErrors from "../discipline/discipline.error.js";
import * as TeacherErrors from "../teacher/teacher.error.js";
import * as DisciplineTeacherErrors from "./discipline-teacher.error.js";

class DisciplineTeacherService {
    constructor({ repository }) {
        this.repository = repository;
    }

    async assign({ disciplineId, teacherId }) {
        let discipline = await disciplineRepository.get({ id: disciplineId });
        if (!discipline) {
            throw new DisciplineErrors.DisciplineNotFoundError()
        }

        let teacher = await teacherRepository.get({ id: teacherId });
        if (!teacher) {
            throw new TeacherErrors.TeacherNotFoundError()
        }

        let disciplineTeachers = await this.repository.getTeachersByDiscipline({ disciplineId });

        let disciplineHasTeacher = disciplineTeachers.some(teacher => teacher.id === teacherId);
        if (disciplineHasTeacher) throw new DisciplineErrors.DisciplineAlreadyHasTeacherError();

        let assignment = await this.repository.assign({ disciplineId, teacherId });
        return assignment;
    }

    async deassign({ disciplineId, teacherId }) {
        let discipline = await disciplineRepository.get({ id: disciplineId });
        if (!discipline) {
            throw new DisciplineErrors.DisciplineNotFoundError()
        }

        let teacher = await teacherRepository.get({ id: teacherId });
        if (!teacher) {
            throw new TeacherErrors.TeacherNotFoundError()
        }

        let disciplineTeachers = await this.repository.getTeachersByDiscipline({ disciplineId });

        let disciplineHasTeacher = disciplineTeachers.some(teacher => teacher.id === teacherId);
        if (!disciplineHasTeacher) throw new DisciplineTeacherErrors.DisciplineMissingTeacherError();

        let deassignment = await this.repository.deassign({ disciplineId, teacherId })
        return deassignment;

    }
}

const disciplineTeacherController = new DisciplineTeacherService({ repository: disciplineTeacherRepository });
export default disciplineTeacherController;