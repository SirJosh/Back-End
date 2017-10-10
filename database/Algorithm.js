/**
 * Created by Jordan on 22-09-2017.
 */
var Particle = require('.././database/Particle.js');
var method = Algorithm.prototype;

/*Store all lists of employees*/
function Algorithm(employee_lists, swarm_size, positions, position_counts)
    {
        this.positions = positions;
        this.position_counts = position_counts;
        this.swarm_size = swarm_size;
        this.employee_lists = employee_lists;
        this.particles = [swarm_size];
        this.gbest_list = [];
        this.gbest_value = -1;
    }

    /*Create and initialize all particles*/
    method.initSwarm = function()
    {
        console.log("swarm size : "+this.swarm_size);
        for(var loop = 0; loop < this.swarm_size; loop++)
        {
            var particle = new Particle(this.positions, this.position_counts);
            var temp_emps = [Object.keys(this.employee_lists).length];
            for(var loop2 = 0; loop2 < Object.keys(this.employee_lists).length; loop2++)
            {
                var rand_pos = Math.floor(Math.random()*((Object.keys(this.employee_lists[loop2]).length-1) - 0 + 1) + 0);
                while(this.sameID(temp_emps, this.employee_lists[loop2][rand_pos].id))
                    rand_pos = Math.floor(Math.random()*((Object.keys(this.employee_lists[loop2]).length-1) - 0 + 1) + 0);
                emp = this.employee_lists[loop2][rand_pos];
                temp_emps[loop2] = emp;
                particle.addEmployee(emp);
            }
            particle.setPbest(particle.getEmployees());
            this.particles[loop] = particle;
        }
    };

    method.displayParticles = function()
    {
        for(var loop = 0; loop < this.particles.length; loop++)
        {
            console.log("Displaying particle : "+(loop+1)+"'s employees");
            console.log(this.particles[loop].getEmployees());
        }
    };

    method.runAlgorithm = function()
    {
        this.initSwarm();
        this.calcGbest();
        this.displayGbest();

        //change the stopping condition to check if:
            // the value hasn't changed for a while
        for(var loop = 0; loop < 100; loop++)
        {
            for(var loop2 = 0; loop2 < this.particles.length; loop2++)
            {
                this.particles[loop2].updateParticlePosition(this.employee_lists, this.gbest_list);
                if (this.particles[loop2].getValue() > this.particles[loop2].getPbestValue())
                    this.particles[loop2].setPbest(this.particles[loop2].getEmployees());
                if (this.particles[loop2].getValue() > this.gbest_value)
                {
                    this.gbest_list = this.particles[loop2].getPbestList();
                    this.gbest_value = this.particles[loop2].getValue();
                    console.log("New global best particle found");
                    this.displayGbest();
                }
            }
        }
        return(this.gbest_list);
    };

    method.calcGbest = function()
    {
        for(var loop = 0; loop < this.swarm_size; loop++)
        {
            if(this.particles[loop].getPbestValue() > this.gbest_value) {
                this.gbest_value = this.particles[loop].getPbestValue();
                this.gbest_list = this.particles[loop].getPbestList();
            }
        }
    };

    method.displayGbest = function()
    {
        console.log("gBest value : "+this.gbest_value);
        console.log("gbest employees");
        console.log(this.gbest_list);
        console.log();
    };

    /*TODO check if this function is getting used correctly*/
    method.sameID = function(id_list, new_id)
    {
        var return_value = false;
        for(var loop = 0; loop < id_list.length; loop++)
        {
            if(id_list[loop] == new_id)
                return_value = true;
        }
        return return_value;
    };

module.exports = Algorithm;

