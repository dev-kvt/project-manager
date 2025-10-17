export const UserRolesEnum ={
    ADMIN:  "ADMIN",
    PROJECT_ADMIN: "PROJECT_ADMIN",
    MEMBER: "MEMBER",
}

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
    TODO: "TODO",   
    IN_PROGRESS: "IN_PROGRESS",
    REVIEW: "REVIEW",
    DONE: "DONE",
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);