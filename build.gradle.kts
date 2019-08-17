import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    base
    kotlin("jvm") version "1.3.41" apply false
}

allprojects {
    group = "io.smart-life"
    version = "1.0"

    repositories {
        jcenter()
        mavenCentral()
    }
}

subprojects {
    tasks.withType<KotlinCompile>().configureEach {
        println("Configuring $name in project ${project.name}")
        kotlinOptions {
            jvmTarget = "12"
        }
    }
}

subprojects.map {
    when (it.parent?.name) {
        "libs" -> {
            // lib config?
        }
        "services" -> {
            // service config?
        }
    }
}

dependencies {
    // Make the root project archives configuration depend on every subproject
    subprojects.forEach {
        archives(it)
    }
}