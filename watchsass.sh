#!/bin/bash

dir="src/Presenters/Styles"
files=( "LoginViewSS.module" \
        "DashboardSS.module" \
        "DashboardSS" \
        "GradeCardSS.module" \
        "GradeSS" \
        "CourseSS" \
    )
cmd="sass --watch"

for i in ${files[*]};
do
    cmd="${cmd} $dir/$i.sass:$dir/$i.css"
done

eval $cmd
