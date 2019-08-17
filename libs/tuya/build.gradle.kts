import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.moowork.node") version "1.3.1"
}

tasks.create("start", NpmTask::class) {
    group = "node"
    setArgs(mutableListOf("start"))
}
