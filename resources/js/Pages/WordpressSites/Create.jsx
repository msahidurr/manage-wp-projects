import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        site_name: '',
        path: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('wordpress-sites.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Wordpress Site</h2>}
        >
            <Head title="Create Wordpress Site" />

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Create Wordpress Site</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Create Wordpress Site</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Create Wordpress Site</h3>
                        </div>
                        <form onSubmit={submit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <InputLabel htmlFor="site_name" value="Site Name" />
                                    <TextInput
                                        id="site_name"
                                        type="text"
                                        name="site_name"
                                        value={data.site_name}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('site_name', e.target.value)}
                                    />

                                    <InputError message={errors.site_name} className="mt-2" />
                                </div>

                                <div className="form-group">
                                    <InputLabel htmlFor="path" value="Path (full directory)" />
                                    <TextInput
                                        id="path"
                                        type="text"
                                        name="path"
                                        value={data.path}
                                        className="form-control"
                                        isFocused={true}
                                        placeholder="var/www/project_directory"
                                        onChange={(e) => setData('path', e.target.value)}
                                    />

                                    <InputError message={errors.path} className="mt-2" />
                                </div>
                            </div>

                            <div className="card-footer">
                                <PrimaryButton className="btn btn-primary" disabled={processing}>
                                    Create
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
